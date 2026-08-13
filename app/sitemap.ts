import {MetadataRoute} from "next";
import {getSortedProjectsData} from "@/util/projects";
import {getSortedExperienceData} from "@/util/experience";
import {siteConfig} from "@/util/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPaths = ["", "/about", "/experience", "/skills", "/projects", "/contact"];
  const staticPages = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const projects = getSortedProjectsData("en").map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const experiences = getSortedExperienceData("en").map((e) => ({
    url: `${baseUrl}/experience/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...projects, ...experiences];
}
