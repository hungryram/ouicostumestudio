import Image from "next/image";
import {
  HeroCaptionParallax,
  FabricScrollFrame,
  HeroCopyParallax,
  HeroImageParallax,
  IntroReveal,
} from "./components/scroll-frames";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";

const portfolio = [
  {
    image: "/images/dancer-blue.jpg",
    alt: "Dancer performing in a custom blue competition costume",
    href: "/work/photoshoot",
    className: "portfolio-card--portrait",
  },
  {
    image: "/images/dance-costume.jpg",
    alt: "Dancer in a classic black studio leotard",
    href: "/work/costumes",
    className: "portfolio-card--classic",
  },
  {
    image: "/images/stage-look.jpg",
    alt: "Ballet dancer performing in a vibrant coral costume",
    href: "/work/photoshoot",
    className: "portfolio-card--stage",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <HeroCopyParallax className="hero__copy will-change-transform">
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              CUSTOM DANCEWEAR & COSTUMES · SOUTHERN CALIFORNIA
            </p>
            <h1 id="hero-title">
              Stage-ready costumes,
              <br />
              <em>made entirely by hand.</em>
            </h1>
            <p className="hero__intro">
              I create custom dance and performance wear in Southern
              California, fitted to you and made to move. Every piece is made
              by hand, and every design is one of a kind.
            </p>
            <div className="hero__actions">
              <a className="button button--plum" href="/contact">
                Start a conversation
              </a>
              <a className="text-link" href="/work">
                Explore the work
              </a>
            </div>
          </HeroCopyParallax>

          <HeroImageParallax className="hero__visual will-change-transform">
            <div className="hero__image-wrap">
              <Image
                src="/images/hero-gymnast.jpg"
                alt="Dancer in a custom blue costume, poised mid-performance"
                fill
                preload
                sizes="(max-width: 760px) 100vw, 48vw"
                className="hero__image"
              />
            </div>
            <HeroCaptionParallax className="hero__caption will-change-transform">
              <span className="hero__caption-kicker">Performance costume</span>
              <span className="hero__caption-title">Custom designed.</span>
            </HeroCaptionParallax>
          </HeroImageParallax>
        </section>

        <FabricScrollFrame
          className="fabric-divider will-change-transform"
          aria-hidden
        >
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fabric-main" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e8d7d8" />
                <stop offset="0.32" stopColor="#fbf7f3" />
                <stop offset="0.68" stopColor="#f1e5e5" />
                <stop offset="1" stopColor="#e5d3d6" />
              </linearGradient>
              <linearGradient id="fabric-shadow" x1="0" y1="0" x2="0.9" y2="1">
                <stop offset="0" stopColor="#9e7588" stopOpacity="0.1" />
                <stop offset="0.43" stopColor="#fffdf8" stopOpacity="0.56" />
                <stop offset="0.72" stopColor="#c5a6b2" stopOpacity="0.12" />
                <stop offset="1" stopColor="#fffdf8" stopOpacity="0.28" />
              </linearGradient>
              <linearGradient
                id="fabric-fade"
                x1="0"
                y1="62"
                x2="0"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#f8f5f0" stopOpacity="0" />
                <stop offset="0.55" stopColor="#f8f5f0" stopOpacity="0.62" />
                <stop offset="1" stopColor="#f8f5f0" />
              </linearGradient>
              <filter id="fabric-grain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.55 0.12"
                  numOctaves="3"
                  seed="8"
                />
                <feColorMatrix values="0.38 0 0 0 0.36 0 0.34 0 0 0.31 0 0 0.28 0 0.24 0 0 0 0.3 0" />
              </filter>
              <clipPath id="fabric-edge">
                <path d="M0 39C81 32 122 13 207 22C292 31 336 71 426 78C523 85 574 55 659 47C752 39 793 60 872 67C961 74 1032 48 1113 39C1215 28 1263 51 1339 49C1383 48 1411 42 1440 36V120H0V39Z" />
              </clipPath>
            </defs>
            <path
              d="M0 39C81 32 122 13 207 22C292 31 336 71 426 78C523 85 574 55 659 47C752 39 793 60 872 67C961 74 1032 48 1113 39C1215 28 1263 51 1339 49C1383 48 1411 42 1440 36V120H0V39Z"
              fill="url(#fabric-main)"
            />
            <path
              d="M0 39C81 32 122 13 207 22C292 31 336 71 426 78C523 85 574 55 659 47C752 39 793 60 872 67C961 74 1032 48 1113 39C1215 28 1263 51 1339 49C1383 48 1411 42 1440 36"
              fill="none"
              stroke="url(#fabric-shadow)"
              strokeOpacity="0.7"
              strokeWidth="4"
            />
            <path
              d="M-15 65C54 57 137 42 205 48C282 55 350 94 430 96C508 98 566 82 639 74C722 65 793 81 869 88C952 96 1037 75 1112 65C1193 54 1263 73 1338 70C1386 68 1425 59 1454 57"
              fill="none"
              stroke="url(#fabric-shadow)"
              strokeWidth="13"
              strokeOpacity="0.62"
            />
            <path
              d="M-8 101C83 85 172 72 255 82C337 92 402 111 486 113C579 115 646 96 724 89C803 82 887 105 973 105C1069 105 1165 88 1242 86C1322 84 1390 96 1450 83"
              fill="none"
              stroke="#a87f91"
              strokeOpacity="0.2"
              strokeWidth="2"
            />
            <rect
              width="1440"
              height="120"
              filter="url(#fabric-grain)"
              clipPath="url(#fabric-edge)"
              opacity="0.22"
            />
            <rect y="62" width="1440" height="58" fill="url(#fabric-fade)" />
          </svg>
        </FabricScrollFrame>

        <section className="intro-section" aria-labelledby="intro-title">
          <IntroReveal
            as="div"
            className="intro-section__lead"
            delay={0.05}
          >
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              A COSTUME STARTS WITH YOU
            </p>
            <h2 id="intro-title">
              Custom costumes,
              <br />
              from{" "}
              <em className="intro-section__sketch">sketch</em>{" "}
              to stage.
            </h2>
          </IntroReveal>

          <IntroReveal
            as="figure"
            className="intro-section__image"
            delay={0.16}
          >
            <Image
              src="/images/dancer-blue.jpg"
              alt="Dancer wearing a custom blue costume in a studio"
              fill
              sizes="(max-width: 760px) 100vw, 48vw"
            />
          </IntroReveal>

          <IntroReveal
            as="div"
            className="intro-section__aside"
            delay={0.28}
          >
            <IntroReveal
              as="figure"
              className="intro-section__detail-image"
              delay={0.1}
            >
              <Image
                src="/images/dance-costume.jpg"
                alt="Dancer wearing a coral costume during a studio pose"
                fill
                sizes="(max-width: 760px) 40vw, 18vw"
              />
            </IntroReveal>
            <IntroReveal
              as="div"
              className="intro-section__copy"
              delay={0.2}
            >
              <h3 className="intro-section__greeting">Hi, I&apos;m Oui.</h3>
              <p>
                I&apos;m the designer and maker behind Oui Costume Design. You&apos;ll work
                directly with me to choose the shape, fabrics, and finishing
                touches that make your costume feel like yours.
              </p>
              <p className="intro-section__shipping">
                Made to order in Southern California. Shipped nationwide.
              </p>
              <a className="button button--plum" href="/contact">
                Tell me about your idea
              </a>
            </IntroReveal>
          </IntroReveal>
        </section>

        <section className="work-section section-shell" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow__rule" />
                WHAT I MAKE
              </p>
              <h2>
                Dance costumes
                <br />
                &amp; occasionwear.
              </h2>
            </div>
          </div>

          <div className="portfolio-grid">
            {portfolio.map((item, index) => (
              <IntroReveal
                as="article"
                className={`portfolio-card ${item.className}`}
                delay={index * 0.16}
                key={item.image}
              >
                <a className="portfolio-card__link" href={item.href}>
                  <div className="portfolio-card__image">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 760px) 90vw, 32vw"
                    />
                  </div>
                </a>
              </IntroReveal>
            ))}
          </div>
          <p className="work-section__footnote">
            Jazz, contemporary, lyrical, and teen competition costumes.
          </p>
          <div className="work-section__action">
            <a className="text-link" href="/work">
              See more of our work
            </a>
          </div>
        </section>

        <section className="studio-section" id="studio">
          <div className="studio-section__lead">
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              A LITTLE HISTORY
            </p>
            <h2>
              It started with my
              <br />
              daughter&apos;s dancewear.
            </h2>
          </div>
          <figure className="studio-section__image">
            <Image
              src="/images/performance-detail.jpg"
              alt="Dancer in a blue costume holding a dramatic performance pose"
              fill
              sizes="(max-width: 760px) 100vw, 56vw"
            />
            {/* <figcaption className="studio-section__image-caption">
              Oui Costume Studio
            </figcaption> */}
          </figure>
          <div className="studio-section__story">
            <p>
              Before Oui was a studio, it was a mother making clothes for
              her daughter&apos;s dance classes. Seeing those pieces through
              rehearsals taught me to pay attention to what a dancer needs,
              not just how a costume looks.
            </p>
            <p>
              That&apos;s still where I start: with the person who will wear
              it, and everything they need to do in it.
            </p>
            <a className="text-link" href="/about">
              Get to know the studio
            </a>
          </div>
        </section>

        <section className="process-section section-shell" id="process">
          <div className="process-section__intro">
            <p className="eyebrow">
              <span className="eyebrow__rule" />
              THE DESIGN PROCESS
            </p>
            <h2>
              From first
              <br />
              conversation to costume.
            </h2>
            <p>
              Each piece is planned around the wearer, the event, and the fit.
            </p>
          </div>
          <div className="process-steps">
            <article className="process-step">
              <span className="process-step__number" aria-hidden="true">01</span>
              <h3>Bring your idea</h3>
              <p>
                A sketch, a Pinterest board, or just an idea is enough to
                start planning your piece.
              </p>
            </article>
            <article className="process-step">
              <span className="process-step__number" aria-hidden="true">02</span>
              <h3>Design it together</h3>
              <p>
                We work out the design, fit, and details around you and the
                way the costume needs to move.
              </p>
            </article>
            <article className="process-step">
              <span className="process-step__number" aria-hidden="true">03</span>
              <h3>Made by hand</h3>
              <p>
                I cut, sew, and finish your piece in my Southern California
                studio, then ship it to you.
              </p>
            </article>
          </div>
        </section>

        <section className="closing-cta">
          <p className="eyebrow eyebrow--light">
            <span className="eyebrow__rule" />
            YOUR NEXT PROJECT
          </p>
          <h2>
            Have something
            <br />
            in mind?
          </h2>
          <p className="closing-cta__copy">
            You don&apos;t need a finished design to get in touch. Share the
            occasion and your hoped-for date, and we can talk through the
            possibilities.
          </p>
          <a className="button button--cream" href="/contact">
            Send Oui a note
          </a>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
