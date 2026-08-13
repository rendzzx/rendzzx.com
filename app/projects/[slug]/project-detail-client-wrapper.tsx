"use client";

import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {useI18n} from "@/app/providers/i18n-provider";
import type {Project} from "@/util/projects";

interface ProjectDetailClientWrapperProps {
  slug: string;
  projectsByLocale: Record<string, Project[]>;
}

export const ProjectDetailClientWrapper: React.FC<
  ProjectDetailClientWrapperProps
> = ({slug, projectsByLocale}) => {
  const {locale, t} = useI18n();

  const projects = projectsByLocale[locale] ?? projectsByLocale.en ?? [];
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl text-zinc-900 dark:text-white">
        Project not found in this language.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl">
      <Link
        href="/projects"
        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center gap-2 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> {t("projects_page", "back_to_projects")}
      </Link>

      <header className="mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white mb-2">
          {project.title}
        </h1>
        <div className="text-sm text-zinc-500">
          <span>{project.year}</span> | <span>Stack: {project.stack}</span>
        </div>
      </header>

      <div
        className="prose dark:prose-invert prose-p:text-zinc-700 dark:prose-p:text-zinc-400 prose-headings:text-zinc-900 dark:prose-headings:text-white prose-a:text-orange-600 dark:prose-a:text-orange-500"
        dangerouslySetInnerHTML={{__html: project.contentHtml}}
      />

      {project.url && (
        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 dark:text-orange-500 hover:underline"
          >
            {t("projects_page", "visit_project_link")} &rarr;
          </a>
        </div>
      )}
    </div>
  );
};
