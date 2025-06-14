import React from "react";
import Link from "next/link";
import { Flex, Box, Text, Button } from "@radix-ui/themes";

const navLinks = [
  { href: "/", label: "Home" },
  // Add more navigation links here as needed
];

export default function Header() {
  return (
    <Box px="4" py="3" style={{ borderBottom: "1px solid var(--gray-6)", width: "100%" }}>
      <Flex align="center" justify="between">
        <Flex align="center" gap="4">
          <Text as="span" size="5" weight="bold">
            Mystical Realms
          </Text>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <Button variant="ghost" asChild>
                <a>{link.label}</a>
              </Button>
            </Link>
          ))}
        </Flex>
        <Flex align="center" gap="2">
          <Link href="/login" passHref legacyBehavior>
            <Button variant="soft" asChild>
              <a>Login</a>
            </Button>
          </Link>
          <Link href="/register" passHref legacyBehavior>
            <Button variant="solid" color="indigo" asChild>
              <a>Register</a>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
