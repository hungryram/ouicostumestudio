import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ouicostumestudio.com"),
  alternates: {
    canonical: "/",
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  verification: {
    google: "PqZlZfS9A4ac61v-xCw8EK9pAcPGajasd0ul51sJTK4",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Oui Costume Studio",
    url: "https://www.ouicostumestudio.com",
    logo: "https://www.ouicostumestudio.com/images/logo.png",
    description:
      "Handmade custom dancewear, performance costumes, wedding dresses, and pageant wear by a family-run studio in Southern California. Shipped nationwide.",
    founder: {
      "@type": "Person",
      name: "Oui Dettmer",
    },
    sameAs: [
      "https://www.instagram.com/ouicostumestudio/",
      "https://www.facebook.com/ouicostumestudio",
      "https://www.tiktok.com/@ouicostumestudio",
    ],
  };
  const organizationJsonLdString = JSON.stringify(organizationJsonLd).replace(
    /</g,
    "\\u003c",
  );

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLdString }}
        />
        {children}
      </body>
      <GoogleAnalytics gaId="G-ZNE1KG0QMZ" />
    </html>
  );
}
