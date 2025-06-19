import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({
    user: null,
    profile: null,
    loading: false,
    signOut: jest.fn(),
  })),
}));

// Mock the Supabase client
jest.mock('../../../utils/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(() => Promise.resolve({ data: { user: null } })),
      onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null })),
        })),
      })),
    })),
  })),
}));

describe('Header', () => {
  it('renders site title and navigation', () => {
    render(<Header />);
    expect(screen.getByText('Mystical Realms')).toBeInTheDocument();
    expect(screen.getByText('Tarot')).toBeInTheDocument();
    expect(screen.getByText('Astrology')).toBeInTheDocument();
    expect(screen.getByText('Journal')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
