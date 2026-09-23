import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anonym.is-a.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Routes d'API et page de retour de paiement : rien à indexer.
      disallow: ["/api/", "/soutien/merci"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
