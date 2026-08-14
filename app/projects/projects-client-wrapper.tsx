"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowRight, ChevronLeft, ChevronRight, Search} from "lucide-react";
import {Card} from "@/app/components/card";
import {useI18n} from "../providers/i18n-provider";
import type {Project} from "@/util/projects";

interface ProjectsClientWrapperProps {
  projectsByLocale: Record<string, Project[]>;
}

export const ProjectsClientWrapper: React.FC<ProjectsClientWrapperProps> = ({
  projectsByLocale,
}) => {
  const {locale, t} = useI18n();

  const projects = projectsByLocale[locale] ?? projectsByLocale.en ?? [];

  const featured = projects.filter((p) => p.isFeatured);
  const completed = projects.filter((p) => p.status !== "wip");
  const inProgress = projects.filter((p) => p.status === "wip");

  const [activeTab, setActiveTab] = useState<"all" | "completed" | "wip">("all");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFeaturedIndex(0);
  }, [locale]);

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredIndex, featured.length]);

  useEffect(() => {
    const saved = localStorage.getItem("projectsTab");
    if (saved === "all" || saved === "completed" || saved === "wip") {
      setActiveTab(saved);
    }
  }, []);

  const switchTab = (tab: "all" | "completed" | "wip") => {
    setActiveTab(tab);
    localStorage.setItem("projectsTab", tab);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesSearch = (p: Project) => {
    if (!normalizedQuery) return true;
    const contentText = p.contentHtml.replace(/<[^>]*>/g, " ").toLowerCase();
    return (
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      p.stack.toLowerCase().includes(normalizedQuery) ||
      String(p.year).includes(normalizedQuery) ||
      contentText.includes(normalizedQuery)
    );
  };

  const visibleProjects =
    (activeTab === "all"
      ? projects
      : activeTab === "completed"
      ? completed
      : inProgress
    ).filter(matchesSearch);

  if (projects.length === 0) {
    return (
      <div className="text-zinc-500 mt-10">
        No projects found for this language.
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl space-y-12 mb-20">
        {/* === FEATURED CAROUSEL === */}
        {featured.length > 0 && (
          <section className="relative">
            <div className="relative overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featuredIndex}
                  initial={{opacity: 0, x: 60}}
                  animate={{opacity: 1, x: 0}}
                  exit={{opacity: 0, x: -60}}
                  transition={{duration: 0.35, ease: "easeInOut"}}
                >
                  <Card>
                    <Link href={`/projects/${featured[featuredIndex].slug}`}>
                      <article className="p-8 md:p-12 min-h-[300px] md:min-h-[340px] flex flex-col justify-between">
                        <span className="text-xs uppercase tracking-wider text-orange-500">
                          {t("projects_page", "featured")}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display text-zinc-900 dark:text-white mt-3 mb-4 leading-tight line-clamp-2 min-h-[2.5em]">
                          {featured[featuredIndex].title}
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4 max-w-2xl line-clamp-2 min-h-[3em]">
                          {featured[featuredIndex].description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                          <span>{featured[featuredIndex].year}</span>
                          <span className="text-zinc-700">|</span>
                          <span>{featured[featuredIndex].stack}</span>
                        </div>
                        <span className="text-orange-500 flex items-center gap-2 mt-6">
                          {t("projects_page", "view_details")}{" "}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </article>
                    </Link>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {featured.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setFeaturedIndex(
                      (i) => (i - 1 + featured.length) % featured.length
                    )
                  }
                  aria-label="Previous"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-zinc-900/70 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setFeaturedIndex((i) => (i + 1) % featured.length)
                  }
                  aria-label="Next"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-zinc-900/70 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="flex justify-center gap-2 mt-4">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeaturedIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        i === featuredIndex
                          ? "w-6 bg-orange-500"
                          : "w-2 bg-zinc-700 hover:bg-zinc-500"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* === TABS + SEARCH === */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => switchTab("all")}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-colors ${
                activeTab === "all"
                  ? "bg-orange-600 border-orange-500 text-white"
                  : "border-zinc-300 text-zinc-600 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t("projects_page", "all")}
            </button>
            <button
              onClick={() => switchTab("completed")}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-colors ${
                activeTab === "completed"
                  ? "bg-orange-600 border-orange-500 text-white"
                  : "border-zinc-300 text-zinc-600 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t("projects_page", "completed")}
            </button>
            <button
              onClick={() => switchTab("wip")}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-colors ${
                activeTab === "wip"
                  ? "bg-orange-600 border-orange-500 text-white"
                  : "border-zinc-300 text-zinc-600 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {t("projects_page", "in_progress")}
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("projects_page", "search_placeholder")}
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30"
            />
          </div>
        </div>

        {/* === GRID === */}
        {visibleProjects.length === 0 ? (
          <div className="text-zinc-500 text-center">
            {searchQuery.trim()
              ? t("projects_page", "no_search_results")
              : t("projects_page", "no_projects")}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {visibleProjects.map((project) => (
              <div key={project.slug} className="mb-6 break-inside-avoid">
                <Card>
                  <Link href={`/projects/${project.slug}`} className="block">
                    <article className="p-6">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                          {project.title}
                        </h3>
                        {activeTab === "all" && (
                          <span
                            className={`inline-flex items-center gap-1.5 shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                              project.status === "wip"
                                ? "text-amber-700 bg-amber-500/10 dark:text-amber-300 dark:bg-amber-500/15"
                                : "text-emerald-700 bg-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-500/15"
                            }`}
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              {project.status === "wip" && (
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                              )}
                              <span
                                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                                  project.status === "wip"
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                                }`}
                              />
                            </span>
                            {project.status === "wip"
                              ? t("projects_page", "in_progress")
                              : t("projects_page", "completed")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800 gap-4">
                        <span>{project.year}</span>
                        <span className="text-orange-500 text-right">
                          {project.stack}
                        </span>
                      </div>
                    </article>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
