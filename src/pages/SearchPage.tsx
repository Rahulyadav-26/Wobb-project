import { useState, useMemo, useEffect } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  
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
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={() => {}}
      />
    </Layout>
  );
}
