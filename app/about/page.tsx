import type { Metadata } from "next";
import Image from "next/image";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About Oui Costume Studio | Handmade Costumes Since 2004",
  description:
    "Meet Oui Dettmer and discover the story behind Oui Dancewear, Oui Design Shop, and today's Oui Costume Studio in Southern California.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="interior-intro section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            ABOUT OUI COSTUME STUDIO
          </p>
          <h1>
            Custom dancewear,
            <br />
            since 2004.
          </h1>
          <p>
            I&apos;m Oui Dettmer, the designer, seamstress, and mother behind
            the studio.
          </p>
        </section>

        <section className="about-story section-shell">
          <div className="about-story__image">
            <Image
              src="/images/oui-dettmer.webp"
              alt="Oui Dettmer, founder and costume designer at Oui Costume Studio"
              width={2030}
              height={2412}
              preload
              sizes="(max-width: 760px) 100vw, 45vw"
            />
          </div>
          <div className="about-story__copy">
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              HOW IT STARTED
            </p>
            <h2>
              It began with
              <br />
              my daughter.
            </h2>
            <p>
              In 2004, I founded Oui Dancewear now known as <strong>Oui Costume Studio</strong> after making dance clothes for
              my daughter&apos;s classes. She trained more than 40 hours a
              week, so comfort and durability mattered just as much as the
              design. I wanted her to have pieces she loved wearing and
              could move freely in.
            </p>
            <p>
              Other dancers began asking for pieces of their own, and those
              early requests grew into collaborations with studios across
              Southern California. Over 36 years of sewing, I&apos;ve learned
              to look closely at both the performer and the performance:
              how a garment feels, how it moves, and how its details appear
              on stage.
            </p>
            <p>
              In 2020, I renamed the business Oui Design Shop as my work
              expanded into special-occasion outfits alongside dancewear.
              The name became Oui Costume Studio in 2025, bringing that
              range of work together under one roof. My daughter, Pam, now
              works alongside me in the studio. What started with her
              dancewear has become a family business, creating custom pieces
              for children, teens, and adults.
            </p>
            <p>
              Most mornings, I&apos;m hand-stitching appliqués with a cup of
              coffee beside me. When I&apos;m not at the machine, I&apos;m
              spending time with my family.
            </p>
          </div>
        </section>

        <section className="about-experience">
          <div className="section-shell about-experience__inner">
            <div>
              <p className="eyebrow eyebrow--light">
                <span className="eyebrow__rule" />
                OTHER CUSTOM WORK
              </p>
              <h2>
                Costume design
                <br />
                beyond dance.
              </h2>
            </div>
            <div className="about-experience__copy">
              <p>
                I personally fit more than 200 dance costumes each season.
                Those fittings are where I see how a neckline sits, where a
                strap needs adjusting, and whether a dancer feels comfortable
                moving in a piece.
              </p>
              <p>
                My work includes jazz, contemporary, lyrical, and teen
                competition costumes, along with wedding dresses, prom and
                pageant wear, and audition pieces for NFL, NBA, collegiate
                dance teams, and Broadway. Each setting asks something
                different of a garment; I enjoy working out those details
                with the person wearing it.
              </p>
              <a className="button button--cream" href="/contact">
                Talk through your project
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
