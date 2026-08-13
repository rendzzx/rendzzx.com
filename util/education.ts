import path from "path";
import {readMdxDirectory} from "./mdx";

export interface Education {
  slug: string;
  sort: number;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location: string;
  summary: string;
  courses: string[];
  contentHtml: string;
}

interface EducationFrontmatter {
  sort?: number;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  location?: string;
  summary?: string;
  courses?: string[];
}

const contentDirectory = path.join(process.cwd(), "content", "education");

export function getSortedEducationData(locale = "id"): Education[] {
  return readMdxDirectory<EducationFrontmatter>(contentDirectory, locale)
    .map(({slug, data, contentHtml}) => ({
      slug,
      sort: data.sort ?? 999,
      school: data.school ?? "",
      degree: data.degree ?? "",
      startDate: data.startDate ?? "",
      endDate: data.endDate ?? "",
      gpa: data.gpa,
      location: data.location ?? "",
      summary: data.summary ?? "",
      courses: data.courses ?? [],
      contentHtml,
    }))
    .sort((a, b) => a.sort - b.sort);
}
