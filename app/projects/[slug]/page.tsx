// app/projects/[slug]/page.tsx
import {Navigation} from "@/app/components/nav";
import {getSortedProjectsData, Project} from "@/util/projects";
import {ProjectDetailFetcher} from "./project-detail-fetcher"; // Import Client Fetcher

// app/projects/[slug]/page.tsx (Fungsi generateStaticParams)

export async function generateStaticParams() {
  const idProjects = await getSortedProjectsData("id");
  const enProjects = await getSortedProjectsData("en");

  // Perbaikan: Gabungkan array map sebelum membuat Set.
  // Kemudian gunakan Array.from(Set) untuk memastikan kompatibilitas.
  const allSlugs = Array.from(
    new Set([
      ...idProjects.map((p) => p.slug), // Menggunakan spread operator pada hasil map (array)
      ...enProjects.map((p) => p.slug), // Menggunakan spread operator pada hasil map (array)
    ])
  );

  return allSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Server Component: Fokus hanya pada struktur halaman dan Navigation
export default async function ProjectDetailPage({
  params,
}: {
  params: {slug: string};
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      {/* Meneruskan slug ke Client Fetcher */}
      {/* Client Fetcher akan mengambil data berdasarkan slug dan LOCALE AKTIF */}
      <ProjectDetailFetcher slug={params.slug} />
    </div>
  );
}
