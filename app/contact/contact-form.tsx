"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type SubmissionState = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

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

      form.reset();
      setState("sent");
    } catch {
      setState("error");
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
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button className="button button--plum" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send your inquiry"}
      </button>
      <p className={`contact-form__status contact-form__status--${state}`} aria-live="polite" role="status">
        {state === "sent" && "Thanks for your message. I’ll be in touch."}
        {state === "error" && "Your message didn’t send. Please try again, or contact the studio directly."}
      </p>
      <p className="contact-form__privacy">
        Your details are only used to respond to your inquiry.
      </p>
    </form>
  );
}
