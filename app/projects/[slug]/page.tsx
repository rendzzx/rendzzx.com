// app/projects/[slug]/page.tsx
import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData, Project} from "@/util/projects";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

// Fungsi untuk menghasilkan parameter (slug) secara statis saat build time
export async function generateStaticParams() {
  const projects = await getSortedProjectsData();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Fungsi untuk mendapatkan data proyek berdasarkan slug
async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getSortedProjectsData();
  return projects.find((p) => p.slug === slug);
}

// Server Component untuk halaman detail
export default async function ProjectDetailPage({
  params,
}: {
  params: {slug: string};
}) {
  const project = await getProjectBySlug(params.slug);

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

      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
        {/* Tombol Kembali */}
        <Link
          href="/projects"
          className="text-zinc-400 hover:text-zinc-100 flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Header Proyek */}
        <header className="mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl md:text-5xl font-display text-white mb-2">
            {project.title}
          </h1>
          <div className="text-sm text-zinc-500">
            <span>{project.year}</span> | <span>Stack: {project.stack}</span>
          </div>
        </header>

        {/* Konten Proyek (HTML yang di-render dari Markdown) */}
        <div
          className="prose prose-invert prose-p:text-zinc-400 prose-headings:text-white prose-a:text-orange-500"
          dangerouslySetInnerHTML={{__html: project.contentHtml}}
        />

        {/* Link URL Proyek */}
        {project.url && (
          <div className="mt-10 pt-6 border-t border-zinc-800">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline"
            >
              Visit Project Link &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
