import { render, screen } from '@testing-library/react';
import { ProfileCompletionBanner } from '@/components/profile/ProfileCompletionBanner';
import { Profile } from '@/types/profile';

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('ProfileCompletionBanner', () => {
  const mockIncompleteProfile: Profile = {
    id: '123',
    username: 'testuser',
    bio: null,
    status: null,
    avatar_url: null,
    badges: null,
    created_at: '2024-01-01T00:00:00Z'
  };

  const mockCompleteProfile: Profile = {
    id: '123',
    username: 'testuser',
    bio: 'This is a test bio that is longer than 10 characters',
    status: 'Novice',
    avatar_url: null,
    badges: null,
    created_at: '2024-01-01T00:00:00Z'
  };

  it('should render banner for incomplete profile', () => {
    render(<ProfileCompletionBanner profile={mockIncompleteProfile} />);
    
    expect(screen.getByText('Complete Your Mystical Profile')).toBeInTheDocument();
    expect(screen.getByText('Unlock the full potential of your mystical journey by completing your profile')).toBeInTheDocument();
    expect(screen.getByText('33%')).toBeInTheDocument();
    expect(screen.getByText('Missing: Bio, Status')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Complete Profile/i })).toBeInTheDocument();
  });

  it('should not render banner for complete profile', () => {
    const { container } = render(<ProfileCompletionBanner profile={mockCompleteProfile} />);
    expect(container.firstChild).toBeNull();
  });

  it('should not render banner for null profile but would show if rendered', () => {
    render(<ProfileCompletionBanner profile={null} />);
    
    expect(screen.getByText('Complete Your Mystical Profile')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('Missing: Username, Bio, Status')).toBeInTheDocument();
  });

  it('should link to profile setup page', () => {
    render(<ProfileCompletionBanner profile={mockIncompleteProfile} />);
    
    const link = screen.getByRole('link', { name: /Complete Profile/i });
    expect(link).toHaveAttribute('href', '/profile/setup');
  });
});
