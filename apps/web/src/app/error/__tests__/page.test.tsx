import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ErrorPage from '../page';
import { Theme } from '@radix-ui/themes';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockBack = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
    back: mockBack,
  });
  
  // Mock window.history
  Object.defineProperty(window, 'history', {
    value: { length: 2 },
    writable: true,
  });
});

describe('ErrorPage', () => {
  const renderErrorPage = (props = {}) => {
    return render(
      <Theme>
        <ErrorPage {...props} />
      </Theme>
    );
  };

  it('renders error page with default message', () => {
    renderErrorPage();
    
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('Something Went Wrong')).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const error = new Error('Test error message');
    renderErrorPage({ error });
    
    expect(screen.getByText('Error: Test error message')).toBeInTheDocument();
  });

  it('shows retry button when reset function is provided', () => {
    const mockReset = jest.fn();
    renderErrorPage({ reset: mockReset });
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('does not show retry button when reset function is not provided', () => {
    renderErrorPage();
    
    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });

  it('navigates back when go back button is clicked', () => {
    renderErrorPage();
    
    const goBackButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(goBackButton);
    
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('navigates to home when history length is 1', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 1 },
      writable: true,
    });
    
    renderErrorPage();
    
    const goBackButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(goBackButton);
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('has proper navigation links', () => {
    renderErrorPage();
    
    const homeLink = screen.getByRole('link', { name: /return to home/i });
    const dashboardLink = screen.getByRole('link', { name: /go to dashboard/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });

  it('handles error reporting', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    renderErrorPage();
    
    const reportButton = screen.getByRole('button', { name: /report this error/i });
    fireEvent.click(reportButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Error reported - Thank you for helping us improve!/)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(consoleSpy).toHaveBeenCalledWith('Error Report:', expect.any(Object));
    consoleSpy.mockRestore();
  });

  it('generates unique error ID', () => {
    renderErrorPage();
    
    const errorIdElement = screen.getByText(/ERR-/);
    expect(errorIdElement).toBeInTheDocument();
    
    // Error ID should follow the pattern ERR-timestamp-random
    const errorId = errorIdElement.textContent;
    expect(errorId).toMatch(/^ERR-\d+-[a-z0-9]+$/);
  });

  it('has proper accessibility attributes', () => {
    renderErrorPage();
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('aria-labelledby', 'error-heading');
    
    const heading = screen.getByRole('heading', { name: /something went wrong/i });
    expect(heading).toHaveAttribute('id', 'error-heading');
    
    // Check for aria-labels on buttons
    expect(screen.getByRole('button', { name: /go back to previous page/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to home page/i })).toBeInTheDocument();
  });

  it('has help links in footer', () => {
    renderErrorPage();
    
    const contactLink = screen.getByRole('link', { name: /contact support/i });
    const statusLink = screen.getByRole('link', { name: /check system status/i });
    
    expect(contactLink).toHaveAttribute('href', '/contact');
    expect(statusLink).toHaveAttribute('href', '/status');
  });

  it('logs error to console when error prop is provided', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    
    renderErrorPage({ error });
    
    expect(consoleSpy).toHaveBeenCalledWith('Application Error:', error);
    consoleSpy.mockRestore();
  });
});
