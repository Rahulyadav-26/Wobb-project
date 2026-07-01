import { useState, useMemo, useEffect, useDeferredValue, useCallback, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

const MarketerPainPoints = lazy(() => import("@/components/MarketerPainPoints").then(module => ({ default: module.MarketerPainPoints })));

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const searchQuery = searchParams.get("q") || "";
  const deferredSearchQuery = useDeferredValue(searchQuery);
  
  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, deferredSearchQuery), [allProfiles, deferredSearchQuery]);
  const [displayCount, setDisplayCount] = useState(filtered.length);
  
  useEffect(() => {
    setDisplayCount(filtered.length);
  }, [filtered.length]);

  const handleProfileClick = useCallback(() => {}, []);

  return (
    <Layout>
      <header className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold sm:text-h1 text-ink-900">Find your next creator</h1>
        <p className="mt-1.5 text-body text-ink-500 transition-all duration-300">
          <span className="tabular-nums font-medium text-ink-700">{displayCount.toLocaleString()}</span> creators match your filters
        </p>
      </header>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setSearchParams((prev) => {
            prev.set("platform", p);
            prev.delete("q");
            return prev;
          }, { replace: true });
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchParams((prev) => {
            if (q) prev.set("q", q);
            else prev.delete("q");
            return prev;
          }, { replace: true });
        }}
      />

      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={handleProfileClick}
      />

      <div className="mt-32 pt-16 border-t border-ink-100">
        <Suspense fallback={<div className="h-96 animate-pulse bg-surface-card rounded-3xl" />}>
          <MarketerPainPoints />
        </Suspense>
      </div>
    </Layout>
  );
}
