import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";

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

const contentDirectory = path.join(process.cwd(), "content", "experience");

export function getSortedExperienceData(locale: string = "id"): Experience[] {
  const dir = path.join(contentDirectory, locale);

  if (!fs.existsSync(dir)) {
    console.warn(`Experience directory not found for locale: ${locale}.`);
    return [];
  }

  const fileNames = fs
    .readdirSync(dir)
    .filter((name) => /\.mdx?$/.test(name));

  const all = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const {data, content} = matter(fileContents);
    const contentHtml = marked.parse(content, {async: false}) as string;

    return {
      slug,
      sort: data.sort ?? 999,
      company: data.company,
      role: data.role,
      startDate: data.startDate,
      endDate: data.endDate,
      current: data.current ?? false,
      location: data.location,
      logo: data.logo,
      summary: data.summary ?? "",
      technologies: data.technologies ?? [],
      contentHtml,
    } as Experience;
  });

  return all.sort((a, b) => a.sort - b.sort);
}
