import type { Metadata } from "next";
import ContactForm from "../contact/contact-form";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/waitlist" },
  title: "Costume Waitlist | Oui Costume Studio",
  description:
    "Join the Oui Costume Studio waitlist for a future handmade dancewear or costume project. Currently fully booked; bookings open March–June 2027.",
};

export default function WaitlistPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="contact-page">
        <section className="interior-intro section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            THE WAITLIST
          </p>
          <h1>
            Your next
            <br />
            costume.
          </h1>
          <p>
            The studio is currently fully booked. Bookings will open
            March–June 2027. Join the waitlist to share your idea for a future
            project. Space will be limited, and we&apos;ll be in touch to let you
            know whether we can take on your project.
          </p>
        </section>
        <section className="contact-content section-shell">
          <div className="contact-content__aside">
            <h2>A few details to get us started.</h2>
            <p>
              Include who the piece is for, the occasion, and when you hope
              to have it. If you have colors, a budget, or references in mind,
              those are helpful too.
            </p>
            <p>
              Your project details will be saved to the studio&apos;s waitlist.
              You&apos;ll receive a confirmation email after joining.
              We&apos;ll review your project as space becomes available and
              be in touch to let you know whether we can take it on.
            </p>
            <div className="contact-content__note">
              <span>PRICING &amp; TIMING</span>
              <p>
                Basic costumes in standard sizing start at $250; custom
                costumes start at $350. Most designs range from $375 to $500.
                Every piece is handmade with premium fabric.
              </p>
              <p>
                For accepted orders, standard delivery is 4–6 weeks from
                payment. When bookings are open, rush orders may be available
                for an additional charge, with delivery in 2–4 weeks from payment.
              </p>
            </div>
            <p>
              For general questions or existing orders,{" "}
              <a className="contact-content__social-link" href="/contact">
                contact the studio
              </a>.
            </p>
          </div>
          <ContactForm waitlist />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
