import { render, screen } from '@testing-library/react';
import { CommunityPreview } from '../CommunityPreview';

describe('CommunityPreview', () => {
  it('renders all community entries and users', () => {
    render(<CommunityPreview />);
    expect(screen.getByText(/Pulled The Star today/i)).toBeInTheDocument();
    expect(screen.getByText(/My birth chart reading/i)).toBeInTheDocument();
    expect(screen.getByText(/Just shared my first 3D tarot spread/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Luna_Mystic'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('StarSeer89'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('MysticJourney'))).toBeInTheDocument();
  });

  it('renders engagement metrics for each post', () => {
    render(<CommunityPreview />);
    // Check for likes and replies counts (actual data from component)
    expect(screen.getByText('12')).toBeInTheDocument(); // likes for first post
    expect(screen.getByText('3')).toBeInTheDocument(); // replies for first post
    expect(screen.getByText('8')).toBeInTheDocument(); // likes for second post
    expect(screen.getByText('5')).toBeInTheDocument(); // replies for second post
    expect(screen.getByText('15')).toBeInTheDocument(); // likes for third post
    expect(screen.getByText('7')).toBeInTheDocument(); // replies for third post
  });
  it('renders Join the Conversation link', () => {
    render(<CommunityPreview />);
    expect(screen.getByText('Join the Conversation')).toBeInTheDocument();
  });
});
