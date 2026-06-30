import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SavedProfile, UserProfileSummary, Platform } from "@/types";

interface ListState {
  savedProfiles: SavedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (username: string) => void;
  isProfileSaved: (username: string) => boolean;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      savedProfiles: [],
      addProfile: (profile, platform) =>
        set((state) => {
          if (
            state.savedProfiles.some(
              (p) => p.profile.username === profile.username
            )
          ) {
            return state;
          }
          return {
            savedProfiles: [...state.savedProfiles, { profile, platform }],
          };
        }),
      removeProfile: (username) =>
        set((state) => ({
          savedProfiles: state.savedProfiles.filter(
            (p) => p.profile.username !== username
          ),
        })),
      isProfileSaved: (username) => {
        return get().savedProfiles.some((p) => p.profile.username === username);
      },
    }),
    {
      name: "wobb_saved_profiles",
    }
  )
);
