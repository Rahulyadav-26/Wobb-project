import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function SearchIcon({ className }: { className?: string }) {
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
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8 space-y-6">
      <div className="flex justify-center">
        <div
          role="tablist"
          className="inline-flex items-center gap-0.5 rounded-full bg-ink-100 p-1"
        >
          {PLATFORMS.map((p) => {
            const isActive = selected === p;
            return (
              <button
                key={p}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(p)}
                className={`relative rounded-full px-5 py-2 text-small font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-brand-500 shadow-sm animate-fade-up" />
                )}
                <span className="relative z-10">{getPlatformLabel(p)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-xl group relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500 transition-colors group-focus-within:text-brand-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search creators by name, handle, or category..."
          className="w-full rounded-2xl border border-ink-100 bg-white py-3.5 pl-12 pr-4 text-body text-ink-900 placeholder:text-ink-500 shadow-xs transition-all duration-200 ease-snap focus:border-brand-300 focus:shadow-glow focus:outline-none"
        />
      </div>
    </div>
  );
}
