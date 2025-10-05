// app/projects/[slug]/project-detail-fetcher.tsx
"use client";

import React, {useEffect, useState} from "react";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";
import {useI18n} from "@/app/providers/i18n-provider";
import {Project} from "@/util/projects";
import {ProjectDetailClientWrapper} from "./project-detail-client-wrapper"; // Wrapper untuk rendering

interface ProjectDetailFetcherProps {
  slug: string; // Terima slug sebagai prop dari Server Component
}

export const ProjectDetailFetcher: React.FC<ProjectDetailFetcherProps> = ({
  slug,
}) => {
  const {locale, t} = useI18n(); // Ambil locale untuk fetching
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memastikan data diambil ulang setiap kali locale atau slug berubah
  useEffect(() => {
    async function fetchProjectData() {
      setIsLoading(true);
      try {
        // Panggil API Route untuk mendapatkan data berdasarkan slug dan locale
        const response = await fetch(`/api/projects/${slug}?locale=${locale}`);

        if (!response.ok) {
          setProject(null);
          return;
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error(
          `Failed to fetch project data for ${slug} (${locale}):`,
          error
        );
        setProject(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjectData();
  }, [slug, locale]); // DEPENDENSI: Ambil ulang data ketika locale atau slug berubah

  if (isLoading) {
    // Teks loading ini juga harus diterjemahkan, tetapi kita gunakan teks statis dulu
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl text-zinc-500">
        <p>{t("projects_page", "loading_data")}...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-4xl text-white">
        Project not found.
      </div>
    );
  }

  // Gunakan wrapper client untuk merender (kita tidak perlu lagi useI18n di wrapper ini)
  return <ProjectDetailClientWrapper project={project} />;
};
