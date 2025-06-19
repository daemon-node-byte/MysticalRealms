import { renderHook, waitFor } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/client";

// Mock Supabase client
jest.mock("@/utils/supabase/client", () => ({
  createClient: jest.fn()
}));

const mockCreateClient = createClient as jest.MockedFunction<
  typeof createClient
>;

describe("useAuth", () => {
  const mockSupabaseClient = {
    auth: {
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(),
      signOut: jest.fn()
    },
    from: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockCreateClient.mockReturnValue(mockSupabaseClient as any);

    // Mock subscription object
    const mockSubscription = {
      unsubscribe: jest.fn()
    };

    mockSupabaseClient.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: mockSubscription }
    });
  });

  it("initializes with loading state", () => {
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
    expect(result.current.profile).toBe(null);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("handles user authentication", async () => {
    const mockUser = {
      id: "test-user-id",
      email: "test@example.com"
    };

    const mockProfile = {
      id: "test-user-id",
      username: "testuser",
      bio: "Test bio",
      avatar_url: null,
      status: "active",
      badges: [],
      created_at: "2023-01-01T00:00:00Z"
    };

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: mockProfile,
            error: null
          })
        })
      })
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("handles sign out", async () => {
    mockSupabaseClient.auth.signOut.mockResolvedValue({
      error: null
    });

    const { result } = renderHook(() => useAuth());

    await result.current.signOut();

    expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
  });

  it("handles user without profile", async () => {
    const mockUser = {
      id: "test-user-id",
      email: "test@example.com"
    };

    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: null,
            error: { message: "Profile not found" }
          })
        })
      })
    });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.profile).toBe(null);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
