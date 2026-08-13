"use client";

import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import {Navigation} from "./components/nav";
import {useI18n} from "./providers/i18n-provider";
import {siteConfig} from "@/util/site-config";

export default function Home() {
  const {t} = useI18n();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-black dark:via-zinc-600/20 dark:to-black">
      <Navigation />

      <div className="hidden w-full h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-400/0 via-zinc-400/50 to-zinc-400/0 dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0" />
      <Particles
        className="absolute inset-0 z-0 animate-fade-in"
        quantity={200}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-7xl text-transparent duration-1000 bg-zinc-900 dark:bg-white cursor-default text-edge-outline animate-title font-display md:text-9xl whitespace-nowrap bg-clip-text opacity-0">
        {siteConfig.handle}
      </h1>

      <div className="hidden w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-400/0 via-zinc-400/50 to-zinc-400/0 dark:from-zinc-300/0 dark:via-zinc-300/50 dark:to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in px-6 max-w-lg mx-auto relative z-10">
        <h2 className="text-sm text-zinc-600 dark:text-zinc-500">
          <Link
            href="/about"
            className="duration-500 hover:text-zinc-900 dark:hover:text-zinc-300"
          >
            {t("home_page", "subtitle")}
          </Link>
        </h2>
      </div>
    </div>
  );
}
