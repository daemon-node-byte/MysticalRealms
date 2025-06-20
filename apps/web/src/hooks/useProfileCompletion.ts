"use client";

import { useMemo } from "react";
import { Profile, ProfileCompletion } from "@/types/profile";

/**
 * Hook to check profile completion status
 * A profile is considered complete when it has username, bio, and status
 */
export function useProfileCompletion(
  profile: Profile | null
): ProfileCompletion {
  return useMemo(() => {
    if (!profile) {
      return {
        isComplete: false,
        completionPercentage: 0,
        missingFields: ["username", "bio", "status"],
        requiredFields: {
          username: false,
          bio: false,
          status: false
        }
      };
    }

    const requiredFields = {
      username: !!(profile.username && profile.username.trim()),
      bio: !!(profile.bio && profile.bio.trim()),
      status: !!(profile.status && profile.status.trim())
    };

    const completedFields =
      Object.values(requiredFields).filter(Boolean).length;
    const totalFields = Object.keys(requiredFields).length;
    const completionPercentage = Math.round(
      (completedFields / totalFields) * 100
    );

    const missingFields: string[] = [];
    if (!requiredFields.username) missingFields.push("username");
    if (!requiredFields.bio) missingFields.push("bio");
    if (!requiredFields.status) missingFields.push("status");

    return {
      isComplete: completedFields === totalFields,
      completionPercentage,
      missingFields,
      requiredFields
    };
  }, [profile]);
}
