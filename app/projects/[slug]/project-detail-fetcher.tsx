// app/projects/[slug]/project-detail-fetcher.tsx
"use client";

import React, {useEffect, useState} from "react";
import {useI18n} from "@/app/providers/i18n-provider";
// Ganti path ini ke lokasi Project interface Anda (asumsi di @/util/projects)
import {Project} from "@/util/projects";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

interface ProjectDetailFetcherProps {
  slug: string;
}

export const ProjectDetailFetcher: React.FC<ProjectDetailFetcherProps> = ({
  slug,
}) => {
  // Ambil locale dan fungsi terjemahan dari context
  const {locale, t} = useI18n();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectData() {
      setIsLoading(true);
      try {
        // Panggil API Route detail dengan slug dan locale
        const response = await fetch(`/api/projects/${slug}?locale=${locale}`, {
          cache: "no-store", // Wajib: Menonaktifkan cache browser
        });

        if (!response.ok) {
          setProject(null);
          return;
        }
        const data = await response.json();
        setProject(data as Project);
      } catch (error) {
        console.error(
          `Failed to fetch project data for ${slug} (${locale}):`,
          error
        );
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjectData();
  }, [slug, locale]); // DEPENDENSI: Ambil ulang data ketika locale berubah

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl text-zinc-500">
        <p>Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl text-white">
        Project not found in this language.
      </div>
    );
  }

  // --- Render Konten Detail Proyek ---
  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
      {/* Tombol Kembali (Teks terjemahan) */}
      <Link
        href="/projects"
        className="text-zinc-400 hover:text-zinc-100 flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />{" "}
        {t("projects_page", "back_to_projects")}
      </Link>

      {/* Header Proyek (Data dinamis dari Markdown) */}
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl md:text-5xl font-display text-white mb-2">
          {project.title}
        </h1>
        <div className="text-sm text-zinc-500">
          <span>{project.year}</span> | <span>Stack: {project.stack}</span>
        </div>
      </header>

      {/* Konten Markdown yang sudah di-render ke HTML */}
      <div
        className="prose prose-invert prose-p:text-zinc-400 prose-headings:text-white prose-a:text-orange-500"
        dangerouslySetInnerHTML={{__html: project.contentHtml}}
      />

      {/* Link URL Proyek (Teks terjemahan) */}
      {project.url && (
        <div className="mt-10 pt-6 border-t border-zinc-800">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            {t("projects_page", "visit_project_link")} &rarr;
          </a>
        </div>
      )}
    </div>
  );
};
