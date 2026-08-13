import path from "path";
import {readMdxDirectory} from "./mdx";

export interface Experience {
  slug: string;
  sort: number;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  location: string;
  logo: string;
  summary: string;
  technologies: string[];
  contentHtml: string;
}

interface ExperienceFrontmatter {
  sort?: number;
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  logo?: string;
  summary?: string;
  technologies?: string[];
}

const contentDirectory = path.join(process.cwd(), "content", "experience");

export function getSortedExperienceData(locale = "id"): Experience[] {
  return readMdxDirectory<ExperienceFrontmatter>(contentDirectory, locale)
    .map(({slug, data, contentHtml}) => ({
      slug,
      sort: data.sort ?? 999,
      company: data.company ?? "",
      role: data.role ?? "",
      startDate: data.startDate ?? "",
      endDate: data.endDate,
      current: data.current ?? false,
      location: data.location ?? "",
      logo: data.logo ?? "",
      summary: data.summary ?? "",
      technologies: data.technologies ?? [],
      contentHtml,
    }))
    .sort((a, b) => a.sort - b.sort);
}
