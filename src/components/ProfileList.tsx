import { memo } from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  onProfileClick: (username: string) => void;
  isLoading?: boolean;
}

export const ProfileList = memo(function ProfileList({
  profiles,
  platform,
  onProfileClick,
  isLoading = false,
}: ProfileListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[180px] rounded-2xl border border-ink-100 bg-surface-card p-5"
          >
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-r from-ink-100 via-ink-100/40 to-ink-100 bg-[length:200%_100%] animate-shimmer" />
              <div className="flex-1 space-y-3 py-1">
                <div className="h-4 w-1/2 rounded bg-gradient-to-r from-ink-100 via-ink-100/40 to-ink-100 bg-[length:200%_100%] animate-shimmer" />
                <div className="h-3 w-1/3 rounded bg-gradient-to-r from-ink-100 via-ink-100/40 to-ink-100 bg-[length:200%_100%] animate-shimmer" />
              </div>
            </div>
            <div className="mt-6 h-12 w-full rounded bg-gradient-to-r from-ink-100 via-ink-100/40 to-ink-100 bg-[length:200%_100%] animate-shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-surface-card px-6 py-20 text-center">
        <p className="text-body text-ink-500">
          No profiles found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
      {profiles.map((profile, i) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          onProfileClick={onProfileClick}
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
});
