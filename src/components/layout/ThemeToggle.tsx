"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const isExhibitionRoute =
    pathname === "/" || pathname.startsWith("/exhibition/");

  useEffect(() => {
    if (!isExhibitionRoute) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      return;
    }

    const stored = localStorage.getItem("exhibition-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored ? stored === "dark" : prefersDark;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [isExhibitionRoute]);

  const toggle = () => {
    if (!isExhibitionRoute) return;

    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("exhibition-theme", next ? "dark" : "light");
  };

  if (!isExhibitionRoute) {
    return null;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 transition-colors hover:border-violet-accent/50 dark:border-warm-white/10"
      data-cursor-hover
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5 }}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
