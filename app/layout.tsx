import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
