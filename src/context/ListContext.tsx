import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { SavedProfile, UserProfileSummary, Platform } from "@/types";

interface ListContextType {
  savedProfiles: SavedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (username: string) => void;
  isProfileSaved: (username: string) => boolean;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export function ListProvider({ children }: { children: ReactNode }) {
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>(() => {
    const saved = localStorage.getItem("wobb_saved_profiles");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved profiles", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wobb_saved_profiles", JSON.stringify(savedProfiles));
  }, [savedProfiles]);

  const addProfile = (profile: UserProfileSummary, platform: Platform) => {
    setSavedProfiles((prev) => {
      // Prevent duplicates by checking username
      if (prev.some((p) => p.profile.username === profile.username)) {
        return prev;
      }
      return [...prev, { profile, platform }];
    });
  };

  const removeProfile = (username: string) => {
    setSavedProfiles((prev) =>
      prev.filter((p) => p.profile.username !== username)
    );
  };

  const isProfileSaved = (username: string) => {
    return savedProfiles.some((p) => p.profile.username === username);
  };

  return (
    <ListContext.Provider
      value={{ savedProfiles, addProfile, removeProfile, isProfileSaved }}
    >
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
}
