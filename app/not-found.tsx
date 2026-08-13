"use client";

import Link from "next/link";
import {Navigation} from "./components/nav";
import {useI18n} from "./providers/i18n-provider";

export default function NotFound() {
  const {t} = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 pt-24 pb-24 text-center">
        <h1 className="text-7xl md:text-9xl font-display text-zinc-900 dark:text-white">
          404
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          {t("not_found", "description")}
        </p>
        <Link
          href="/"
          className="mt-8 px-6 py-3 text-sm font-medium text-white border border-zinc-700 rounded-full bg-orange-600 hover:bg-orange-500 transition-colors duration-300"
        >
          {t("not_found", "go_home")}
        </Link>
      </div>
    </div>
  );
}
