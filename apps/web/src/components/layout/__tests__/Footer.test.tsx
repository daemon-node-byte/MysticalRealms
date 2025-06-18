import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders all navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('renders social icons', () => {
    render(<Footer />);
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Discord')).toBeInTheDocument();
  });

  it('renders newsletter input and button as disabled', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText('Your email')).toBeDisabled();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeDisabled();
  });
});
