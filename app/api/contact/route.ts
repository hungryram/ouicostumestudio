const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(value: unknown): string | null {
  return typeof value === "string" ? value.trim() : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
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
  if (getString(submission.website)) {
    return Response.json({ error: "The submission could not be accepted." }, { status: 400 });
  }

  const name = getString(submission.name);
  const email = getString(submission.email);
  const projectType =
    submission.projectType === undefined
      ? ""
      : getString(submission.projectType);
  const message = getString(submission.message);

  if (
    !name ||
    name.length > 100 ||
    /[\r\n]/.test(name) ||
    !email ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    projectType === null ||
    projectType.length > 100 ||
    !message ||
    message.length > 5000
  ) {
    return Response.json({ error: "Please check the required fields and try again." }, { status: 400 });
  }

  const serverToken = process.env.POSTMARK_SERVER_TOKEN;
  const sender = process.env.POSTMARK_FROM_EMAIL;
  const recipient = process.env.CONTACT_TO_EMAIL;

  if (
    !serverToken ||
    !sender ||
    !emailPattern.test(sender) ||
    !recipient ||
    !emailPattern.test(recipient)
  ) {
    console.error("Contact form delivery is not configured. Set the required Postmark environment variables.");
    return Response.json({ error: "The contact form is temporarily unavailable." }, { status: 503 });
  }

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "Not specified"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": serverToken,
      },
      body: JSON.stringify({
        From: sender,
        To: recipient,
        ReplyTo: email,
        Subject: "New costume inquiry from Oui Costume Studio",
        TextBody: textBody,
        MessageStream: "outbound",
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Postmark contact email request failed.", error);
    return Response.json({ error: "The contact form is temporarily unavailable." }, { status: 502 });
  }

  if (!response.ok) {
    console.error("Postmark rejected a contact email request.", { status: response.status });
    return Response.json({ error: "The contact form is temporarily unavailable." }, { status: 502 });
  }

  return Response.json({ sent: true }, { status: 200 });
}
