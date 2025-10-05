// app/projects/page.tsx
import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData, Project} from "@/util/projects";
import Link from "next/link";
import {Card} from "@/app/components/card";
import {ArrowRight} from "lucide-react";

// Server Component: Fetch data saat build time/request time
export default async function ProjectsPage() {
  const projects = await getSortedProjectsData();

  // Asumsi: Proyek pertama adalah yang unggulan (featured)
  const featured = projects.find((p) => p.isFeatured) || projects[0];
  const latestProjects = projects.filter((p) => p.slug !== featured?.slug);

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      <div className="container flex flex-col items-center justify-center pt-24 mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 font-display mb-12 mt-10">
          Projects
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
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </article>
              </Link>
            </Card>
          )}

          {/* === BAGIAN 2: DAFTAR PROYEK LAINNYA === */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProjects.map((project) => (
              <Card key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="block h-full"
                >
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
      </div>
    </div>
  );
}
