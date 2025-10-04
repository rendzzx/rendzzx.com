"use client";

import Link from "next/link";
import React, {useState} from "react";
import {X} from "lucide-react";

// Definisikan daftar navigasi di sini
const navigationItems = [
  {name: "Experience", href: "/#experience"},
  {name: "Skills", href: "/#skills"},
  {name: "Projects", href: "/#projects"},
  {name: "Contact", href: "/#contact"},
];

interface ModalMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalMenu: React.FC<ModalMenuProps> = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  return (
    // Modal Full-Screen
    <div className="fixed inset-0 z-[60] bg-black backdrop-blur-sm overflow-y-auto">
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        {/* Tombol Close di Pojok Kanan Atas */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 duration-200 text-zinc-400 hover:text-zinc-100 p-4"
          aria-label="Close navigation menu"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Daftar Navigasi yang Bisa Di-scroll */}
        <ul className="flex flex-col items-center justify-center gap-10 py-20">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose} // Tutup modal setelah mengklik link
                className="text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-200 hover:from-zinc-300 hover:to-zinc-100 transition-colors duration-300 whitespace-nowrap"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
