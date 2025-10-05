// app/skills/page.tsx
"use client";
import {
  Code,
  Server,
  Layers,
  Database,
  PencilLine,
  Github,
  CheckCircle,
  Wrench,
} from "lucide-react";
import {Navigation} from "../components/nav";
import {Card} from "../components/card";
import {useI18n} from "../providers/i18n-provider";

const skills = [
  // BACKEND & LANGUAGES
  {
    icon: <Server size={20} />,
    title: "Backend Development",
    details: [
      "PHP, JavaScript (Node.js)",
      "RESTful API Design",
      "Authentication (JWT)",
    ],
    category: "Backend & Languages",
  },
  {
    icon: <Code size={20} />,
    title: "Frameworks & Libraries",
    details: ["Laravel (MVC), CodeIgniter", "ExpressJS", "Learning Golang"],
    category: "Backend & Languages",
  },
  // FRONTEND & MOBILE
  {
    icon: <Layers size={20} />,
    title: "Frontend & Mobile",
    details: ["ReactJS", "React Native (Mobile)", "Responsive Design"],
    category: "Frontend & Mobile",
  },
  {
    icon: <PencilLine size={20} />,
    title: "Styling & UI",
    details: ["Tailwind CSS", "Bootstrap", "Custom CSS"],
    category: "Frontend & Mobile",
  },
  // DATABASE & TOOLS
  {
    icon: <Database size={20} />,
    title: "Database Management",
    details: ["MySQL", "MS SQL Server", "Query Optimization"],
    category: "Database & Tools",
  },
  {
    icon: <Github size={20} />,
    title: "Development Tools",
    details: [
      "Git / GitHub / GitLab",
      "Postman (API Testing)",
      "Sprint Methodology",
    ],
    category: "Database & Tools",
  },
  // SOFT SKILLS (Menggunakan ikon Wrench sebagai lambang alat non-teknis)
  {
    icon: <Wrench size={20} />,
    title: "Soft Skills",
    details: ["Problem-solving", "Collaboration", "Time Management"],
    category: "Soft Skills",
  },
];

// Map untuk mengelompokkan skills berdasarkan kategori
const groupedSkills = skills.reduce((acc, skill) => {
  (acc[skill.category] = acc[skill.category] || []).push(skill);
  return acc;
}, {} as Record<string, typeof skills>);

export default function SkillsPage() {
  const {t} = useI18n();
  const skills = [
    // BACKEND & LANGUAGES
    {
      icon: <Server size={20} />,
      title: t("skills_page", "title_backend_dev"),
      details: [
        t("skills_page", "details_php_js"),
        t("skills_page", "details_api_auth"),
      ],
      category: t("skills_page", "cat_backend_lang"),
    },
    {
      icon: <Code size={20} />,
      title: t("skills_page", "title_frameworks"),
      details: [
        t("skills_page", "details_laravel"),
        t("skills_page", "details_learning"),
      ],
      category: t("skills_page", "cat_backend_lang"),
    },
    // FRONTEND & MOBILE
    {
      icon: <Layers size={20} />,
      title: t("skills_page", "title_frontend_mobile"),
      details: [t("skills_page", "details_react_next")],
      category: t("skills_page", "cat_frontend_mobile"),
    },
    {
      icon: <PencilLine size={20} />,
      title: t("skills_page", "details_styling_ui"),
      details: [t("skills_page", "details_tailwind")],
      category: t("skills_page", "cat_frontend_mobile"),
    },
    // DATABASE & TOOLS
    {
      icon: <Database size={20} />,
      title: t("skills_page", "title_database"),
      details: [t("skills_page", "details_sql")],
      category: t("skills_page", "cat_database_tools"),
    },
    {
      icon: <Github size={20} />,
      title: t("skills_page", "title_dev_tools"),
      details: [t("skills_page", "details_git")],
      category: t("skills_page", "cat_database_tools"),
    },
    // SOFT SKILLS
    {
      icon: <Wrench size={20} />,
      title: t("skills_page", "title_soft_skills"),
      details: [t("skills_page", "details_soft_skills")],
      category: t("skills_page", "cat_soft_skills"),
    },
  ];

  // Map untuk mengelompokkan skills berdasarkan kategori
  const groupedSkills = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);
  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />

      {/* Container Konten Utama */}
      <div className="container flex flex-col items-center justify-center pt-24 pb-20 mx-auto px-4">
        {/* Header Halaman */}
        <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 font-display mb-12 mt-10">
          {t("skills_page", "header")} {/* TERJEMAHAN JUDUL */}
        </h1>

        {/* Grid untuk setiap kategori */}
        {Object.entries(groupedSkills).map(([category, skillList]) => (
          <section key={category} className="w-full mb-16 max-w-5xl">
            <h2 className="text-2xl font-semibold text-zinc-400 mb-6 border-b border-zinc-700/50 pb-2">
              {category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {skillList.map((skill, index) => (
                <Card key={index}>
                  <div className="p-6 h-full flex flex-col justify-start">
                    {/* Icon & Title */}
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-zinc-400">{skill.icon}</span>
                      <h3 className="text-xl font-semibold text-white">
                        {skill.title}
                      </h3>
                    </div>

                    {/* Details List */}
                    <ul className="space-y-2 text-zinc-400 text-sm mt-2">
                      {skill.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
