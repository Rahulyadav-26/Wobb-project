import { Layout } from "@/components/Layout";
import { ProfileCard } from "@/components/ProfileCard";
import { useList } from "@/context/ListContext";
import { Link } from "react-router-dom";

export function ListPage() {
  const { savedProfiles } = useList();

  return (
    <Layout title="My List">
      <p className="text-gray-500 mb-4 text-sm">
        Your saved influencer profiles
      </p>

      {savedProfiles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven't saved any profiles yet.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Go back to search
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {savedProfiles.map((saved) => (
            <ProfileCard
              key={saved.profile.user_id}
              profile={saved.profile}
              platform={saved.platform}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
