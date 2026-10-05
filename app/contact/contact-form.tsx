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

export default function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [confirmationSent, setConfirmationSent] = useState(true);
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
      action: "contact",
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
  }, [turnstileReady]);

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setState("error");
        return;
      }

      const result: { confirmationSent?: boolean } = await response.json();
      setConfirmationSent(result.confirmationSent !== false);
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
        <label className="contact-form__full">
          What type of project is this?
          <select name="projectType" defaultValue="">
            <option value="">Choose a project type (optional)</option>
            <option value="Dancewear or performance costume">Dancewear or performance costume</option>
            <option value="Special occasion">Special occasion</option>
            <option value="Something else">Something else</option>
          </select>
        </label>
        <label className="contact-form__full">
          Project details
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
        {state === "sending" ? "Sending…" : "Send your inquiry"}
      </button>
      <p className={`contact-form__status contact-form__status--${state}`} aria-live="polite" role="status">
        {state === "sent" && (confirmationSent
          ? "Thanks for your message. A confirmation email is on its way, and I’ll be in touch."
          : "Your inquiry was received, but the confirmation email couldn’t be sent. There’s no need to submit again; I’ll be in touch.")}
        {state === "unverified" && "Please complete the security check above, then send your inquiry."}
        {state === "error" && "Your message didn’t send. Please try again, or contact the studio directly."}
      </p>
      <p className="contact-form__privacy">
        Your details are only used to respond to your inquiry.
      </p>
    </form>
  );
}
