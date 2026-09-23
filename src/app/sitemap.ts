import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anonym.is-a.dev";

/* Les routes statiques et une entrée par projet. /soutien/merci en est
   volontairement absente : c'est une page d'arrivée après paiement. */

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = ["", "/about", "/projects", "/parcours", "/contact", "/soutien"];

  return [
    ...pages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
