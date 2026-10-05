import type { Metadata } from "next";
import WorkCollectionPage from "../../components/work-collection";
import { costumes, photoshoot } from "../collections";

export const metadata: Metadata = {
  alternates: { canonical: "/work/photoshoot" },
  title: "Custom Dancewear & Photoshoots | Oui Costume Studio",
  description: photoshoot.description,
};

export default function PhotoshootPage() {
  return <WorkCollectionPage collection={photoshoot} nextCollection={costumes} />;
}
