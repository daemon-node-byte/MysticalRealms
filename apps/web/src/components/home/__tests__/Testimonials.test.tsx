import { render, screen } from '@testing-library/react';
import { Testimonials } from '../Testimonials';

describe('Testimonials', () => {
  it('renders all testimonial names and quotes', () => {
    render(<Testimonials />);
    expect(screen.getByText((content) => content.includes('Ava L.'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Leo S.'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Maya R.'))).toBeInTheDocument();
    expect(screen.getByText(/Mystical Realms gave me the most insightful tarot reading/i)).toBeInTheDocument();
    expect(screen.getByText(/The astrology charts are spot on/i)).toBeInTheDocument();
    expect(screen.getByText(/Dice divination is so fun/i)).toBeInTheDocument();
  });
});
