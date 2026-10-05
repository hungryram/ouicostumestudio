import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ouicostumestudio.com"),
  title: "Oui Costume Studio | Custom Dancewear & Costumes",
  description:
    "Handmade custom dancewear, performance costumes, wedding dresses, and pageant wear by a family-run studio in Southern California. Shipped nationwide.",
  openGraph: {
    title: "Oui Costume Studio | Custom Dancewear & Costumes",
    description:
      "Handmade custom dancewear, performance costumes, wedding dresses, and pageant wear by a family-run studio in Southern California. Shipped nationwide.",
    type: "website",
    siteName: "Oui Costume Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oui Costume Studio | Custom Dancewear & Costumes",
    description:
      "Handmade custom dancewear, performance costumes, wedding dresses, and pageant wear by a family-run studio in Southern California. Shipped nationwide.",
  },
  verification: {
    google: "PqZlZfS9A4ac61v-xCw8EK9pAcPGajasd0ul51sJTK4",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-ZNE1KG0QMZ" />
    </html>
  );
}
