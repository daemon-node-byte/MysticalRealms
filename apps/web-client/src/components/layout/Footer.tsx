import React from "react";
import { Flex, Box, Text, Link as RadixLink } from "@radix-ui/themes";

export default function Footer() {
  return (
    <Box px="4" py="3" style={{ borderTop: "1px solid var(--gray-6)", width: "100%" }}>
      <Flex align="center" justify="between">
        <Text size="2" color="gray">
          © {new Date().getFullYear()} Mystical Realms. All rights reserved.
        </Text>
        <Flex gap="3">
          <RadixLink href="/" size="2" color="gray">
            Home
          </RadixLink>
          <RadixLink href="/about" size="2" color="gray">
            About
          </RadixLink>
          <RadixLink href="/contact" size="2" color="gray">
            Contact
          </RadixLink>
        </Flex>
      </Flex>
    </Box>
  );
}
