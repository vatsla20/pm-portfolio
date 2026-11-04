import type { MetadataRoute } from "next";
import { projects } from "@/data/site";

const base = "https://vatsla-khurana.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: base }, ...projects.map((p) => ({ url: `${base}/work/${p.slug}` }))];
}
