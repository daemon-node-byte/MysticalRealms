import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  it('renders headline and CTA', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Mystical Realms/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Tarot, Astrology & More/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Your Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
