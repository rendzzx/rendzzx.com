// app/projects/page.tsx
import {Navigation} from "@/app/components/nav";
import {ProjectsClientWrapperFetcher} from "./projects-client-wrapper-fetcher"; // Import Fetcher

export default async function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      <div className="container flex flex-col items-center justify-center pt-24 mx-auto px-4">
        {/* DELEGASIKAN SEMUA LOGIKA DISPLAY DAN TRANSLASI KE CLIENT FETCHER */}
        <ProjectsClientWrapperFetcher />
      </div>
    </div>
  );
}
