import type { Metadata } from "next";
import ContactForm from "./contact-form";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Discuss Your Costume Idea | Contact Oui Costume Studio",
  description:
    "Oui Costume Studio is currently fully booked. Bookings open March–June 2027. Our contact form remains open for questions and future costume inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="contact-page">
        <section className="interior-intro section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            CONTACT
          </p>
          <h1>
            Let&apos;s
            <br />
            talk.
          </h1>
          <p>
            The studio is fully booked, and bookings are currently closed.
            Bookings will open March–June 2027.{" "}
            You&apos;re still welcome to send a question or a general message.
          </p>
        </section>

        <section className="contact-content section-shell">
          <div className="contact-content__aside">
            <h2>Have a question for Oui?</h2>
            <p>
              Use this form for general questions, existing orders, or anything
              you&apos;d like to ask the studio.
            </p>
            <div className="contact-content__note">
              <span>ON SOCIAL MEDIA</span>
              <p>
                You can also send a direct message on{" "}
                <a
                  className="contact-content__social-link"
                  href="https://www.instagram.com/ouicostumestudio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                ,{" "}
                <a
                  className="contact-content__social-link"
                  href="https://www.facebook.com/ouicostumestudio"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                , or{" "}
                <a
                  className="contact-content__social-link"
                  href="https://www.tiktok.com/@ouicostumestudio"
                  target="_blank"
                  rel="noreferrer"
                >
                  TikTok
                </a>
                .
              </p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
