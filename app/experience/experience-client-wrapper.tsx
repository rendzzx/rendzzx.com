"use client";

import Image from "next/image";
import Link from "next/link";
import {Calendar, MapPin, ArrowUpRight} from "lucide-react";
import {Card} from "@/app/components/card";
import {useI18n} from "../providers/i18n-provider";
import {simpleMarkdownToHtml} from "@/util/markdown-parser";
import type {Experience} from "@/util/experience";

interface ExperienceClientWrapperProps {
  experiencesByLocale: Record<string, Experience[]>;
}

export const ExperienceClientWrapper: React.FC<ExperienceClientWrapperProps> = ({
  experiencesByLocale,
}) => {
  const {locale, t} = useI18n();

  const experiences =
    experiencesByLocale[locale] ?? experiencesByLocale.en ?? [];

  if (experiences.length === 0) {
    return (
      <div className="text-zinc-500 mt-10">
        No experience found for this language.
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-4xl relative">
        {/* Timeline line */}
        <div
          className="absolute left-5 md:left-6 top-0 bottom-0 w-px bg-zinc-300 dark:bg-zinc-800"
          aria-hidden="true"
        />

        <div className="space-y-10">
          {experiences.map((exp) => (
            <div key={exp.slug} className="relative pl-12 md:pl-16">
              {/* Timeline dot */}
              <span
                className={`absolute left-5 md:left-6 -translate-x-1/2 top-8 w-3.5 h-3.5 rounded-full border-2 ${
                  exp.current
                    ? "bg-orange-500 border-orange-500"
                    : "bg-white dark:bg-zinc-900 border-zinc-400 dark:border-zinc-600"
                }`}
                aria-hidden="true"
              />

              <Card>
                <Link href={`/experience/${exp.slug}`} className="block">
                  <article className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                    {/* Left: logo, company, period, location */}
                    <div className="md:w-56 shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-1.5">
                          <Image
                            src={exp.logo}
                            alt={exp.company}
                            width={44}
                            height={44}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white leading-snug">
                          {exp.company}
                        </h3>
                      </div>

                      <div className="mt-4 space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>
                            {exp.startDate} —{" "}
                            {exp.current
                              ? t("experience_page", "present")
                              : exp.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: role, current badge, description, tags */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                          {exp.role}
                        </h4>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-500/15">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            {t("experience_page", "current")}
                          </span>
                        )}
                        <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>

                      <div
                        className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed [&_strong]:text-zinc-900 dark:[&_strong]:text-white"
                        dangerouslySetInnerHTML={{
                          __html: simpleMarkdownToHtml(exp.summary),
                        }}
                      />

                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
