import type { Metadata } from "next";
import Accordion from "../components/accordion";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "FAQ | Oui Costume Studio",
  description:
    "Helpful answers about starting a custom costume project and taking body measurements for dancewear.",
};

const measurements = [
  {
    name: "Bust",
    instructions:
      "With arms relaxed at your sides, measure around the fullest part of the chest. Keep the tape straight and level across the back. This helps determine top size.",
  },
  {
    name: "Waist",
    instructions:
      "Measure around the smallest part of the waist, about one inch above the belly button.",
  },
  {
    name: "Hips",
    instructions:
      "Stand with heels together and measure around the fullest part of the hips and bottom. Keep the tape straight and level all the way around. This helps determine skirt, pants, and shorts size.",
  },
  {
    name: "Girth",
    instructions:
      "Place the tape at the top center of one shoulder. Bring it down the front of the body, through the legs, and up the back to the same shoulder. Keep the tape slightly loose, not tight.",
  },
  {
    name: "Inseam",
    instructions:
      "Measure from the upper inner thigh down to the floor along the inside of the leg. Keep the tape slightly loose.",
  },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="interior-intro section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            COMMON QUESTIONS
          </p>
          <h1>
            Questions &
            <br />
            measurements.
          </h1>
          <p>
            Information about custom orders and how to take measurements.
          </p>
        </section>

        <section className="faq-content section-shell">
          <div className="faq-group">
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              GETTING STARTED
            </p>
            <Accordion title="How do I begin a custom order?" defaultOpen>
              <p>
                Send an inquiry through the <a href="/contact">contact page</a>.
                We&apos;ll discuss your requirements and timing before
                deciding how to move forward. You don&apos;t need to have
                every design detail settled.
              </p>
            </Accordion>
            <Accordion title="Can I inquire if your schedule is full?">
              <p>
                Absolutely. Send your preferred date even if it falls outside
                the current booking window. An inquiry isn&apos;t a booking
                commitment; it gives us a chance to check availability and
                discuss whether your timeline can work.
              </p>
            </Accordion>
            <Accordion title="What kinds of pieces can the studio make?">
              <p>
                I make custom dancewear and performance costumes, as well as
                prom outfits and audition wear.
              </p>
            </Accordion>
            <Accordion title="What do costumes cost, and how long do they take?">
              <p>
                Basic costumes in standard sizing start at $250, while custom
                costumes start at $350. Most designs range from $375 to $500.
                Each piece is handmade with premium fabric. Standard delivery
                takes 4–6 weeks from payment. Rush orders may be available for
                an additional charge, with delivery in 2–4 weeks from payment.
                Timing and availability are confirmed before an order moves
                forward.
              </p>
            </Accordion>
            <Accordion title="What should I include in my first message?">
              <p>
                Please include your deadline and whether the costume is for
                a solo performer or a group. Mention any specific movement
                or coverage needs so I can take those into account.
              </p>
            </Accordion>
            <Accordion title="Are your costumes handmade?">
              <p>
                Yes. I handle the pattern, construction, and finishing myself,
                including hand-applied embellishments where the design calls
                for them.
              </p>
            </Accordion>
            <Accordion title="Do you ship outside Southern California?">
              <p>
                Yes. Orders are shipped throughout the United States.
              </p>
            </Accordion>
            <Accordion title="Can I ask for help taking measurements?">
              <p>
                Yes. If you&apos;re unsure about a measurement, get in touch
                and I can explain how to take it.
              </p>
            </Accordion>
          </div>

          <div className="faq-group faq-group--measurements">
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              TAKING MEASUREMENTS
            </p>
            <p className="faq-group__intro">
              Use a soft measuring tape over fitted dancewear, not loose
              clothing. Keep the tape snug but not tight. If possible, ask
              someone to help.
            </p>
            {measurements.map((measurement, index) => (
              <Accordion
                className="faq-item faq-item--measurement"
                key={measurement.name}
                title={
                  <>
                    <span className="faq-item__number">0{index + 1}</span>
                    {measurement.name}
                  </>
                }
              >
                <p>{measurement.instructions}</p>
              </Accordion>
            ))}
            <p className="faq-group__footnote">
              Contact me if you have questions about any of these measurements.
            </p>
          </div>
        </section>

        <section className="simple-cta section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            MORE QUESTIONS?
          </p>
          <h2>
            Need help with
            <br />
            your measurements?
          </h2>
          <a className="button button--plum" href="/contact">
            Ask a measurement question
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
