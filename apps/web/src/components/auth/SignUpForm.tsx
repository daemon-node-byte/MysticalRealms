'use client';

import { useState } from "react";
import { Button, TextField, Flex, Card, Box, Text } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Form } from 'radix-ui'


type Props = { onSubmit: (data: FormData) => void;};

export default function SignUpForm({ onSubmit }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters.";
    } else if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    } else if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    } else if (!/\d/.test(value)) {
      return "Password must contain at least one number.";
    } else if (!/[@$!%*?&]/.test(value)) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
    
    // Re-validate confirm password if it's already filled
    if (confirmPassword) {
      setConfirmPasswordError(value !== confirmPassword ? "Passwords do not match" : null);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(password !== value ? "Passwords do not match" : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous errors
    setAuthError(null);
    
    // Validate before submission
    const pwdError = validatePassword(password);
    const confirmError = password !== confirmPassword ? "Passwords do not match" : null;
    
    if (pwdError || confirmError) {
      setPasswordError(pwdError);
      setConfirmPasswordError(confirmError);
      return;
    }
    
    setLoading(true);
    try {
      const formData: FormData = new FormData(e.currentTarget);
      await onSubmit(formData);
    } catch (error) {
      // Error handling - onSubmit prop should handle errors
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Sign up failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="400px">
      <Card size="2">
        <Form.Root onSubmit={handleSubmit} aria-label="Sign up form">
          <Flex direction="column" gap="3">
            {authError && (
              <Text color="red" size="2" role="alert" data-testid="auth-error">
                {authError}
              </Text>
            )}
            <Form.Field name="email">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <TextField.Root type="email" required size="2" variant="surface" radius="large" placeholder="Enter your email">
                  <TextField.Slot>
                    <EnvelopeClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
                <Form.Message match="valueMissing">Please enter your email</Form.Message>
                <Form.Message match="typeMismatch">Please enter a valid email</Form.Message>
            </Form.Field>
            <Form.Field name="password">
              <Form.Label>Password</Form.Label>
              <Form.Control asChild>
                <TextField.Root 
                  type="password" 
                  required 
                  size="2" 
                  variant="surface" 
                  radius="large" 
                  placeholder="Enter your password" 
                  min="6" 
                  value={password} 
                  onChange={handlePasswordChange}
                >
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
                <Form.Message match="valueMissing">Please enter your password</Form.Message>
                {passwordError && (
                  <Text color="red" size="2" style={{ marginTop: '4px' }}>
                    {passwordError}
                  </Text>
                )}
            </Form.Field>
            <Form.Field name="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control asChild>
                <TextField.Root 
                  type="password" 
                  required 
                  size="2" 
                  variant="surface" 
                  radius="large" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                >
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
                <Form.Message match="valueMissing">Please confirm your password</Form.Message>
                {confirmPasswordError && (
                  <Text color="red" size="2" style={{ marginTop: '4px' }}>
                    {confirmPasswordError}
                  </Text>
                )}
            </Form.Field>
            <Form.Submit asChild>
              <Button 
                type="submit" 
                disabled={loading || !!passwordError || !!confirmPasswordError} 
                variant="surface" 
                color="indigo"
              >
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </Form.Submit>
          </Flex>
        </Form.Root>
      </Card>
    </Box>
  )

}
