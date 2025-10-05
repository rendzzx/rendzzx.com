// app/experience/page.tsx
"use client";
import {Briefcase, Calendar, MapPin} from "lucide-react";
import {Navigation} from "../components/nav";
import {Card} from "../components/card";
// Import fungsi utilitas baru
import {simpleMarkdownToHtml} from "@/util/markdown-parser";
import {useI18n} from "../providers/i18n-provider";

export default function ExperiencePage() {
  const {t} = useI18n();

  // Definisikan data pengalaman menggunakan terjemahan
  const experiences = [
    {
      role: t("experience_page", "role_job2"), // TERJEMAHAN
      company: t("experience_page", "company_job2"), // TERJEMAHAN
      duration: t("experience_page", "duration_job2"), // Statis
      location: "Jakarta", // Statis
      description: t("experience_page", "desc_job2"), // TERJEMAHAN
      technologies: [
        "PHP",
        "Laravel",
        "SQL Server",
        "MySQL",
        "JavaScript",
        "REST API",
      ],
    },
    {
      role: t("experience_page", "role_job1"), // TERJEMAHAN
      company: t("experience_page", "company_job1"), // TERJEMAHAN
      duration: t("experience_page", "duration_job1"),
      location: "Jakarta",
      description: t("experience_page", "desc_job1"), // TERJEMAHAN
      technologies: [
        "PHP",
        "CodeIgniter",
        "JavaScript",
        "React Native",
        "MS SQL Server",
        "RESTful API",
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      <div className="container flex flex-col items-center justify-start pt-24 pb-20 mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 font-display mb-16 mt-10">
          {t("experience_page", "header")} {/* TERJEMAHAN JUDUL */}
        </h1>

        <div className="w-full max-w-4xl space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <div className="relative p-6 md:p-8 flex flex-col gap-4 md:gap-6 bg-zinc-900 rounded-xl shadow-2xl">
                {/* Visual Timeline Bar (tetap sama) */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-zinc-800 hidden md:block">
                    <div className="absolute top-8 -left-3 w-5 h-5 rounded-full bg-zinc-600 border-2 border-zinc-900" />
                  </div>
                )}

                <div className="md:ml-0 flex-grow">
                  {/* Jabatan & Perusahaan (tetap sama) */}
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-0 flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-zinc-400" />
                    <span>{exp.role}</span>
                  </h2>
                  <p className="text-lg text-zinc-300 mb-4 ml-8 md:ml-0">
                    {exp.company}
                  </p>

                  {/* Detail Waktu & Lokasi (tetap sama) */}
                  <div className="flex flex-wrap items-center text-sm text-zinc-500 mb-4 space-x-4">
                    <span className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-zinc-500" />
                      <span>{exp.duration}</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-zinc-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>

                  {/* DESKRIPSI - MENGGUNAKAN DANGEROUSELYSETINNERHTML */}
                  <div
                    className="text-zinc-400 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{
                      // Menggunakan fungsi t() untuk mengambil deskripsi yang sudah diterjemahkan
                      __html: simpleMarkdownToHtml(exp.description),
                    }}
                  />

                  {/* Teknologi (Tags) (tetap sama) */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-800">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-3 py-1 font-medium tracking-wider uppercase rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
