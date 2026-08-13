"use client";

import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, Calendar, MapPin} from "lucide-react";
import {Card} from "@/app/components/card";
import {useI18n} from "../../providers/i18n-provider";
import type {Experience} from "@/util/experience";

interface ExperienceDetailClientWrapperProps {
  slug: string;
  experiencesByLocale: Record<string, Experience[]>;
}

export const ExperienceDetailClientWrapper: React.FC<
  ExperienceDetailClientWrapperProps
> = ({slug, experiencesByLocale}) => {
  const {locale, t} = useI18n();

  const experiences =
    experiencesByLocale[locale] ?? experiencesByLocale.en ?? [];
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl text-zinc-900 dark:text-white">
        Experience not found in this language.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
      <Link
        href="/experience"
        className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> {t("experience_page", "back")}
      </Link>

      <Card>
        <article className="p-6 md:p-10">
          {/* Header: logo + role + company + dates */}
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-2">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={60}
                height={60}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-display text-zinc-900 dark:text-white">
                  {experience.role}
                </h1>
                {experience.current && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-500/15">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    {t("experience_page", "current")}
                  </span>
                )}
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 mt-1 font-medium">
                {experience.company}
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {experience.startDate} —{" "}
                  {experience.current
                    ? t("experience_page", "present")
                    : experience.endDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {experience.location}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div
            className="mt-8 text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4 [&_strong]:text-zinc-900 dark:[&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2"
            dangerouslySetInnerHTML={{__html: experience.contentHtml}}
          />

          {/* Technologies */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              {t("experience_page", "technologies")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
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
      </Card>
    </div>
  );
};
