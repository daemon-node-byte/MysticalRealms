'use client';

import { useState } from "react";
import { Button, TextField, Flex, Card, Box } from "@radix-ui/themes";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Form } from 'radix-ui'


type Props = { onSubmit: (data: FormData) => void;};

export default function SignUpForm({ onSubmit }: Props) {
  const [password, setPassword] = useState("");
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
        <Form.Root onSubmit={handleSubmit} aria-label="Sign up form">
          <Flex direction="column" gap="3">
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
                <TextField.Root type="password" required size="2" variant="surface" radius="large" placeholder="Enter your password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$" min="6" value={password} onChange={(e) => setPassword(e.target.value)}>
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
                <Form.Message match="valueMissing">Please a password</Form.Message>
                <Form.Message match="tooShort">Password must be at least 6 characters</Form.Message>
                <Form.Message match="patternMismatch">Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character.</Form.Message>
            </Form.Field>
            <Form.Field name="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control asChild>
                <TextField.Root type="password" required size="2" variant="surface" radius="large" placeholder="Confirm your password" pattern={password}>
                  <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Form.Control>
                <Form.Message match="valueMissing">Please confirm your password</Form.Message>
                <Form.Message match="patternMismatch">Passwords do not match</Form.Message>
            </Form.Field>
            <Form.Submit asChild>
              <Button type="submit" disabled={loading} variant="surface" color="indigo">
                {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </Form.Submit>
          </Flex>
        </Form.Root>
      </Card>
    </Box>
  )

}
