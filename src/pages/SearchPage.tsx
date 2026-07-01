import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { MarketerPainPoints } from "@/components/MarketerPainPoints";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const searchQuery = searchParams.get("q") || "";
  
  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);
  const [displayCount, setDisplayCount] = useState(filtered.length);
  
  useEffect(() => {
    setDisplayCount(filtered.length);
  }, [filtered.length]);

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-h1 text-ink-900">Find your next creator</h1>
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
        onProfileClick={() => {}}
      />

      <div className="mt-32 pt-16 border-t border-ink-100">
        <MarketerPainPoints />
      </div>
    </Layout>
  );
}
