"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type SubmissionState = "idle" | "sending" | "sent" | "error" | "unverified";

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm({ waitlist = false }: { waitlist?: boolean }) {
  const [state, setState] = useState<SubmissionState>("idle");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [studioNotificationSent, setStudioNotificationSent] = useState(true);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidget = useRef<string | null>(null);

  useEffect(() => {
    const container = turnstileContainer.current;
    if (!turnstileReady || !turnstileSiteKey || !container || !window.turnstile) {
      return;
    }

    const widgetId = window.turnstile.render(container, {
      sitekey: turnstileSiteKey,
      action: waitlist ? "waitlist" : "contact",
      theme: "light",
      size: "flexible",
      "response-field": false,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
    turnstileWidget.current = widgetId;

    return () => {
      window.turnstile?.remove(widgetId);
      turnstileWidget.current = null;
    };
  }, [turnstileReady, waitlist]);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    if (turnstileWidget.current) {
      window.turnstile?.reset(turnstileWidget.current);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!turnstileToken) {
      setState("unverified");
      return;
    }

    setState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      turnstileToken,
    };

    try {
      const response = await fetch(waitlist ? "/api/waitlist" : "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      const result: { confirmationSent?: boolean; studioNotificationSent?: boolean } = await response.json();
      setConfirmationSent(result.confirmationSent !== false);
      setStudioNotificationSent(result.studioNotificationSent !== false);
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    } finally {
      resetTurnstile();
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {!waitlist && (
        <p className="contact-form__intro">
          Interested in a future costume project?{" "}
          <a className="contact-content__social-link" href="/waitlist">
            Join the waitlist
          </a>{" "}
          and share your project details there. A general message does not add
          you to the waitlist.
        </p>
      )}
      {waitlist && (
        <p className="contact-form__intro">
          <strong>Fully booked — bookings are currently closed.</strong>{" "}
          Bookings will open March–June 2027.{" "}
          Join the waitlist for a future project. Space will be limited, and
          we&apos;ll be in touch to let you know whether we can take on your project.
        </p>
      )}
      <div className="contact-form__fields">
        <label>
          Your name
          <input
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
        </label>
        {waitlist && (
          <>
            <label className="contact-form__full">
              What type of project is this?
              <select name="projectType" defaultValue="">
                <option value="">Choose a project type (optional)</option>
                <option value="Jazz">Jazz</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Dancewear or performance costume">Dancewear or performance costume</option>
                <option value="Special occasion">Special occasion</option>
                <option value="Something else">Something else</option>
              </select>
            </label>
            <label className="contact-form__full">
              Is it for a group or solo?
              <select name="projectFormat" defaultValue="">
                <option value="">Choose a format (optional)</option>
                <option value="Group">Group</option>
                <option value="Solo">Solo</option>
              </select>
            </label>
            <label className="contact-form__full">
              What price range are you considering?
              <select name="priceRange" defaultValue="">
                <option value="">Choose a price range (optional)</option>
                <option value="$250–$350">$250–$350</option>
                <option value="$350–$500">$350–$500</option>
                <option value="$500–$1,000">$500–$1,000</option>
                <option value="$1,000+">$1,000+</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>
          </>
        )}
        <label className="contact-form__full">
          {waitlist ? "Project details" : "Your message"}
          <textarea
            name="message"
            rows={5}
            maxLength={5000}
            required
          />
        </label>
        <label className="contact-form__honeypot" aria-hidden="true">
          Leave this field empty
          <input name="hp_extra" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onReady={() => setTurnstileReady(true)}
          />
          <div className="contact-form__turnstile" ref={turnstileContainer} />
        </>
      )}
      <button className="button button--plum" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : waitlist ? "Join the waitlist" : "Send your message"}
      </button>
      <p className={`contact-form__status contact-form__status--${state}`} aria-live="polite" role="status">
        {state === "sent" && waitlist && <>
          You&apos;re on the waitlist! We&apos;ll review your project as space becomes
          available and be in touch about next steps.{" "}
          {confirmationSent
            ? "A confirmation email is on its way."
            : "The confirmation email couldn’t be sent. There’s no need to submit again."}
          {!studioNotificationSent && " Your details are saved, but the studio’s email notification couldn’t be sent."}
        </>}
        {state === "sent" && !waitlist && <>
          {confirmationSent
          ? "Thanks for your message. A confirmation email is on its way, and I’ll be in touch."
          : "Your inquiry was received, but the confirmation email couldn’t be sent. There’s no need to submit again; I’ll be in touch."}
          {!studioNotificationSent && " Your message is saved, but the studio’s email notification couldn’t be sent. There’s no need to submit again."}
        </>}
        {state === "unverified" && "Please complete the security check above, then send your inquiry."}
        {state === "error" && (waitlist
          ? "We couldn’t confirm your waitlist entry. Please contact the studio directly before submitting again."
          : "We couldn’t confirm saving your message. Please contact the studio directly before submitting again.")}
      </p>
      <p className="contact-form__privacy">
        {waitlist
          ? "Your details are stored in the studio’s private Google Sheet to manage the waitlist and contact you about your project."
          : "Your message is stored in the studio’s private Google Sheet and used to respond to your inquiry."}
      </p>
    </form>
  );
}
