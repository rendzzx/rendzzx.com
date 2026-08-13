import {Navigation} from "@/app/components/nav";
import {getSortedExperienceData} from "@/util/experience";
import {ExperienceDetailClientWrapper} from "./experience-detail-client-wrapper";
import type {Metadata} from "next";

export function generateStaticParams() {
  const en = getSortedExperienceData("en");
  const id = getSortedExperienceData("id");
  const slugs = Array.from(
    new Set([...en.map((e) => e.slug), ...id.map((e) => e.slug)])
  );
  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const all = [
    ...getSortedExperienceData("en"),
    ...getSortedExperienceData("id"),
  ];
  const experience = all.find((e) => e.slug === slug);
  return {
    title: experience
      ? `${experience.role} @ ${experience.company}`
      : "Experience",
    description: experience ? experience.company : "Experience details",
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const experiencesByLocale = {
    en: getSortedExperienceData("en"),
    id: getSortedExperienceData("id"),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />

      <ExperienceDetailClientWrapper
        slug={slug}
        experiencesByLocale={experiencesByLocale}
      />
    </div>
  );
}
