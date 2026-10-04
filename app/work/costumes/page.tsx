import type { Metadata } from "next";
import WorkCollectionPage from "../../components/work-collection";
import { costumes, photoshoot } from "../collections";

export const metadata: Metadata = {
  title: "Custom Dance Competition Costumes | Oui Costume Studio",
  description: costumes.description,
};

export default function CostumesPage() {
  return <WorkCollectionPage collection={costumes} nextCollection={photoshoot} />;
}
