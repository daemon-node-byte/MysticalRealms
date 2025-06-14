import React from 'react';
import { Form } from 'radix-ui'

const SignupForm = () => {
    return (
        <Form.Root>

            <Form.Field name="email" >
                <Form.Label>Email</Form.Label>
                <Form.Message>Please enter your email.</Form.Message>
                <Form.Control asChild>
                    <input type="email" required />
                </Form.Control>
            </Form.Field>

            <Form.Field name="password">
                <Form.Label>Password</Form.Label>
                <Form.Message>Please enter your password.</Form.Message>
            <Form.Control asChild>
                    <input type="password" required />
                </Form.Control>
            </Form.Field>
            <Form.Submit>Signup</Form.Submit>
        </Form.Root>
    )
}

export default SignupForm;