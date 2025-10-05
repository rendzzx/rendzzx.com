// util/projects.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

// Definisikan tipe data untuk Project
export interface Project {
  slug: string;
  title: string;
  description: string;
  year: number;
  stack: string;
  isFeatured: boolean;
  url?: string;
  contentHtml: string;
}

const contentDirectory = path.join(process.cwd(), "content", "projects");

/**
 * Mengambil dan memproses semua file Markdown proyek.
 */
export async function getSortedProjectsData(
  locale: string = "id"
): Promise<Project[]> {
  // Ambil semua nama file dari direktori /content/projects
  const projectsDirectory = path.join(contentDirectory, locale);

  // Pastikan direktori ada
  if (!fs.existsSync(projectsDirectory)) {
    console.warn(
      `Project directory not found for locale: ${locale}. Falling back to default.`
    );
    // Opsi: Fallback ke 'id' jika locale spesifik tidak ditemukan
    return [];
  }
  const fileNames = fs.readdirSync(projectsDirectory);

  const allProjectsData = fileNames.map((fileName) => {
    // Hapus ".md" dari nama file untuk mendapatkan slug
    const slug = fileName.replace(/\.md$/, "");

    // Baca konten file markdown sebagai string
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Gunakan gray-matter untuk memisahkan frontmatter dari konten body
    const matterResult = matter(fileContents);

    // Konversi Markdown body menjadi HTML string menggunakan Remark
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content);
    const contentHtml = processedContent.toString();

    // Gabungkan data
    return {
      slug,
      contentHtml,
      // Konversi data frontmatter ke tipe Project
      ...(matterResult.data as Omit<Project, "slug" | "contentHtml">),
    } as Project;
  });

  // Sort proyek berdasarkan tahun (atau kriteria lain)
  return allProjectsData.sort((a, b) => (a.year < b.year ? 1 : -1));
}
