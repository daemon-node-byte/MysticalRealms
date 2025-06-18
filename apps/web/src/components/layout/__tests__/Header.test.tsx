import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

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
