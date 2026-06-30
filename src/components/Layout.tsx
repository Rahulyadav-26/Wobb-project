import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useListStore } from "@/store/useListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

export function Layout({ children, title }: LayoutProps) {
  const { savedProfiles } = useListStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (title) {
      document.title = `${title} | Wobb`;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 4);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [title]);

  const count = savedProfiles.length;

  return (
    <div className="min-h-screen bg-surface-base">
      <header
        className={`sticky top-0 z-50 border-b border-ink-100/60 bg-white/75 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/60 transition-shadow duration-200 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold text-ink-900 tracking-tight hover:opacity-80 transition-opacity"
          >
            Wobb
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {/* nav items can go here in the future */}
          </nav>

          <Link
            to="/list"
            className="group flex items-center gap-2 rounded-full border border-ink-100 bg-white px-3.5 py-2 text-small font-medium text-ink-700 shadow-xs transition-all duration-200 ease-snap hover:border-brand-200 hover:shadow-sm"
          >
            <HeartIcon className="h-4 w-4 text-brand-500" />
            My List
            {count > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {children}
      </main>
    </div>
  );
}
