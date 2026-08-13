// app/experience/page.tsx
import {Navigation} from "@/app/components/nav";
import {getSortedExperienceData} from "@/util/experience";
import {getSortedEducationData} from "@/util/education";
import {ExperienceClientWrapper} from "./experience-client-wrapper";

export default function ExperiencePage() {
  const experiencesByLocale = {
    en: getSortedExperienceData("en"),
    id: getSortedExperienceData("id"),
  };
  const educationsByLocale = {
    en: getSortedEducationData("en"),
    id: getSortedEducationData("id"),
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />

      <div className="container flex flex-col items-center justify-start pt-24 pb-20 mx-auto px-4">
        <ExperienceClientWrapper
          experiencesByLocale={experiencesByLocale}
          educationsByLocale={educationsByLocale}
        />
      </div>
    </div>
  );
}
