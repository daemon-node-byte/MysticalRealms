import { renderHook } from "@testing-library/react";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";
import { Profile } from "@/types/profile";

describe("useProfileCompletion Hook", () => {
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

  it("should return incomplete status for null profile", () => {
    const { result } = renderHook(() => useProfileCompletion(null));

    expect(result.current.isComplete).toBe(false);
    expect(result.current.completionPercentage).toBe(0);
    expect(result.current.missingFields).toEqual(["username", "bio", "status"]);
    expect(result.current.requiredFields).toEqual({
      username: false,
      bio: false,
      status: false
    });
  });

  it("should return complete status for complete profile", () => {
    const { result } = renderHook(() =>
      useProfileCompletion(mockCompleteProfile)
    );

    expect(result.current.isComplete).toBe(true);
    expect(result.current.completionPercentage).toBe(100);
    expect(result.current.missingFields).toEqual([]);
    expect(result.current.requiredFields).toEqual({
      username: true,
      bio: true,
      status: true
    });
  });

  it("should return partial completion for incomplete profile", () => {
    const { result } = renderHook(() =>
      useProfileCompletion(mockIncompleteProfile)
    );

    expect(result.current.isComplete).toBe(false);
    expect(result.current.completionPercentage).toBe(33);
    expect(result.current.missingFields).toEqual(["bio", "status"]);
    expect(result.current.requiredFields).toEqual({
      username: true,
      bio: false,
      status: false
    });
  });

  it("should handle empty strings as incomplete", () => {
    const profileWithEmptyStrings: Profile = {
      ...mockIncompleteProfile,
      username: "",
      bio: "   ",
      status: ""
    };

    const { result } = renderHook(() =>
      useProfileCompletion(profileWithEmptyStrings)
    );

    expect(result.current.isComplete).toBe(false);
    expect(result.current.completionPercentage).toBe(0);
    expect(result.current.missingFields).toEqual(["username", "bio", "status"]);
  });
});
