"use client";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
// Import hook i18n
import {useI18n} from "../providers/i18n-provider";
// Import ikon Menu dan X untuk hamburger menu
import {Menu, X} from "lucide-react";

// Definisikan struktur link yang dibutuhkan. ID digunakan sebagai kunci terjemahan di locale.
const links = [
  {id: "experience", href: "/experience"},
  {id: "projects", href: "/projects"},
  {id: "skills", href: "/skills"},
  {id: "contact", href: "/contact"},
  {id: "about", href: "/about"},
];

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  // State untuk mengontrol visibilitas menu di perangkat mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gunakan useI18n hook
  const {locale, setLocale, t} = useI18n();

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Fungsi untuk mengganti bahasa
  const toggleLocale = () => {
    setLocale(locale === "id" ? "en" : "id");
    // Tutup menu mobile setelah ganti bahasa (opsional)
    setIsMobileMenuOpen(false);
  };

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800 "
        }`}
      >
        <div className="container flex items-center justify-between p-6 mx-auto">
          {/* LOGO DI KIRI (Selalu Terlihat) */}
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <span className="font-display text-lg">Rendzzx</span>
          </Link>

          {/* === 1. DESKTOP/MD+ VIEW (Horizontal Menu) === */}
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            {/* Tautan Navigasi Utama (Desktop) */}
            <nav className="flex gap-4">
              {links.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm duration-200 text-zinc-400 hover:text-zinc-100"
                >
                  {t("navigation", item.id)}
                </Link>
              ))}
            </nav>

            {/* Tombol Ganti Bahasa (Desktop) */}
            <button
              onClick={toggleLocale}
              className="text-sm font-medium duration-200 text-zinc-400 hover:text-zinc-100 border border-zinc-700 rounded-full px-3 py-1"
              title="Ganti Bahasa"
            >
              {locale === "id" ? "ID" : "EN"}
            </button>
          </div>

          {/* === 2. MOBILE/SM VIEW (Hamburger Button) === */}
          <button
            className="md:hidden p-2 text-zinc-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {/* Ganti ikon berdasarkan state */}
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* === 3. MOBILE DROPDOWN MENU (Hanya tampil saat isMobileMenuOpen TRUE) === */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 z-40 bg-zinc-900 border-b border-zinc-800 md:hidden transition-all duration-300 ease-in-out"
          // Pastikan menu ini menempati sisa layar jika kontennya panjang
          style={{height: "calc(100vh - 4rem)"}}
        >
          <nav className="flex flex-col p-4 space-y-3">
            {links.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-base py-2 duration-200 text-zinc-300 hover:text-zinc-100 border-b border-zinc-800"
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu setelah klik
              >
                {t("navigation", item.id)}
              </Link>
            ))}

            {/* Tombol Ganti Bahasa (Mobile - di dalam dropdown) */}
            <button
              onClick={toggleLocale}
              className="mt-3 text-base font-medium duration-200 text-zinc-400 hover:text-zinc-100 text-left"
            >
              {locale === "id" ? "Bahasa: Indonesia" : "Language: English"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
