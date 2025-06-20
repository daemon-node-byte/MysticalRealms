import {
  calculateProfileCompletion,
  getMissingProfileFields,
  isProfileComplete,
  formatFieldName
} from "@/utils/profile";
import { Profile } from "@/types/profile";

describe("Profile Utilities", () => {
  const mockCompleteProfile: Profile = {
    id: "123",
    username: "testuser",
    bio: "This is a test bio that is longer than 10 characters",
    status: "Novice",
    avatar_url: null,
    badges: null,
    created_at: "2024-01-01T00:00:00Z"
  };

  const mockIncompleteProfile: Profile = {
    id: "123",
    username: "testuser",
    bio: null,
    status: null,
    avatar_url: null,
    badges: null,
    created_at: "2024-01-01T00:00:00Z"
  };

  describe("calculateProfileCompletion", () => {
    it("should return 0 for null profile", () => {
      expect(calculateProfileCompletion(null)).toBe(0);
    });

    it("should return 100 for complete profile", () => {
      expect(calculateProfileCompletion(mockCompleteProfile)).toBe(100);
    });

    it("should return 33 for profile with only username", () => {
      expect(calculateProfileCompletion(mockIncompleteProfile)).toBe(33);
    });

    it("should ignore empty strings", () => {
      const profileWithEmptyStrings: Profile = {
        ...mockIncompleteProfile,
        username: "",
        bio: "   ",
        status: ""
      };
      expect(calculateProfileCompletion(profileWithEmptyStrings)).toBe(0);
    });
  });

  describe("getMissingProfileFields", () => {
    it("should return all fields for null profile", () => {
      const missing = getMissingProfileFields(null);
      expect(missing).toEqual(["username", "bio", "status"]);
    });

    it("should return empty array for complete profile", () => {
      const missing = getMissingProfileFields(mockCompleteProfile);
      expect(missing).toEqual([]);
    });

    it("should return missing fields only", () => {
      const missing = getMissingProfileFields(mockIncompleteProfile);
      expect(missing).toEqual(["bio", "status"]);
    });
  });

  describe("isProfileComplete", () => {
    it("should return false for null profile", () => {
      expect(isProfileComplete(null)).toBe(false);
    });

    it("should return true for complete profile", () => {
      expect(isProfileComplete(mockCompleteProfile)).toBe(true);
    });

    it("should return false for incomplete profile", () => {
      expect(isProfileComplete(mockIncompleteProfile)).toBe(false);
    });
  });

  describe("formatFieldName", () => {
    it("should format field names correctly", () => {
      expect(formatFieldName("username")).toBe("Username");
      expect(formatFieldName("bio")).toBe("Bio");
      expect(formatFieldName("status")).toBe("Status");
    });

    it("should return original field name if not mapped", () => {
      expect(formatFieldName("unknown")).toBe("unknown");
    });
  });
});
