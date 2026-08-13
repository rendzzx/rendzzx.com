import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {marked} from "marked";
import sanitizeHtml from "sanitize-html";

export interface MdxEntry<T> {
  slug: string;
  data: T;
  contentHtml: string;
}

export function readMdxDirectory<T>(
  contentDirectory: string,
  locale: string
): MdxEntry<T>[] {
  const dir = path.join(contentDirectory, locale);

  if (!fs.existsSync(dir)) {
    console.warn(`Content directory not found for locale: ${locale}.`);
    return [];
  }

  const fileNames = fs.readdirSync(dir).filter((name) => /\.mdx?$/.test(name));

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(dir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const {data, content} = matter(fileContents);
    const rawHtml = marked.parse(content, {async: false}) as string;
    const contentHtml = sanitizeHtml(rawHtml);

    return {slug, data: data as unknown as T, contentHtml};
  });
}
