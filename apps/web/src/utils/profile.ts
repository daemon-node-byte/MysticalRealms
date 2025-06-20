import { Profile } from "@/types/profile";

/**
 * Calculate profile completion percentage
 */
export function calculateProfileCompletion(profile: Profile | null): number {
  if (!profile) return 0;

  const fields = [
    profile.username?.trim(),
    profile.bio?.trim(),
    profile.status?.trim()
  ];

  const completedFields = fields.filter(Boolean).length;
  return Math.round((completedFields / fields.length) * 100);
}

/**
 * Get missing profile fields
 */
export function getMissingProfileFields(profile: Profile | null): string[] {
  if (!profile) return ["username", "bio", "status"];

  const missing: string[] = [];
  if (!profile.username?.trim()) missing.push("username");
  if (!profile.bio?.trim()) missing.push("bio");
  if (!profile.status?.trim()) missing.push("status");

  return missing;
}

/**
 * Check if profile is complete
 */
export function isProfileComplete(profile: Profile | null): boolean {
  if (!profile) return false;
  return !!(
    profile.username?.trim() &&
    profile.bio?.trim() &&
    profile.status?.trim()
  );
}

/**
 * Format field name for display
 */
export function formatFieldName(fieldName: string): string {
  const fieldMap: Record<string, string> = {
    username: "Username",
    bio: "Bio",
    status: "Status"
  };
  return fieldMap[fieldName] || fieldName;
}
