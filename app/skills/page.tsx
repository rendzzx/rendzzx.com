// app/skills/page.tsx
"use client";
import {
  Code,
  Server,
  Layers,
  Database,
  PencilLine,
  Terminal,
  Users,
} from "lucide-react";
import {Navigation} from "../components/nav";
import {Card} from "../components/card";
import {useI18n} from "../providers/i18n-provider";

export default function SkillsPage() {
  const {t} = useI18n();

  const skills = [
    {
      icon: <Server size={22} />,
      title: t("skills_page", "title_backend_dev"),
      details: [
        t("skills_page", "details_php_js"),
        t("skills_page", "details_rest_api"),
        t("skills_page", "details_auth"),
        t("skills_page", "details_swagger"),
      ],
      span: "md:col-span-2",
    },
    {
      icon: <Code size={22} />,
      title: t("skills_page", "title_frameworks"),
      details: [
        t("skills_page", "details_laravel"),
        t("skills_page", "details_nextjs"),
        t("skills_page", "details_learning"),
      ],
      span: "md:col-span-1",
    },
    {
      icon: <Layers size={22} />,
      title: t("skills_page", "title_frontend_mobile"),
      details: [
        t("skills_page", "details_react"),
        t("skills_page", "details_zustand"),
      ],
      span: "md:col-span-1",
    },
    {
      icon: <Database size={22} />,
      title: t("skills_page", "title_database"),
      details: [t("skills_page", "details_sql"), t("skills_page", "details_query")],
      span: "md:col-span-1",
    },
    {
      icon: <Terminal size={22} />,
      title: t("skills_page", "title_devops"),
      details: [
        t("skills_page", "details_git"),
        t("skills_page", "details_docker"),
        t("skills_page", "details_linux"),
        t("skills_page", "details_api_tools"),
      ],
      span: "md:col-span-1",
    },
    {
      icon: <PencilLine size={22} />,
      title: t("skills_page", "title_styling_ui"),
      details: [t("skills_page", "details_tailwind")],
      span: "md:col-span-1",
    },
    {
      icon: <Users size={22} />,
      title: t("skills_page", "title_soft_skills"),
      details: [
        t("skills_page", "details_soft_skills"),
        t("skills_page", "details_scrum"),
      ],
      span: "md:col-span-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center pt-24 pb-20 mx-auto px-4">
        <p className="text-zinc-600 dark:text-zinc-400 mb-14 text-center max-w-md">
          {t("skills_page", "subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {skills.map((skill) => (
            <div key={skill.title} className={skill.span}>
              <Card>
                <div className="p-6 h-full flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                      {skill.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {skill.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.details.map((detail, detailIndex) => (
                      <span
                        key={detailIndex}
                        className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/60"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
