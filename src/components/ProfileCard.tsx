import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}


export function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isProfileSaved } = useListStore();
  
  const isSaved = isProfileSaved(profile.username);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      {isSaved ? (
        <button
          className="px-3 py-1 border border-red-500 text-red-500 hover:bg-red-50 text-sm rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            removeProfile(profile.username);
          }}
        >
          Remove from List
        </button>
      ) : (
        <button
          className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 text-sm rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            addProfile(profile, platform);
          }}
        >
          Add to List
        </button>
      )}
    </div>
  );
}
