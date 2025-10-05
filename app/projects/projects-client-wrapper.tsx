// app/projects/projects-client-wrapper.tsx
"use client";

import Link from "next/link";
import {Card} from "@/app/components/card";
import {ArrowRight} from "lucide-react";
import {useI18n} from "../providers/i18n-provider"; // Client Hook aman di sini
import {Project} from "@/util/projects"; // Import Project Interface

interface ProjectsWrapperProps {
  featured?: Project;
  latestProjects: Project[];
}

export const ProjectsClientWrapper: React.FC<ProjectsWrapperProps> = ({
  featured,
  latestProjects,
}) => {
  // Client Hook dipanggil di sini!
  const {t} = useI18n();

  return (
    <>
      <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 font-display mb-12 mt-10">
        {t("navigation", "projects")}
      </h1>

      <div className="w-full max-w-6xl space-y-12">
        {/* === BAGIAN 1: FEATURED PROJECT === */}
        {featured && (
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="p-8 md:p-12">
                <h2 className="text-4xl md:text-6xl font-display text-white mb-4">
                  {featured.title}
                </h2>
                <p className="text-zinc-400 mb-4">{featured.description}</p>
                <span className="text-orange-500 flex items-center gap-2">
                  {t("projects_page", "view_details")}{" "}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          </Card>
        )}

        {/* === BAGIAN 2: DAFTAR PROYEK LAINNYA === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestProjects.map((project) => (
            <Card key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="block h-full">
                <article className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                    <span>{project.year}</span>
                    <span className="text-orange-500">{project.stack}</span>
                  </div>
                </article>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
