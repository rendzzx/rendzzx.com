import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";

export type ProjectStatus = "completed" | "wip";

export interface Project {
  slug: string;
  title: string;
  description: string;
  year: string;
  stack: string;
  isFeatured: boolean;
  published: boolean;
  status: ProjectStatus;
  url?: string;
  contentHtml: string;
}

const contentDirectory = path.join(process.cwd(), "content", "projects");

export function getSortedProjectsData(locale: string = "id"): Project[] {
  const projectsDirectory = path.join(contentDirectory, locale);

  if (!fs.existsSync(projectsDirectory)) {
    console.warn(`Project directory not found for locale: ${locale}.`);
    return [];
  }

  const fileNames = fs
    .readdirSync(projectsDirectory)
    .filter((name) => /\.mdx?$/.test(name));

  const allProjectsData: Project[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const {data, content} = matter(fileContents);

    const contentHtml = marked.parse(content, {async: false}) as string;

    return {
      slug,
      title: data.title,
      description: data.description,
      year: String(data.year ?? ""),
      stack: data.stack ?? "",
      isFeatured: data.isFeatured ?? false,
      published: data.published ?? true,
      status: (data.status as ProjectStatus) ?? "completed",
      url: data.url,
      contentHtml,
    };
  });

  const visible = allProjectsData.filter((p) => p.published !== false);
  return visible.sort((a, b) => (parseInt(a.year) < parseInt(b.year) ? 1 : -1));
}
