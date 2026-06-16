"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="grid h-9 w-9 place-items-center rounded-full text-body/80 transition-colors hover:bg-body/10 hover:text-body focus:outline-none focus-visible:focus-ring"
    >
      {/* Render both, hide based on theme to avoid hydration flash */}
      <Sun
        size={18}
        className={isDark === false ? "block" : "hidden"}
        aria-hidden
      />
      <Moon
        size={18}
        className={isDark === false ? "hidden" : "block"}
        aria-hidden
      />
    </button>
  );
}
