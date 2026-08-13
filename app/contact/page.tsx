"use client";
import {Github, Mail, Linkedin, ArrowRight} from "lucide-react";
import Link from "next/link";
import {Navigation} from "../components/nav";
import {Card} from "../components/card";
import {useI18n} from "../providers/i18n-provider";
import {siteConfig} from "@/util/site-config";

export default function ContactPage() {
  const {t} = useI18n();

  const socials = [
    {
      icon: <Mail size={18} />,
      href: `mailto:${siteConfig.email}`,
      label: t("contact_page", "email"),
      handle: siteConfig.email,
    },
    {
      icon: <Github size={18} />,
      href: siteConfig.socials.github,
      label: t("contact_page", "github"),
      handle: siteConfig.handle,
    },
    {
      icon: <Linkedin size={18} />,
      href: siteConfig.socials.linkedin,
      label: t("contact_page", "linkedin"),
      handle: siteConfig.handle,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center min-h-screen mx-auto px-4 pt-24 pb-24">
        <p className="text-center text-zinc-600 dark:text-zinc-400 max-w-xl mb-8">
          {t("contact_page", "subtitle")}
        </p>

        <div className="w-full max-w-md space-y-3">
          {socials.map((s) => (
            <Card key={s.href}>
              <Link
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-4 p-4 group"
              >
                <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 group-hover:text-orange-500 group-hover:border-orange-500/60 transition-colors">
                  {s.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </span>
                  <span className="block truncate text-zinc-900 dark:text-zinc-200 font-medium">
                    {s.handle}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-1 group-hover:text-orange-500 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>

        <Link
          href="/cv_rendy.pdf"
          download
          className="mt-8 inline-block px-8 py-3 text-sm font-medium text-white rounded-full bg-orange-600 hover:bg-orange-500 transition-colors duration-300"
        >
          {t("about_page", "download_cv")}
        </Link>
      </div>
    </div>
  );
}
