import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
  style?: React.CSSProperties;
}

function HeartOutlineIcon({ className }: { className?: string }) {
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

function HeartSolidIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
}

import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";

export function ProfileCard({
  profile,
  platform,
  onProfileClick,
  style,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isProfileSaved } = useListStore();

  const isSaved = isProfileSaved(profile.username);

  const handleClick = () => {
    const routeId = profile.username || profile.handle || profile.custom_name || profile.user_id;
    if (onProfileClick) onProfileClick(routeId || "");
    navigate(`/profile/${routeId}?platform=${platform}`);
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeProfile(profile.username);
    } else {
      addProfile(profile, platform);
    }
  };

  const stats = [
    { label: "Followers", value: formatFollowers(profile.followers) },
    { label: "Engagements", value: profile.engagements ? formatFollowers(profile.engagements) : "—" },
    { label: "Views", value: profile.avg_views ? formatFollowers(profile.avg_views) : "—" },
  ];

  return (
    <article
      onClick={handleClick}
      style={style}
      className="group relative cursor-pointer animate-fade-up rounded-2xl border border-ink-100 bg-surface-card p-5 shadow-xs transition-all duration-300 ease-snap hover:-translate-y-1 hover:border-ink-200 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={profile.picture}
            className="h-14 w-14 rounded-full object-cover ring-1 ring-ink-100 bg-surface-base"
            alt={profile.username}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.fullname || profile.username || "U"
              )}&background=7C3AED&color=fff`;
            }}
          />
          {profile.is_verified && (
            <VerifiedBadge verified={profile.is_verified} className="absolute -bottom-0.5 -right-0.5 h-5 w-5 text-brand-500 drop-shadow-sm" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-h3 text-ink-900">{profile.fullname}</h3>
          <p className="truncate text-small text-ink-500">@{profile.username}</p>
        </div>
        <button
          onClick={handleToggleList}
          className={`transition-opacity ${isSaved ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          aria-label={isSaved ? "Remove from list" : "Save to list"}
        >
          {isSaved ? (
            <HeartSolidIcon className="h-5 w-5 text-brand-500" />
          ) : (
            <HeartOutlineIcon className="h-5 w-5 text-ink-300 hover:text-brand-500" />
          )}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 sm:gap-2 border-t border-ink-100 pt-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-body sm:text-h3 tabular-nums font-semibold text-ink-900">{s.value}</p>
            <p className="text-[10px] sm:text-micro uppercase tracking-wide text-ink-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
