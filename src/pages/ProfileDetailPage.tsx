import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useListStore } from "@/store/useListStore";

function ArrowLeftIcon({ className }: { className?: string }) {
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
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
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

function ExternalLinkIcon({ className }: { className?: string }) {
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
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const { addProfile, removeProfile, isProfileSaved } = useListStore();
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) return null;

  if (!loaded) {
    return (
      <Layout>
        <div className="flex h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-ink-100 border-t-brand-500" />
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title={`@${username}`}>
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-white/60 px-6 py-20 text-center">
          <h2 className="text-h2 text-ink-900">Profile Not Found</h2>
          <p className="mx-auto mt-2 max-w-sm text-body text-ink-500">
            Could not load details for @{username}. This may be because the mock
            data file is missing.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-small font-semibold text-white shadow-sm transition-all duration-200 ease-snap hover:bg-brand-600 active:scale-[0.98]"
          >
            <ArrowLeftIcon className="h-4 w-4" /> Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const isSaved = isProfileSaved(user.username);

  const metrics = [
    { label: "Followers", value: formatFollowers(user.followers) },
    {
      label: "Posts",
      value: user.posts_count ? formatFollowers(user.posts_count) : "—",
    },
    {
      label: "Avg Likes",
      value: user.avg_likes ? formatFollowers(user.avg_likes) : "—",
    },
    {
      label: "Avg Comments",
      value:
        user.avg_comments !== undefined
          ? formatFollowers(user.avg_comments)
          : "—",
    },
    {
      label: "Avg Views",
      value: user.avg_views ? formatFollowers(user.avg_views) : "—",
    },
  ];

  return (
    <Layout title={user.fullname}>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-small font-medium text-ink-500 transition-colors hover:text-ink-900"
      >
        <ArrowLeftIcon className="h-4 w-4" /> Back to search
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {/* Hero */}
          <section className="rounded-3xl border border-ink-100 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <img
                src={user.picture}
                alt={user.fullname}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-4 ring-brand-50 sm:h-28 sm:w-28"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-display text-ink-900">{user.fullname}</h1>
                  {user.is_verified && (
                    <VerifiedBadge verified={user.is_verified} className="h-7 w-7 text-brand-500 shrink-0" />
                  )}
                </div>
                <p className="mt-1 text-body text-ink-500">
                  @{user.username} ·{" "}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </p>
                {user.description && (
                  <p className="mt-4 text-small text-ink-700 leading-relaxed max-w-3xl">
                    {user.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Stats grid */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl bg-ink-100/60 p-4">
                <p className="text-h2 tabular-nums text-ink-900">{m.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-500">
                  {m.label}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Sticky sidebar */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <h3 className="text-h3 text-ink-900 mb-4">Profile Actions</h3>

            <div className="space-y-3">
              <button
                onClick={() =>
                  isSaved
                    ? removeProfile(user.username)
                    : addProfile(user, platform)
                }
                className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-small font-semibold shadow-sm transition-all duration-200 ease-snap active:scale-[0.98] ${
                  isSaved
                    ? "border border-ink-200 bg-white text-ink-900 hover:border-ink-300 hover:bg-ink-50"
                    : "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-md"
                }`}
              >
                {isSaved ? (
                  <HeartSolidIcon className="h-5 w-5 text-brand-500" />
                ) : (
                  <HeartOutlineIcon className="h-5 w-5" />
                )}
                {isSaved ? "Saved to List" : "Add to List"}
              </button>

              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-3 text-small font-semibold text-ink-700 shadow-xs transition-all duration-200 ease-snap hover:bg-ink-50 active:scale-[0.98]"
                >
                  <ExternalLinkIcon className="h-4 w-4" /> View on{" "}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              )}
            </div>

            {user.engagement_rate !== undefined && (
              <div className="mt-6 border-t border-ink-100 pt-6">
                <p className="mb-1 text-small font-medium text-ink-500">
                  Engagement Rate
                </p>
                <div className="flex items-end gap-2">
                  <span className="tabular-nums text-h1 text-success">
                    {(user.engagement_rate * 10000).toFixed(2)}%
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="h-full rounded-full bg-success transition-all duration-1000 ease-snap"
                    style={{
                      width: `${Math.min(user.engagement_rate * 10000, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </Layout>
  );
}
