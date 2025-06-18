import { render, screen } from '@testing-library/react';
import { CommunityPreview } from '../CommunityPreview';

describe('CommunityPreview', () => {
  it('renders all community entries and users', () => {
    render(<CommunityPreview />);
    expect(screen.getByText(/Pulled The Star today/i)).toBeInTheDocument();
    expect(screen.getByText(/My birth chart reading/i)).toBeInTheDocument();
    expect(screen.getByText(/Shared my first 3D spread/i)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('anon-1'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('anon-2'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('anon-3'))).toBeInTheDocument();
  });
  it('renders Join the Conversation link', () => {
    render(<CommunityPreview />);
    expect(screen.getByText('Join the Conversation')).toBeInTheDocument();
  });
});
