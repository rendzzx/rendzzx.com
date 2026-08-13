import {MetadataRoute} from "next";
import {getSortedProjectsData} from "@/util/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rendzzx.com";

  const staticPaths = ["", "/about", "/experience", "/skills", "/projects", "/contact"];
  const staticPages = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const projects = getSortedProjectsData("en");
  const projectPages = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...projectPages];
}
