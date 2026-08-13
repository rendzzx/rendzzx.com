"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    // dark -> light : circle dari kanan-atas ke kiri-bawah
    // light -> dark : circle dari kiri-bawah ke kanan-atas
    const fromTopRight = next === "light";
    const initial = fromTopRight
      ? "circle(0px at 100% 0%)"
      : "circle(0px at 0% 100%)";
    const final = fromTopRight
      ? "circle(150% at 100% 0%)"
      : "circle(150% at 0% 100%)";

    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
      localStorage.setItem("theme", next);
    };

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => {ready: Promise<void>};
    };

    if (typeof doc.startViewTransition !== "function") {
      apply();
      return;
    }

    const transition = doc.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        {clipPath: [initial, final]},
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
