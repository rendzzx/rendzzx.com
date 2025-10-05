// app/about/page.tsx
"use client";
import Image from "next/image";
import {Navigation} from "../components/nav";
import {Card} from "../components/card";
import Link from "next/link";
import {simpleMarkdownToHtml} from "@/util/markdown-parser";
import {useI18n} from "../providers/i18n-provider";
import {StatCardWrapper} from "@/app/components/stat-card-wrapper";

export default function AboutPage() {
  const {t} = useI18n();

  // Pindahkan data stats ke dalam fungsi render agar menggunakan terjemahan
  const stats = [
    {value: "6+", label: t("about_page", "stats_experience")},
    {value: "15+", label: t("about_page", "stats_projects")},
    {value: "PHP, JS, SQL", label: t("about_page", "stats_languages")},
  ];
  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      {/* Container Konten Utama: pt-24 untuk margin aman dari navbar fixed */}
      <div className="container flex flex-col items-center justify-start pt-24 pb-20 mx-auto px-4">
        {/* Header Halaman */}
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 font-display mb-10 mt-10">
          {t("about_page", "header")} {/* TERJEMAHAN JUDUL */}
        </h1>

        {/* Konten Utama (Centered Single Column) */}
        <main className="w-full max-w-3xl space-y-8">
          {/* Bagian Foto Profil (Opsional) */}
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-zinc-800 rounded-full border-4 border-zinc-700 overflow-hidden">
              {/* Placeholder for Profile Picture */}
              <Image
                src="/me.png" // Ganti dengan path file Anda
                alt="Rendzzx Profile Picture"
                width={192} // Ukuran md:w-48 = 12rem * 16 = 192px
                height={192} // Ukuran md:h-48 = 12rem * 16 = 192px
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Paragraf Narasi (menggunakan Card) */}
          <Card>
            <div
              className="p-6 md:p-10 bg-zinc-900 rounded-xl"
              dangerouslySetInnerHTML={{
                // Gunakan terjemahan dari file JSON
                __html: simpleMarkdownToHtml(t("about_page", "narrative")),
              }}
            />
          </Card>

          {/* Bagian Statistik / Angka Kunci */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {stats.map((stat) => (
              <StatCardWrapper key={stat.label}>
                {/* Konten HANYA BERISI Teks dan Angka. Hapus semua styling background/z-index/padding. */}
                <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-display">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm md:text-base text-zinc-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </StatCardWrapper>
            ))}
          </div>

          {/* CTA/Call to Action (Tambahkan Tombol Download CV di sini) */}
          <div className="flex justify-center pt-8 space-x-4">
            {/* Tombol Download CV */}
            <Link
              href="/cv_rendy.pdf" // <<< GANTI DENGAN NAMA FILE DAN LOKASI CV ASLI ANDA DI FOLDER /public
              download
              className="inline-block px-8 py-3 text-sm font-medium text-white border border-zinc-700 rounded-full bg-orange-600 hover:bg-orange-500 transition-colors duration-300"
            >
              Download CV
            </Link>

            {/* Tombol Kontak (Opsional, sebagai tombol kedua) */}
            <Link
              href="/contact"
              className="inline-block px-8 py-3 text-sm font-medium text-white border border-zinc-700 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
            >
              Contact Me &rarr;
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
