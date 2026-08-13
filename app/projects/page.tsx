import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData} from "@/util/projects";
import {ProjectsClientWrapper} from "./projects-client-wrapper";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects built by Muhammad Rendy Maulana — web applications, REST APIs, and internal systems.",
};

export default function ProjectsPage() {
  const projectsByLocale = {
    en: getSortedProjectsData("en"),
    id: getSortedProjectsData("id"),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />

      <div className="container flex flex-col items-center justify-center pt-24 pb-24 mx-auto px-4">
        <ProjectsClientWrapper projectsByLocale={projectsByLocale} />
      </div>
    </div>
  );
}
