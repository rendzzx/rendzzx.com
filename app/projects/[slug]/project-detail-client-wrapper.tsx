// app/projects/[slug]/project-detail-client-wrapper.tsx
"use client";

import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {useI18n} from "@/app/providers/i18n-provider"; // Client Hook aman di sini
import {Project} from "@/util/projects"; // Asumsi path dan interface sudah benar

interface ProjectDetailWrapperProps {
  project: Project;
}

export const ProjectDetailClientWrapper: React.FC<
  ProjectDetailWrapperProps
> = ({project}) => {
  // Client Hook dipanggil di sini!
  const {t} = useI18n();

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
      {/* Tombol Kembali menggunakan terjemahan */}
      <Link
        href="/projects"
        className="text-zinc-400 hover:text-zinc-100 flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />{" "}
        {t("projects_page", "back_to_projects")}
      </Link>

      {/* Header Proyek (Konten sudah diterjemahkan via Markdown) */}
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
            {t("projects_page", "visit_project_link")} &rarr;
          </a>
        </div>
      )}
    </div>
  );
};
