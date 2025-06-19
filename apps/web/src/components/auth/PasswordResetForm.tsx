'use client';

import { useState } from "react";
import { Button, TextField, Flex, Card, Box } from "@radix-ui/themes";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Form } from 'radix-ui';

type Props = { onSubmit: (data: FormData) => void };

export default function PasswordResetForm({ onSubmit }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData: FormData = new FormData(e.currentTarget);
      await onSubmit(formData);
    } catch (error) {
      // Error handling - onSubmit prop should handle errors
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="400px">
      <Card size="2">
        <Form.Root onSubmit={handleSubmit} aria-label="Password reset form">
          <Flex direction="column" gap="3">
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
