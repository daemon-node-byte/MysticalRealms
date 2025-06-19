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
  it('renders Join the Conversation link', () => {
    render(<CommunityPreview />);
    expect(screen.getByText('Join the Conversation')).toBeInTheDocument();
  });
});
