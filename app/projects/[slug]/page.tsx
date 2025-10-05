// app/projects/[slug]/page.tsx
import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData, Project} from "@/util/projects";
import {ProjectDetailFetcher} from "./project-detail-fetcher"; // Import Client Fetcher

// generateStaticParams tetap sama (memperbaiki error syntax spread)
export async function generateStaticParams() {
  const idProjects = await getSortedProjectsData("id");
  const enProjects = await getSortedProjectsData("en");

  const allSlugs = Array.from(
    new Set([
      ...idProjects.map((p) => p.slug),
      ...enProjects.map((p) => p.slug),
    ])
  );

  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Server Component: Meneruskan slug ke Client Fetcher
export default async function ProjectDetailPage({
  params,
}: {
  params: {slug: string};
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      {/* Meneruskan slug ke Client Fetcher */}
      <ProjectDetailFetcher slug={params.slug} />
    </div>
  );
}
