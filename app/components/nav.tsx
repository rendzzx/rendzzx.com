"use client";
import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
// Import hook i18n
import {useI18n} from "../providers/i18n-provider";
// Hapus import { ModalMenu }
// Hapus import { ArrowLeft } jika tidak digunakan

// Definisikan struktur link yang dibutuhkan. Kita akan menggunakan ID sebagai kunci terjemahan.
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

  // Gunakan useI18n hook
  const {locale, setLocale, t} = useI18n();
  // Hapus state isModalOpen

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
  };

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500  border-zinc-800 "
        }`}
      >
        {/* Gunakan justify-between untuk menempatkan elemen di kedua ujung */}
        <div className="container flex items-center justify-between p-6 mx-auto">
          {/* LOGO DI KIRI */}
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <span className="font-display text-lg">Rendzzx</span>
          </Link>

          {/* CONTAINER NAVIGASI DAN TOMBOL BAHASA DI KANAN */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Tautan Navigasi Utama */}
            <nav className="flex gap-4">
              {links.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-sm duration-200 text-zinc-400 hover:text-zinc-100"
                >
                  {/* MENGGUNAKAN TRANSLASI */}
                  {t("navigation", item.id)}
                </Link>
              ))}
            </nav>

            {/* Tombol Ganti Bahasa di Paling Kanan */}
            <button
              onClick={toggleLocale}
              className="text-sm font-medium duration-200 text-zinc-400 hover:text-zinc-100 border border-zinc-700 rounded-full px-3 py-1"
              title="Ganti Bahasa"
            >
              {locale === "id" ? "ID" : "EN"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
// Hapus eksport const ModalMenu
