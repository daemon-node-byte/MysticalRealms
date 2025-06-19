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

  it('updates confirm password pattern when password changes', () => {
    render(<SignUpForm onSubmit={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    
    fireEvent.change(passwordInput, { target: { value: 'TestPassword123!' } });
    
    expect(confirmPasswordInput).toHaveAttribute('pattern', 'TestPassword123!');
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
    expect(passwordInput).toHaveAttribute('pattern');
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
