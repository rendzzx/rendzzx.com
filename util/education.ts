import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";

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

const contentDirectory = path.join(process.cwd(), "content", "education");

export function getSortedEducationData(locale: string = "id"): Education[] {
  const dir = path.join(contentDirectory, locale);

  if (!fs.existsSync(dir)) {
    console.warn(`Education directory not found for locale: ${locale}.`);
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
      school: data.school,
      degree: data.degree,
      startDate: data.startDate,
      endDate: data.endDate,
      gpa: data.gpa,
      location: data.location,
      summary: data.summary ?? "",
      courses: data.courses ?? [],
      contentHtml,
    } as Education;
  });

  return all.sort((a, b) => a.sort - b.sort);
}
