// app/about/page.tsx
"use client";
import Image from "next/image";
import {Navigation} from "../components/nav";
import Link from "next/link";
import {simpleMarkdownToHtml} from "@/util/markdown-parser";
import {useI18n} from "../providers/i18n-provider";

export default function AboutPage() {
  const {t} = useI18n();

  const stats = [
    {value: "5+", label: t("about_page", "stats_experience")},
    {value: "15+", label: t("about_page", "stats_projects")},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />

      <div className="container flex flex-col items-center justify-center min-h-screen mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-center w-full max-w-3xl">
          {/* Kiri: Foto + Statistik + Tombol */}
          <div className="flex flex-col items-center gap-6 md:w-48 shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-200 rounded-full border-4 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden">
              <Image
                src="/me.png"
                alt="Rendzzx Profile Picture"
                width={160}
                height={160}
                priority
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-display">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                {t("about_page", "education_place")}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {t("about_page", "education_major")}
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/cv_rendy.pdf"
                download
                className="w-full text-center px-4 py-2.5 text-sm font-medium text-white border border-zinc-700 rounded-full bg-orange-600 hover:bg-orange-500 transition-colors duration-300"
              >
                {t("about_page", "download_cv")}
              </Link>
              <Link
                href="/contact"
                className="w-full text-center px-4 py-2.5 text-sm font-medium text-zinc-900 border border-zinc-300 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:text-white dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors duration-300"
              >
                {t("about_page", "contact_me")} &rarr;
              </Link>
            </div>
          </div>

          {/* Kanan: Narasi */}
          <div
            className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 space-y-4 [&_strong]:text-zinc-900 dark:[&_strong]:text-white [&_em]:text-zinc-600 dark:[&_em]:text-zinc-300"
            dangerouslySetInnerHTML={{
              __html: simpleMarkdownToHtml(t("about_page", "narrative")),
            }}
          />
        </div>
      </div>
    </div>
  );
}
