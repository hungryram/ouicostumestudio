import type { Metadata } from "next";
import ContactForm from "./contact-form";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "Discuss Your Costume Idea | Contact Oui Costume Studio",
  description:
    "Share your costume idea, occasion, and preferred date with Oui. Inquiries are welcome for dancewear, performance costumes, and special occasions.",
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
            Let&apos;s hear
            <br />
            your idea.
          </h1>
          <p>
            Whether your plans are set or you&apos;re still exploring, you&apos;re
            welcome to reach out. I&apos;ll review your project and preferred
            date before we discuss availability and next steps.
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
              My current season is fully scheduled, with books planned to
              reopen in March 2027 for March through June orders. Please still
              send your inquiry, whatever your date. I&apos;ll let you know
              what&apos;s possible before you make any plans around an order.
            </p>
            <div className="contact-content__note contact-content__note--details">
              <span>PRICING &amp; TIMING</span>
              <p>
                Basic costumes in standard sizing start at $250; custom
                costumes start at $350. Most designs range from $375 to $500.
                Every piece is handmade with premium fabric.
              </p>
              <p>
                Standard delivery is 4–6 weeks from payment. Rush orders may
                be available for an additional charge, with delivery in 2–4
                weeks from payment.
              </p>
            </div>
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
