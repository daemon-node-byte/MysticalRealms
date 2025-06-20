'use client';

import { useState } from "react";
import { Button, TextField, Flex, Card, Box, Text } from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Form } from 'radix-ui';

type Props = { onSubmit: (data: FormData) => void };

export default function PasswordResetForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResetError(null); // Clear previous errors
    setResetSuccess(null); // Clear previous success messages
    
    try {
      const formData: FormData = new FormData(e.currentTarget);
      await onSubmit(formData);
      setResetSuccess("Password reset link sent! Check your email.");
    } catch (error) {
      // Error handling - onSubmit prop should handle errors
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        setResetError(error.message);
      } else {
        setResetError('Password reset failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="400px">
      <Card size="2">
        <Form.Root onSubmit={handleSubmit} aria-label="Password reset form">
          <Flex direction="column" gap="3">
            {resetError && (
              <Text color="red" size="2" role="alert" data-testid="reset-error">
                {resetError}
              </Text>
            )}
            {resetSuccess && (
              <Text color="green" size="2" role="alert" data-testid="reset-success">
                {resetSuccess}
              </Text>
            )}
            <Form.Field name="email">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <TextField.Root
                  type="email"
                  required
                  size="2"
                  variant="surface"
                  radius="large"
                  placeholder="Enter your email"
                  autoComplete="email"
                >
                  <TextField.Slot>
                    <EnvelopeClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
              <Form.Message match="valueMissing">Please enter your email</Form.Message>
              <Form.Message match="typeMismatch">Please enter a valid email</Form.Message>
            </Form.Field>
            <Form.Submit asChild>
              <Button type="submit" disabled={loading} variant="surface" color="crimson">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form.Submit>
          </Flex>
        </Form.Root>
      </Card>
    </Box>
  );
}
