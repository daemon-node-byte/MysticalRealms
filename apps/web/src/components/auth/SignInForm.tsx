"use client";

import { useState } from "react";
import { Button, TextField, Flex, Card, Box, Text } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Form } from "radix-ui";

type Props = { onSubmit: (data: FormData) => void; };

export default function SignInForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null); // Clear previous errors
    
    try {
      const formData = new FormData(e.currentTarget);
      await onSubmit(formData);
    } catch (error) {
      // Error handling - onSubmit prop should handle errors
      console.error('Form submission error:', error);
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="400px">
      <Card size="2">
        <Form.Root onSubmit={handleSubmit} aria-label="Sign in form">
          <Flex direction="column" gap="3">
            {authError && (
              <Text color="red" size="2" role="alert" data-testid="auth-error">
                {authError}
              </Text>
            )}
            <Form.Field name="email">
              <Form.Label>Email</Form.Label>
              <Form.Control asChild>
                <TextField.Root type="email" required size="2" variant="surface" radius="large" placeholder="Enter your email" autoComplete="email">
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
                <TextField.Root type="password" required size="2" variant="surface" radius="large" placeholder="Enter your password" autoComplete="current-password">
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
              <Form.Message match="valueMissing">Please enter your password</Form.Message>
            </Form.Field>
            <Form.Submit asChild>
              <Button type="submit" disabled={loading} variant="surface" color="violet">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Form.Submit>
          </Flex>
        </Form.Root>
      </Card>
    </Box>
  );
}
