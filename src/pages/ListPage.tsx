import { Layout } from "@/components/Layout";
import { ProfileCard } from "@/components/ProfileCard";
import { useListStore } from "@/store/useListStore";
import { Link } from "react-router-dom";

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

function ArrowRightIcon({ className }: { className?: string }) {
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
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export function ListPage() {
  const { savedProfiles } = useListStore();

  return (
    <Layout title="My List">
      {savedProfiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-ink-200 bg-white/60 px-6 py-20 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">
            <HeartIcon className="h-8 w-8 text-brand-500" />
          </div>
          <h2 className="text-h2 text-ink-900">Your list is empty</h2>
          <p className="mx-auto mt-2 max-w-sm text-body text-ink-500">
            Save creators you're interested in and they'll show up here for easy
            comparison.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-small font-semibold text-white shadow-sm transition-all duration-200 ease-snap hover:bg-brand-600 hover:shadow-md active:scale-[0.98]"
          >
            Browse creators <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          <header className="mb-8">
            <h1 className="text-h1 text-ink-900">My List</h1>
            <p className="mt-1.5 text-body text-ink-500">
              You have{" "}
              <span className="tabular-nums font-medium text-ink-700">
                {savedProfiles.length}
              </span>{" "}
              saved creators
            </p>
          </header>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
            {savedProfiles.map((saved, i) => (
              <ProfileCard
                key={saved.profile.user_id}
                profile={saved.profile}
                platform={saved.platform}
                style={{ animationDelay: `${i * 40}ms` }}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
