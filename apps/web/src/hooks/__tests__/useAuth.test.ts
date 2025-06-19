import { renderHook, waitFor, act } from "@testing-library/react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";

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

    await act(async () => {
      await result.current.signOut();
    });

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

  it("handles auth state changes with authenticated user", async () => {
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

    // Initial getUser returns no user
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null
    });

    let authStateCallback:
      | ((event: string, session: Session | null) => Promise<void>)
      | null = null;

    mockSupabaseClient.auth.onAuthStateChange.mockImplementation((callback) => {
      authStateCallback = callback;
      return {
        data: { subscription: { unsubscribe: jest.fn() } }
      };
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

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Initially should be null (no user)
    expect(result.current.user).toBe(null);
    expect(result.current.profile).toBe(null);

    // Simulate auth state change to signed in
    await act(async () => {
      if (authStateCallback) {
        await authStateCallback("SIGNED_IN", { user: mockUser } as Session);
      }
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });

    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("handles auth state changes with signed out user", async () => {
    const mockUser = {
      id: "test-user-id",
      email: "test@example.com"
    };

    // Initially return a user, then simulate sign out
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null
    });

    let authStateCallback:
      | ((event: string, session: Session | null) => Promise<void>)
      | null = null;

    mockSupabaseClient.auth.onAuthStateChange.mockImplementation((callback) => {
      authStateCallback = callback;
      return {
        data: { subscription: { unsubscribe: jest.fn() } }
      };
    });

    mockSupabaseClient.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: { id: "test-user-id", username: "testuser" },
            error: null
          })
        })
      })
    });

    const { result } = renderHook(() => useAuth());

    // Wait for initial loading to complete with user
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should initially have user
    expect(result.current.user).toEqual(mockUser);

    // Simulate auth state change to signed out
    await act(async () => {
      if (authStateCallback) {
        await authStateCallback("SIGNED_OUT", null);
      }
    });

    await waitFor(() => {
      expect(result.current.user).toBe(null);
    });

    expect(result.current.profile).toBe(null);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("handles auth state changes when current user has no profile", async () => {
    const mockUser = {
      id: "test-user-id-no-profile",
      email: "test@example.com"
    };

    // Initial getUser returns no user
    mockSupabaseClient.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: null
    });

    let authStateCallback:
      | ((event: string, session: Session | null) => Promise<void>)
      | null = null;

    mockSupabaseClient.auth.onAuthStateChange.mockImplementation((callback) => {
      authStateCallback = callback;
      return {
        data: { subscription: { unsubscribe: jest.fn() } }
      };
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

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Initially should be null (no user)
    expect(result.current.user).toBe(null);

    // Simulate auth state change to signed in (user without profile)
    await act(async () => {
      if (authStateCallback) {
        await authStateCallback("SIGNED_IN", { user: mockUser } as Session);
      }
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });

    expect(result.current.profile).toBe(null);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
