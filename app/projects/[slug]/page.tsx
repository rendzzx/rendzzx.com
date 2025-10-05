// app/projects/[slug]/page.tsx
import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData, Project} from "@/util/projects";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {ProjectDetailClientWrapper} from "./project-detail-client-wrapper"; // Import Client Wrapper

// Fungsi untuk menghasilkan parameter (slug) secara statis saat build time
export async function generateStaticParams() {
  const projects = await getSortedProjectsData();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Fungsi untuk mendapatkan data proyek berdasarkan slug dan locale
async function getProjectBySlug(
  slug: string,
  locale: string = "id"
): Promise<Project | undefined> {
  // Panggil getSortedProjectsData dengan locale
  const projects = await getSortedProjectsData(locale);
  return projects.find((p) => p.slug === slug);
}

// Server Component untuk halaman detail
export default async function ProjectDetailPage({
  params,
}: {
  params: {slug: string};
}) {
  // Asumsi: Kita menggunakan 'id' sebagai default locale
  const currentLocale = "id"; // <-- HARUS DIGANTI jika menggunakan struktur routing multi-locale

  const project = await getProjectBySlug(params.slug, currentLocale);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Project not found.
      </div>
    );
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      {/* Delegrasikan rendering dan terjemahan ke Client Wrapper */}
      <ProjectDetailClientWrapper project={project} />
    </div>
  );
}
