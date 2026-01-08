import { siteConfig } from "@/config/Meta";
import { getProjectCaseStudySlugs } from "@/lib/project";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static routes
  const routes = ["", "blogs", "projects", "resume"];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route ? `${route}` : ""}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic routes (Projects)
  const projectSlugs = getProjectCaseStudySlugs();
  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${baseUrl}projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
