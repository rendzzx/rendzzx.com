import path from "path";
import {readMdxDirectory} from "./mdx";

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

interface ProjectFrontmatter {
  title?: string;
  description?: string;
  year?: number | string;
  stack?: string;
  isFeatured?: boolean;
  published?: boolean;
  status?: ProjectStatus;
  url?: string;
}

const contentDirectory = path.join(process.cwd(), "content", "projects");

export function getSortedProjectsData(locale = "id"): Project[] {
  const all = readMdxDirectory<ProjectFrontmatter>(contentDirectory, locale).map(
    ({slug, data, contentHtml}) => ({
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      year: String(data.year ?? ""),
      stack: data.stack ?? "",
      isFeatured: data.isFeatured ?? false,
      published: data.published ?? true,
      status: data.status ?? "completed",
      url: data.url,
      contentHtml,
    })
  );

  const visible = all.filter((p) => p.published !== false);
  return visible.sort((a, b) => (parseInt(a.year) < parseInt(b.year) ? 1 : -1));
}
