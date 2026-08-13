import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData} from "@/util/projects";
import {ProjectDetailClientWrapper} from "./project-detail-client-wrapper";
import type {Metadata} from "next";

export function generateStaticParams() {
  const idProjects = getSortedProjectsData("id");
  const enProjects = getSortedProjectsData("en");

  const allSlugs = Array.from(
    new Set([...idProjects.map((p) => p.slug), ...enProjects.map((p) => p.slug)])
  );

  return allSlugs.map((slug) => ({slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const projects = [
    ...getSortedProjectsData("en"),
    ...getSortedProjectsData("id"),
  ];
  const project = projects.find((p) => p.slug === slug);

  return {
    title: project ? project.title : "Project",
    description: project?.description ?? "Project details",
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const projectsByLocale = {
    en: getSortedProjectsData("en"),
    id: getSortedProjectsData("id"),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />

      <ProjectDetailClientWrapper
        slug={slug}
        projectsByLocale={projectsByLocale}
      />
    </div>
  );
}
