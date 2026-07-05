"use client";

import { createContext, useContext } from "react";
import type { TravelProfile } from "@/lib/types";

type ProfileContextValue = {
  username: string;
  profile: TravelProfile;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

type ProfileProviderProps = {
  username: string;
  profile: TravelProfile;
  children: React.ReactNode;
};

export function ProfileProvider({ username, profile, children }: ProfileProviderProps) {
  return (
    <ProfileContext.Provider value={{ username, profile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }

  return context;
}
