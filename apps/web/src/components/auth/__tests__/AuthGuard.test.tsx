import { render, screen, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useAuth hook
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it('renders children when user is authenticated', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: 'test-user-id', email: 'test@example.com' } as User,
      profile: null,
      loading: false,
      signOut: jest.fn(),
      isAuthenticated: true,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      profile: null,
      loading: true,
      signOut: jest.fn(),
      isAuthenticated: false,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects to signin when user is not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      profile: null,
      loading: false,
      signOut: jest.fn(),
      isAuthenticated: false,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/signin');
    });
  });

  it('renders fallback when provided and loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      profile: null,
      loading: true,
      signOut: jest.fn(),
      isAuthenticated: false,
    });

    render(
      <AuthGuard fallback={<div>Custom Loading</div>}>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Custom Loading')).toBeInTheDocument();
  });

  it('renders nothing when user is not authenticated and not loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      profile: null,
      loading: false,
      signOut: jest.fn(),
      isAuthenticated: false,
    });

    const { container } = render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(container.firstChild).toBeNull();
  });
});
