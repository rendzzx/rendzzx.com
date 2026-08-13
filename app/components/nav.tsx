"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {useI18n} from "../providers/i18n-provider";
import {useTheme} from "../providers/theme-provider";
import {
  Menu,
  X,
  Moon,
  Sun,
  Briefcase,
  FolderKanban,
  Sparkles,
  Mail,
  User,
} from "lucide-react";
import {siteConfig} from "@/util/site-config";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {locale, setLocale, t} = useI18n();
  const {theme, toggleTheme} = useTheme();
  const pathname = usePathname();

  const titleByPath = [
    {path: "/about", title: t("about_page", "header")},
    {path: "/experience", title: t("experience_page", "header")},
    {path: "/skills", title: t("skills_page", "header")},
    {path: "/projects", title: t("navigation", "projects")},
    {path: "/contact", title: t("contact_page", "header")},
  ];

  const currentTitle =
    titleByPath.find(
      ({path}) => pathname === path || pathname.startsWith(path + "/")
    )?.title ?? "";

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
    setIsMobileMenuOpen(false);
  };

  const navIcons: Record<string, React.ReactNode> = {
    experience: <Briefcase className="w-5 h-5" />,
    projects: <FolderKanban className="w-5 h-5" />,
    skills: <Sparkles className="w-5 h-5" />,
    contact: <Mail className="w-5 h-5" />,
    about: <User className="w-5 h-5" />,
  };

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/40 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 "
        }`}
      >
        <div className="container relative flex items-center justify-between p-6 mx-auto">
          {/* LOGO DI KIRI */}
          <Link
            href="/"
            className="duration-200 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            <span className="font-display text-lg">{siteConfig.brand}</span>
          </Link>

          {currentTitle && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
              <span className="text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 whitespace-nowrap">
                {currentTitle}
              </span>
            </div>
          )}

          {/* === 1. DESKTOP/MD+ VIEW (Horizontal Menu) === */}
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            <nav className="flex gap-4">
              {siteConfig.nav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`text-sm duration-200 ${
                      isActive
                        ? "text-orange-500 dark:text-orange-400"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {t("navigation", item.id)}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTheme()}
                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium duration-200 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-full"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={toggleLocale}
                className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium duration-200 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-full"
                title="Ganti Bahasa"
              >
                {locale === "id" ? "ID" : "EN"}
              </button>
            </div>
          </div>

          {/* === 2. MOBILE/SM VIEW (Hamburger Button) === */}
          <button
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* === 3. MOBILE DROPDOWN MENU === */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:hidden transition-all duration-300 ease-in-out"
          style={{height: "calc(100vh - 4rem)"}}
        >
          <nav className="flex flex-col p-4 space-y-3">
            {siteConfig.nav.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-base py-2 duration-200 border-b border-zinc-200 dark:border-zinc-800 ${
                    isActive
                      ? "text-orange-500 dark:text-orange-400"
                      : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navigation", item.id)}
                </Link>
              );
            })}

            <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <button
                onClick={() => toggleTheme()}
                className="w-full inline-flex items-center justify-center gap-2 h-11 text-sm font-medium duration-200 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-full"
              >
                {theme === "dark" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
                {locale === "id" ? "Tema" : "Theme"}
              </button>

              <button
                onClick={toggleLocale}
                className="w-full inline-flex items-center justify-center h-11 text-sm font-medium duration-200 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-300 dark:border-zinc-700 rounded-full"
              >
                {locale === "id" ? "Bahasa Indonesia" : "English"}
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* === 4. MOBILE BOTTOM NAVIGATION === */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-t border-zinc-200 dark:border-zinc-800">
        <div className="grid grid-cols-5">
          {siteConfig.nav.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-orange-500 dark:text-orange-400"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {navIcons[item.id]}
                <span>{t("navigation", item.id)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
