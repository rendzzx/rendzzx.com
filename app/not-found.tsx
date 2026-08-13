import Link from "next/link";
import {Navigation} from "./components/nav";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-zinc-400 via-white to-zinc-400 dark:from-zinc-900/0 dark:via-zinc-900 dark:to-zinc-900/0">
      <Navigation />
      <div className="container flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-7xl md:text-9xl font-display text-zinc-900 dark:text-white">
          404
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">Page not found</p>
        <Link
          href="/"
          className="mt-8 px-6 py-3 text-sm font-medium text-white border border-zinc-700 rounded-full bg-orange-600 hover:bg-orange-500 transition-colors duration-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
