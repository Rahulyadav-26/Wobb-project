import { useRef } from "react";
import { useThemeStore } from "@/store/useThemeStore";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!iconRef.current) return;
      gsap.fromTo(
        iconRef.current,
        { rotation: theme === "dark" ? -90 : 90, scale: 0.5, opacity: 0 },
        {
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
        }
      );
    },
    { dependencies: [theme] }
  );

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-100 bg-surface-card text-ink-700 shadow-xs transition-all duration-200 hover:border-ink-200 hover:text-ink-900 active:scale-95"
      aria-label="Toggle Dark Mode"
    >
      <div ref={iconRef}>
        {theme === "light" ? (
          // Moon icon for Light Mode (click to go dark)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        ) : (
          // Sun icon for Dark Mode (click to go light)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 text-brand-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
