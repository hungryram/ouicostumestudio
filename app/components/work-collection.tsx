import Link from "next/link";
import type { WorkCollection } from "../work/collections";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import ZoomableImage from "./zoomable-image";

type WorkCollectionProps = {
  collection: WorkCollection;
  nextCollection: WorkCollection;
};

export default function WorkCollectionPage({
  collection,
  nextCollection,
}: WorkCollectionProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="interior-intro section-shell">
          <Link className="text-link collection-back" href="/work">
            Back to all work
          </Link>
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            {collection.title.toUpperCase()}
          </p>
          <h1>{collection.heading}</h1>
          <p>{collection.description}</p>
        </section>

        <section
          className="collection-gallery section-shell"
          aria-label={`${collection.title} gallery`}
        >
          {collection.photos.map(([filename, width, height, alt]) => (
            <figure className="collection-gallery__item" key={filename}>
              <ZoomableImage
                src={`/images/${collection.folder}/${filename}`}
                alt={alt}
                width={width}
                height={height}
              />
            </figure>
          ))}
        </section>

        <nav className="collection-navigation section-shell" aria-label="More work">
          <Link className="text-link" href="/work">
            All work
          </Link>
          <Link className="collection-navigation__next" href={nextCollection.href}>
            <span className="eyebrow">EXPLORE THE OTHER COLLECTION</span>
            <span>{nextCollection.title} &rarr;</span>
          </Link>
        </nav>

        <section className="simple-cta section-shell">
          <p className="eyebrow">
            <span className="eyebrow__rule" />
            CUSTOM ORDERS
          </p>
          <h2>
            {collection.title === "Photoshoot" ? "Your turn" : "Have a detail"}
            <br />
            {collection.title === "Photoshoot" ? "in front of the camera." : "in mind?"}
          </h2>
          <Link className="button button--plum" href="/contact">
            {collection.title === "Photoshoot" ? "Explore your dancewear idea" : "Share your costume references"}
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
