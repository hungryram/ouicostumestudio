import type { MetadataRoute } from "next";

const searchAgents = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: searchAgents,
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://www.ouicostumestudio.com/sitemap.xml",
  };
}
