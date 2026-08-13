"use client";

import {useState} from "react";
import {
  Code,
  Server,
  Layers,
  Database,
  PencilLine,
  Terminal,
  Users,
  Award,
  CalendarCheck,
  Eye,
  Search,
  X,
} from "lucide-react";
import {Card} from "../components/card";
import {useI18n} from "../providers/i18n-provider";
import {simpleMarkdownToHtml} from "@/util/markdown-parser";
import {siteConfig} from "@/util/site-config";
import type {Certification} from "@/util/certification";

interface SkillsClientWrapperProps {
  certificationsByLocale: Record<string, Certification[]>;
}

export const SkillsClientWrapper: React.FC<SkillsClientWrapperProps> = ({
  certificationsByLocale,
}) => {
  const {locale, t} = useI18n();

  const certifications =
    certificationsByLocale[locale] ?? certificationsByLocale.en ?? [];

  const [certFilter, setCertFilter] = useState<
    "all" | "competency" | "attendance" | "expired"
  >("all");
  const [certSearch, setCertSearch] = useState("");
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  const filteredCertifications = certifications.filter((cert) => {
    if (certFilter === "competency" && cert.type !== "competency") return false;
    if (certFilter === "attendance" && cert.type !== "attendance") return false;
    if (certFilter === "expired" && !cert.expired) return false;

    const query = certSearch.trim().toLowerCase();
    if (query) {
      const haystack = `${cert.title} ${cert.issuer} ${cert.summary} ${cert.details.join(
        " "
      )}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });

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
    <>
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
                  {skill.details.map((detail) => (
                    <span
                      key={detail}
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

      {siteConfig.showCertifications && certifications.length > 0 && (
        <div className="w-full max-w-5xl mt-16">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 mb-6 text-center">
            {t("skills_page", "certifications")}
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              {(["all", "competency", "attendance", "expired"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setCertFilter(filter)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                      certFilter === filter
                        ? "bg-orange-600 border-orange-500 text-white"
                        : "border-zinc-300 text-zinc-600 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {t("skills_page", `cert_${filter}`)}
                  </button>
                )
              )}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                placeholder={t("skills_page", "cert_search_placeholder")}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30"
              />
            </div>
          </div>

          {filteredCertifications.length === 0 ? (
            <div className="text-zinc-500 text-center">
              {t("skills_page", "cert_no_results")}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCertifications.map((cert) => (
                <Card key={cert.slug}>
                  <article className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-4">
                        <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                          {cert.type === "competency" ? (
                            <Award className="w-5 h-5" />
                          ) : (
                            <CalendarCheck className="w-5 h-5" />
                          )}
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                            {cert.title}
                          </h3>
                          <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {cert.date}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
                      <span
                        className={`px-2.5 py-1 rounded-full font-medium ${
                          cert.type === "competency"
                            ? "text-orange-700 bg-orange-500/10 dark:text-orange-300 dark:bg-orange-500/15"
                            : "text-sky-700 bg-sky-500/10 dark:text-sky-300 dark:bg-sky-500/15"
                        }`}
                      >
                        {cert.type === "competency"
                          ? t("skills_page", "cert_competency")
                          : t("skills_page", "cert_attendance")}
                      </span>

                      {cert.expired && (
                        <span className="px-2.5 py-1 rounded-full font-medium text-red-700 bg-red-500/10 dark:text-red-300 dark:bg-red-500/15">
                          {t("skills_page", "cert_expired")}
                          {cert.validUntil ? ` · ${cert.validUntil}` : ""}
                        </span>
                      )}

                      {cert.score && (
                        <span className="px-2.5 py-1 rounded-full font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/60">
                          {cert.score}
                        </span>
                      )}

                      {cert.validUntil && !cert.expired && (
                        <span className="px-2.5 py-1 rounded-full font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/60">
                          {t("skills_page", "cert_valid_until")}:{" "}
                          {cert.validUntil}
                        </span>
                      )}
                    </div>

                    {cert.summary && (
                      <div
                        className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: simpleMarkdownToHtml(cert.summary),
                        }}
                      />
                    )}

                    {cert.details.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {cert.details.map((detail) => (
                          <span
                            key={detail}
                            className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700/60"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    )}

                    {cert.hasCredential && (
                      <button
                        onClick={() => setActiveCert(cert)}
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        {t("skills_page", "view_certificate")}
                      </button>
                    )}
                  </article>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeCert && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm sm:p-4"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full h-full sm:h-[85vh] sm:max-w-4xl bg-white dark:bg-zinc-900 sm:rounded-xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {activeCert.title}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                  {activeCert.issuer}
                </p>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                aria-label="Close"
                className="shrink-0 p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 bg-zinc-100 dark:bg-zinc-950">
              {activeCert.credentialType === "image" ? (
                <img
                  src={`/api/certificates/${activeCert.slug}`}
                  alt={activeCert.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={`/api/certificates/${activeCert.slug}`}
                  title={activeCert.title}
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
