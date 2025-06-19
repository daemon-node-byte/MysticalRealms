import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordResetForm from '../PasswordResetForm';

describe('PasswordResetForm', () => {
  it('renders form fields and submit button', () => {
    render(<PasswordResetForm onSubmit={jest.fn()} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    render(<PasswordResetForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
      const formData = onSubmit.mock.calls[0][0];
      expect(formData.get('email')).toBe('test@example.com');
    });
  });

  it('shows loading state during submission', async () => {
    let resolveSubmit: () => void;
    const onSubmit = jest.fn(() => new Promise<void>(resolve => {
      resolveSubmit = resolve;
    }));
    
    render(<PasswordResetForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    
    expect(screen.getByRole('button', { name: /sending.../i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sending.../i })).toBeDisabled();
    
    resolveSubmit!();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send reset link/i })).not.toBeDisabled();
    });
  });

  it('handles onSubmit errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onSubmit = jest.fn().mockRejectedValue(new Error('Network error'));
    
    render(<PasswordResetForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /send reset link/i })).not.toBeDisabled();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  it('has proper form structure and accessibility', () => {
    render(<PasswordResetForm onSubmit={jest.fn()} />);
    
    const form = screen.getByRole('form', { name: /password reset form/i });
    expect(form).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
  });
});
