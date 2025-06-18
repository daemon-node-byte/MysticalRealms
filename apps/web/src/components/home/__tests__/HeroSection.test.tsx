import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  it('renders headline and CTA', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Welcome to Mystical Realms/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Your Free Reading/i)).toBeInTheDocument();
  });
});
