import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/private-policy" },
  title: "Privacy | Oui Costume Studio",
  description: "How Oui Costume Studio handles information shared through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="privacy-page section-shell">
        <section className="interior-intro">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            YOUR INFORMATION
          </p>
          <h1>Privacy</h1>
        </section>
        <div className="privacy-copy">
          <p>
            When you contact Oui Costume Studio through this website, we
            receive the name, email address, project details, and message you
            choose to share. We use this information to respond to your inquiry
            and discuss your project.
          </p>
          <p>
            Contact-form messages are transmitted through Postmark, our
            transactional email service. Postmark processes that information
            to deliver the message. You can learn more in the{" "}
            <a href="https://postmarkapp.com/privacy-policy">
              Postmark privacy policy
            </a>
            .
          </p>
          <p>
            To protect the contact form from spam, it uses Cloudflare
            Turnstile, which checks technical signals from your browser to
            confirm a person is sending the message. Learn more in the{" "}
            <a href="https://www.cloudflare.com/turnstile-privacy-policy/">
              Turnstile privacy addendum
            </a>
            .
          </p>
          <p>
            This website uses Google Analytics to understand how visitors find
            and use the site, such as which pages are viewed. Google may set
            cookies to collect this information. You can learn more in{" "}
            <a href="https://policies.google.com/technologies/partner-sites">
              how Google uses information from sites that use its services
            </a>
            . The website does not offer newsletter subscriptions or use
            advertising tools. The hosting provider may process basic technical
            information to deliver and protect the site.
          </p>
          <p>
            If you have a question about information you&apos;ve shared with
            the studio, please use the <a href="/contact">contact page</a>.
          </p>
          <p className="privacy-copy__updated">Last updated: October 2026</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
