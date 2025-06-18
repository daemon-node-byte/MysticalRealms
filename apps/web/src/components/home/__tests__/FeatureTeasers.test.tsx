import { render, screen } from '@testing-library/react';
import { FeatureTeasers } from '../FeatureTeasers';

describe('FeatureTeasers', () => {
  it('renders all feature cards', () => {
    render(<FeatureTeasers />);
    expect(screen.getByText('Tarot Readings')).toBeInTheDocument();
    expect(screen.getByText('Astrology Charts')).toBeInTheDocument();
    expect(screen.getByText('Dice Divinations')).toBeInTheDocument();
  });
});
