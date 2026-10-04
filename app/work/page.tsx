import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { costumes, photoshoot } from "./collections";

export const metadata: Metadata = {
  title: "Handmade Dance Costumes & Custom Wear | Oui Costume Studio",
  description:
    "Custom jazz, contemporary, lyrical, and competition costumes, plus wedding and pageant wear. Handmade in Southern California and shipped nationwide.",
};

const specialties = [
  {
    title: "Custom dance costumes",
    copy: "A lyrical solo and a jazz routine call for different silhouettes. Fabric, coverage, and embellishment are chosen with the choreography in mind.",
  },
  {
    title: "The fit",
    copy: "A costume needs to stay secure through turns, extensions, and floorwork. The placement of seams, straps, and openings matters as much as the finished look.",
  },
  {
    title: "Weddings & pageants",
    copy: "For a ceremony or a pageant, we can explore the neckline, shape, and decorative details that suit you and the occasion.",
  },
];

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="interior-intro section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            SELECTED WORK
          </p>
          <h1>
            Recent
            <br />
            costume work.
          </h1>
          <p>
            Browse the finished costumes in the studio, then see how they
            look in front of the camera.
          </p>
        </section>

        <section className="work-collections section-shell" aria-label="Work collections">
          {[photoshoot, costumes].map((collection) => (
            <Link className="work-collection-card" href={collection.href} key={collection.href}>
              <div className="work-collection-card__image">
                <Image
                  src={collection.cover}
                  alt={collection.title === "Photoshoot"
                    ? "Dancer leaping in a black top and flowing blue skirt"
                    : "White competition costume with silver appliqué"}
                  fill
                  sizes="(max-width: 760px) 92vw, 46vw"
                />
              </div>
              <div className="work-collection-card__caption">
                <h2>{collection.title}</h2>
                <span className="text-link">View collection</span>
              </div>
            </Link>
          ))}
        </section>

        <section className="specialties-section">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow__rule" />
                  OTHER CUSTOM WORK
                </p>
                <h2>
                  Made for the
                  <br />
                  occasion.
                </h2>
              </div>
              <p className="section-heading__aside">
                The galleries are a starting point, not a catalog. Your
                project can take a different direction.
              </p>
            </div>
            <div className="specialties-grid">
              {specialties.map((specialty, index) => (
                <article className="specialty-card" key={specialty.title}>
                  <span>0{index + 1}</span>
                  <h3>{specialty.title}</h3>
                  <p>{specialty.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="simple-cta section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            CUSTOM ORDERS
          </p>
          <h2>
            What would
            <br />
            you like to create?
          </h2>
          <a className="button button--plum" href="/contact">
            Discuss a custom piece
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
