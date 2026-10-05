import type { MetadataRoute } from "next";

const siteUrl = "https://www.ouicostumestudio.com";

const routes = [
  "",
  "/about",
  "/work",
  "/work/photoshoot",
  "/work/costumes",
  "/contact",
  "/faq",
  "/private-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `${siteUrl}${route}` }));
}
