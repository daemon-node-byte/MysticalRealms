import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from '../SignUpForm';

describe('SignUpForm', () => {
  it('renders form fields and submit button', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<SignUpForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      const formData = onSubmit.mock.calls[0][0];
      expect(formData.get('email')).toBe('test@example.com');
      expect(formData.get('password')).toBe('Password123!');
      expect(formData.get('confirmPassword')).toBe('Password123!');
    });
  });

  it('shows loading state during submission', async () => {
    let resolveSubmit: () => void;
    const onSubmit = jest.fn(() => new Promise<void>(resolve => {
      resolveSubmit = resolve;
    }));
    
    render(<SignUpForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    expect(screen.getByRole('button', { name: /signing up.../i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /signing up.../i })).toBeDisabled();
    
    resolveSubmit!();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).not.toBeDisabled();
    });
  });

  it('handles onSubmit errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onSubmit = jest.fn().mockRejectedValue(new Error('Registration failed'));
    
    render(<SignUpForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'Password123!' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up/i })).not.toBeDisabled();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('updates password state when typing', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    fireEvent.change(passwordInput, { target: { value: 'NewPassword123!' } });
    
    expect(passwordInput).toHaveValue('NewPassword123!');
  });

  it('validates password strength in JavaScript', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    
    // Test weak password shows error
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput);
    
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    
    // Test strong password
    fireEvent.change(passwordInput, { target: { value: 'TestPassword123!' } });
    fireEvent.blur(passwordInput);
    
    // Error should be gone
    expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument();
  });

  it('validates password confirmation matching', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    // Set password first
    fireEvent.change(passwordInput, { target: { value: 'TestPassword123!' } });
    
    // Set mismatched confirm password
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword!' } });
    fireEvent.blur(confirmPasswordInput);
    
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    
    // Fix confirm password
    fireEvent.change(confirmPasswordInput, { target: { value: 'TestPassword123!' } });
    fireEvent.blur(confirmPasswordInput);
    
    expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
  });

  it('validates all password requirements', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    
    // Test missing uppercase
    fireEvent.change(passwordInput, { target: { value: 'testpassword123!' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/password must contain at least one uppercase letter/i)).toBeInTheDocument();
    
    // Test missing lowercase
    fireEvent.change(passwordInput, { target: { value: 'TESTPASSWORD123!' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/password must contain at least one lowercase letter/i)).toBeInTheDocument();
    
    // Test missing number
    fireEvent.change(passwordInput, { target: { value: 'TestPassword!' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/password must contain at least one number/i)).toBeInTheDocument();
    
    // Test missing special character
    fireEvent.change(passwordInput, { target: { value: 'TestPassword123' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/password must contain at least one special character/i)).toBeInTheDocument();
  });

  it('shows authentication error when provided', async () => {
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Authentication failed'));
    render(<SignUpForm onSubmit={mockSubmit} />);
    
    const form = screen.getByRole('form');
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'TestPassword123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'TestPassword123!' } });
    
    fireEvent.submit(form);
    
    // Should show auth error after submission
    expect(mockSubmit).toHaveBeenCalled();
    
    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/authentication failed/i)).toBeInTheDocument();
    });
  });

  it('has proper form structure and accessibility', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const form = screen.getByRole('form', { name: /sign up form/i });
    expect(form).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('min', '6');
    
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('required');
  });

  it('starts with empty password state', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveValue('');
  });
});
