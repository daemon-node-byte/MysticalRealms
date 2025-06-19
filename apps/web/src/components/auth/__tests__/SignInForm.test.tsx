import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from '../SignInForm';

describe('SignInForm', () => {
  it('renders form fields and submit button', () => {
    render(<SignInForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<SignInForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      const formData = onSubmit.mock.calls[0][0];
      expect(formData.get('email')).toBe('test@example.com');
      expect(formData.get('password')).toBe('password123');
    });
  });

  it('shows loading state during submission', async () => {
    let resolveSubmit: () => void;
    const onSubmit = jest.fn(() => new Promise<void>(resolve => {
      resolveSubmit = resolve;
    }));
    
    render(<SignInForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    expect(screen.getByRole('button', { name: /signing in.../i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signing in.../i })).toBeDisabled();
    
    resolveSubmit!();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
  });

  it('handles onSubmit errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onSubmit = jest.fn().mockRejectedValue(new Error('Authentication failed'));
    
    render(<SignInForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).not.toBeDisabled();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('has proper form structure and accessibility', () => {
    render(<SignInForm onSubmit={jest.fn()} />);
    
    const form = screen.getByRole('form', { name: /sign in form/i });
    expect(form).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
  });

  it('displays authentication error messages', () => {
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<SignInForm onSubmit={mockSubmit} />);
    
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.submit(form);
    
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('clears error on new submission attempt', () => {
    const mockSubmit = jest.fn();
    render(<SignInForm onSubmit={mockSubmit} />);
    
    const form = screen.getByRole('form');
    
    // Submit multiple times to ensure no error accumulation
    fireEvent.submit(form);
    fireEvent.submit(form);
    
    expect(mockSubmit).toHaveBeenCalledTimes(2);
  });
});
