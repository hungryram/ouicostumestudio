import { appendContactEntry, appendWaitlistEntry, getContactSheetConfig, getWaitlistSheetConfig } from "./waitlist-sheet";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(value: unknown): string | null {
  return typeof value === "string" ? value.trim() : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(title: string, content: string): string {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f8f5f0;font-family:Georgia,'Times New Roman',serif;color:#171417;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #ded6cf;">
            <tr>
              <td style="background:#0c0b0d;padding:28px 32px;color:#ffffff;">
                <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#ffffff;">Oui Costume Studio</p>
                <h1 style="margin:0;font-size:26px;font-weight:normal;line-height:1.25;">${title}</h1>
              </td>
            </tr>
            ${content}
          </table>
          <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#70666b;">Powered by <a href="https://www.hungryram.com" style="color:#171417;">hungryram.com</a></p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function handleFormSubmission(request: Request, waitlist: boolean) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json({ error: "Expected a JSON request." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > 12_000) {
    return Response.json({ error: "The submission is too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "The submission is not valid JSON." }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return Response.json({ error: "The submission must be an object." }, { status: 400 });
  }

  const submission = payload;
  if (getString(submission.hp_extra)) {
    console.warn("Contact submission rejected by the spam trap.");
    return Response.json({ error: "The submission could not be accepted." }, { status: 400 });
  }

  const name = getString(submission.name);
  const email = getString(submission.email);
  const sheetConfig = waitlist ? getWaitlistSheetConfig() : getContactSheetConfig();
  const projectType =
    submission.projectType === undefined
      ? ""
      : getString(submission.projectType);
  const projectFormat =
    submission.projectFormat === undefined
      ? ""
      : getString(submission.projectFormat);
  const priceRange =
    submission.priceRange === undefined
      ? ""
      : getString(submission.priceRange);
  const message = getString(submission.message);
  const projectTypes = new Set([
    "",
    "Jazz",
    "Contemporary",
    "Dancewear or performance costume",
    "Special occasion",
    "Something else",
  ]);
  const projectFormats = new Set(["", "Group", "Solo"]);
  const priceRanges = new Set([
    "",
    "$250–$350",
    "$350–$500",
    "$500–$1,000",
    "$1,000+",
    "Not sure yet",
  ]);

  if (
    !name ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    !email ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    projectType === null ||
    !projectTypes.has(projectType) ||
    projectFormat === null ||
    !projectFormats.has(projectFormat) ||
    priceRange === null ||
    !priceRanges.has(priceRange) ||
    !message ||
    message.length > 5000
  ) {
    console.warn("Contact submission failed validation.");
    return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  if (!sheetConfig) {
    console.error(`${waitlist ? "Waitlist" : "Contact"} Google Sheets integration is not configured.`);
    return Response.json({ error: "The form is temporarily unavailable." }, { status: 503 });
  }

  const serverToken = process.env.POSTMARK_SERVER_TOKEN;
  const sender = process.env.POSTMARK_FROM_EMAIL?.trim();
  const recipients = (process.env.CONTACT_TO_EMAIL ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (
    !serverToken ||
    !sender ||
    !emailPattern.test(sender) ||
    recipients.length === 0 ||
    !recipients.every((address) => emailPattern.test(address))
  ) {
    console.error("Contact form delivery is not configured. Set the required Postmark environment variables.");
    return Response.json({ error: "The contact form is temporarily unavailable." }, { status: 503 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error("Contact form spam protection is not configured. Set TURNSTILE_SECRET_KEY.");
    return Response.json({ error: "The contact form is temporarily unavailable." }, { status: 503 });
  }

  const turnstileToken = getString(submission.turnstileToken);
  if (!turnstileToken || turnstileToken.length > 2048) {
    console.warn("Contact submission is missing a Turnstile token.");
    return Response.json({ error: "Please complete the security check." }, { status: 400 });
  }

  const remoteIp =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const outcome: unknown = await verification.json();

    if (!isRecord(outcome) || outcome.success !== true) {
      console.warn("Contact submission failed Turnstile verification.", {
        errorCodes: isRecord(outcome) ? outcome["error-codes"] : undefined,
      });
      return Response.json({ error: "Please complete the security check." }, { status: 400 });
    }
  } catch (error) {
    console.error("Turnstile verification request failed.", error);
    return Response.json({ error: "The contact form is temporarily unavailable." }, { status: 502 });
  }

  try {
    if (waitlist) {
      await appendWaitlistEntry(sheetConfig, {
        name, email, projectType, projectFormat, priceRange, message,
      });
    } else {
      await appendContactEntry(sheetConfig, { name, email, message });
    }
  } catch (error) {
    console.error(`Google Sheets ${waitlist ? "waitlist" : "contact"} save failed.`, {
      errorType: error instanceof Error ? error.name : "Unknown error",
    });
    return Response.json({ error: "We couldn’t confirm saving your submission. Please contact the studio directly." }, { status: 502 });
  }

  let crmSent = false;
  try {
    const crmUrl = process.env.HUNGRYHUB_FORM_URL?.trim();
    if (!crmUrl) throw new Error("Missing CRM configuration");
    const endpoint = new URL(crmUrl);
    if (
      endpoint.origin !== "https://app.hungryhub.io" ||
      !endpoint.pathname.startsWith("/api/public/forms/") ||
      !endpoint.searchParams.get("secret")
    ) {
      throw new Error("Invalid CRM configuration");
    }
    const response = await fetch(endpoint.href, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source: waitlist ? "Waitlist" : "General",
        ...(waitlist ? {
          type_of_project: projectType,
          group_or_solo: projectFormat,
          price_range: priceRange,
          project_details: message,
        } : {}),
      }),
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      console.error("HungryHub rejected the submission.", { status: response.status, waitlist });
    } else {
      crmSent = true;
    }
  } catch {
    // Request errors can contain the secret URL; never log the error object.
    console.error("HungryHub delivery failed. Check CRM configuration and availability.", { waitlist });
  }
  const crmWarning = crmSent
    ? ""
    : "CRM sync could not be confirmed. This submission is saved in Google Sheets; check HungryHub before adding it manually.";

  const projectLabel = projectType || "Not specified";
  const formatLabel = projectFormat || "Not specified";
  const priceRangeLabel = priceRange || "Not specified";
  const subject = waitlist ? `New Waitlist Entry from ${name}` : `New Contact Message from ${name}`;
  const replySubject = encodeURIComponent("Re: Your Oui Costume Studio inquiry");
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${replySubject}`;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeProject = escapeHtml(projectLabel);
  const safeFormat = escapeHtml(formatLabel);
  const safePriceRange = escapeHtml(priceRangeLabel);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

  const textBody = [
    subject,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    ...(crmWarning ? [crmWarning] : []),
    ...(waitlist ? [`Project type: ${projectLabel}`, `Format: ${formatLabel}`, `Price range: ${priceRangeLabel}`] : []),
    "",
    waitlist ? "Project details:" : "Message:",
    message,
    "",
    "Reply to this email to respond directly.",
    "",
    "Powered by hungryram.com (https://www.hungryram.com)",
  ].join("\n");

  const detailRow = (label: string, value: string) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #ded6cf;color:#70666b;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;width:130px;vertical-align:top;">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid #ded6cf;color:#171417;font-size:16px;vertical-align:top;">${value}</td>
              </tr>`;

  const projectRows = waitlist
    ? `${detailRow("Project", safeProject)}${detailRow("Format", safeFormat)}${detailRow("Price range", safePriceRange)}`
    : "";
  const htmlBody = renderEmail(`${waitlist ? "New waitlist entry" : "New contact message"} from ${safeName}`, `
            <tr>
              <td style="padding:28px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
                ${crmWarning ? `<p style="margin:0 0 16px;color:#171417;">${crmWarning}</p>` : ""}
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRow("Name", safeName)}${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:#171417;">${safeEmail}</a>`)}${projectRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
                <p style="margin:0 0 10px;color:#70666b;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${waitlist ? "Project details" : "Message"}</p>
                <div style="background:#f8f5f0;border-left:3px solid #171417;padding:16px 18px;color:#171417;font-size:16px;line-height:1.6;">${safeMessage}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;font-family:Arial,Helvetica,sans-serif;">
                <a href="${replyHref}" style="display:inline-block;background:#171417;color:#ffffff;text-decoration:none;padding:12px 22px;font-size:13px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;">Reply to ${safeName}</a>
                <p style="margin:14px 0 0;color:#70666b;font-size:14px;">Or simply reply to this email.</p>
              </td>
            </tr>
  `);

  let studioNotificationSent = false;
  try {
    const response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": serverToken,
      },
      body: JSON.stringify({
        From: `"Oui Costume Studio" <${sender}>`,
        To: recipients.join(", "),
        ReplyTo: email,
        Subject: subject,
        TextBody: textBody,
        HtmlBody: htmlBody,
        MessageStream: "outbound",
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const detail: unknown = await response.json();
      console.error("Postmark rejected a studio notification.", {
        status: response.status,
        errorCode: isRecord(detail) ? detail.ErrorCode : undefined,
        message: isRecord(detail) ? detail.Message : undefined,
      });
      throw new Error(`Postmark studio notification failed (HTTP ${response.status}).`);
    }
    studioNotificationSent = true;
  } catch (error) {
    console.error("Postmark studio notification request failed.", error);
  }

  const confirmationMessage = waitlist
    ? "Thank you for your interest in Oui Costume Studio. You've been added to the waitlist for a future costume project."
    : "Thank you for getting in touch with Oui Costume Studio. Your message has been received, and I'll be in touch.";
  const bookingMessage = waitlist
    ? "The studio is currently fully booked, with bookings opening March–June 2027. I’m so glad you’re interested in creating something together! Space will be limited, and I’ll be in touch as availability becomes clearer to let you know whether I can take on your project."
    : "The studio is currently fully booked, and bookings are closed. Bookings will open March–June 2027. This confirms receipt of your message only; it does not add you to the waitlist or confirm a booking.";
  const confirmationText = [
    `Hi ${name},`,
    "",
    confirmationMessage,
    "",
    bookingMessage,
    "",
    "If you'd like to add anything, just reply to this email.",
    "",
    "Warmly,",
    "Oui",
    "Oui Costume Studio",
    "",
    "Powered by hungryram.com (https://www.hungryram.com)",
  ].join("\n");
  const confirmationHtml = renderEmail(waitlist ? "You're on the waitlist" : "Thank you for your message", `
            <tr>
              <td style="padding:28px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;">
                <p style="margin:0 0 16px;">Hi ${safeName},</p>
                <p style="margin:0 0 16px;">${escapeHtml(confirmationMessage)}</p>
                <p style="margin:0 0 16px;color:#70666b;font-size:14px;">${escapeHtml(bookingMessage)}</p>
                <p style="margin:0 0 24px;">If you'd like to add anything, just reply to this email.</p>
                <p style="margin:0;">Warmly,<br>Oui<br>Oui Costume Studio</p>
              </td>
            </tr>
  `);

  try {
    const confirmation = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": serverToken,
      },
      body: JSON.stringify({
        From: `"Oui Costume Studio" <${sender}>`,
        To: email,
        ReplyTo: recipients.join(", "),
        Subject: waitlist ? "You're on the waitlist | Oui Costume Studio" : "We've received your message | Oui Costume Studio",
        TextBody: confirmationText,
        HtmlBody: confirmationHtml,
        MessageStream: "outbound",
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!confirmation.ok) {
      const detail: unknown = await confirmation.json();
      console.error("Postmark rejected a confirmation email request.", {
        status: confirmation.status,
        errorCode: isRecord(detail) ? detail.ErrorCode : undefined,
        message: isRecord(detail) ? detail.Message : undefined,
      });
      return Response.json({ sent: true, confirmationSent: false, studioNotificationSent, crmSent });
    }
  } catch (error) {
    console.error("Postmark confirmation email request failed.", error);
    return Response.json({ sent: true, confirmationSent: false, studioNotificationSent, crmSent });
  }

  return Response.json({ sent: true, confirmationSent: true, studioNotificationSent, crmSent });
}
