"use client";

import {useEffect, useRef} from "react";
import {usePathname} from "next/navigation";

export const ScrollProgress: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const container = containerRef.current;
      const thumb = thumbRef.current;
      if (!container || !thumb) return;

      const scrollable = doc.scrollHeight - window.innerHeight;
      const trackHeight = container.clientHeight;

      if (scrollable <= 0) {
        thumb.style.opacity = "1";
        thumb.style.height = "100%";
        thumb.style.transform = "translateY(0)";
        return;
      }

      thumb.style.opacity = "1";
      const thumbRatio = Math.max(window.innerHeight / doc.scrollHeight, 0.08);
      const progress = window.scrollY / scrollable;
      const thumbHeight = thumbRatio * trackHeight;
      const thumbTop = progress * (trackHeight - thumbHeight);

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    update();
    const rafId = requestAnimationFrame(update);

    window.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className="fixed right-0 top-20 bottom-16 md:bottom-0 z-[55] w-[8px] pointer-events-none"
    >
      <div className="absolute inset-y-0 right-0 w-[4px] rounded-full bg-zinc-200/70 dark:bg-zinc-800/70" />
      <div
        ref={thumbRef}
        className="absolute top-0 right-0 w-[4px] rounded-full bg-gradient-to-b from-orange-500 to-amber-400"
      />
    </div>
  );
};
