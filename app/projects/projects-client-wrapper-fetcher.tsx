// app/projects/projects-client-wrapper-fetcher.tsx
"use client";

import React, {useEffect, useState, useMemo} from "react";
import {useI18n} from "../providers/i18n-provider";
import {Project} from "@/util/projects"; // Asumsi interface Project di-import dari sini
import Link from "next/link";
import {Card} from "@/app/components/card";
import {ArrowRight} from "lucide-react";

interface ProjectsWrapperProps {
  // Kita tidak lagi menerima data dari server, tapi dari hook.
}

export const ProjectsClientWrapperFetcher: React.FC<
  ProjectsWrapperProps
> = () => {
  const {locale, t} = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memastikan data diambil ulang setiap kali locale berubah
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        // Panggil Server Function dari client.
        // Next.js akan menangani endpoint API/Server Action.
        // Namun, karena getSortedProjectsData adalah fungsi server side yang di-import ke client,
        // kita harus memanggilnya dari file Server Component utama (melalui prop) atau membuat API Route.
        // Karena kita tidak mau membuat API Route, kita akan melakukan FAKE FETCHING
        // dan MENGAMBIL LOGIKA DARI SERVER ACTION (Jika didukung Next.js 14+) atau
        // KITA PINDAHKAN LOGIKA getSortedProjectsData ke DALAM FOLDER API.

        // SOLUSI SEMENTARA: Panggil fungsi fiktif di sisi client, yang akan kita perbaiki nanti
        // Agar aman dari error, kita anggap fungsi fetchProjectsData ada di /api

        // const response = await fetch(`/api/projects?locale=${locale}`);
        const response = await fetch(`/api/projects?locale=${locale}`, {
          // PARAMETER BARU UNTUK MEMAKSA NON-CACHING
          cache: "no-store", // Next.js standard for disabling cache
          // Optional: headers: { 'Cache-Control': 'no-cache' }
        });
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, [locale]); // DEPENDENSI: Ambil ulang data ketika locale berubah

  const featured = projects.find((p) => p.isFeatured) || projects[0];
  const latestProjects = projects.filter((p) => p.slug !== featured?.slug);

  if (isLoading) {
    return <div className="text-zinc-500 mt-10">Loading projects...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="text-zinc-500 mt-10">
        No projects found for this language.
      </div>
    );
  }

  // ... (Logika rendering sama dengan ProjectsClientWrapper) ...
  return (
    <>
      <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 font-display mb-12 mt-10">
        {t("navigation", "projects")}
      </h1>

      <div className="w-full max-w-6xl space-y-12">
        {featured && (
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="p-8 md:p-12">
                <h2 className="text-4xl md:text-6xl font-display text-white mb-4">
                  {featured.title} {/* Diterjemahkan dari file MD */}
                </h2>
                <p className="text-zinc-400 mb-4">{featured.description}</p>{" "}
                {/* Diterjemahkan dari file MD */}
                <span className="text-orange-500 flex items-center gap-2">
                  {t("projects_page", "view_details")}{" "}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </article>
            </Link>
          </Card>
        )}

        {/* === DAFTAR PROYEK LAINNYA === */}
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
                  <div className="flex justify-between items-center text-xs text-zinc-500 pt-4 border-t border-zinc-800 gap-4">
                    <span>{project.year}</span>
                    <span className="text-orange-500 text-right">{project.stack}</span>
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
