import React from "react";
import Link from "next/link";
import { Flex, Box, Text, Button } from "@radix-ui/themes";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#featured", label: "Featured" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <Box px="4" py="3" style={{ borderBottom: "1px solid var(--accent)", width: "100%", background: "var(--primary)", boxShadow: "0 2px 16px 0 rgba(0,0,0,0.12)" }}>
      <Flex align="center" justify="between">
        <Flex align="center" gap="4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-heading text-[var(--accent)] drop-shadow">🔮</span>
            <Text as="span" size="5" weight="bold" className="font-heading text-[var(--text)] tracking-wide">Mystical Realms</Text>
          </Link>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <Button variant="ghost" asChild className="font-body text-[var(--text)] hover:text-[var(--accent)] hover:scale-105 transition-transform">
                <a>{link.label}</a>
              </Button>
            </Link>
          ))}
        </Flex>
        <Flex align="center" gap="2">
          <Link href="/login" passHref legacyBehavior>
            <Button variant="soft" asChild className="font-body text-[var(--accent)] border border-[var(--accent)] bg-[var(--secondary)] hover:bg-[var(--accent)] hover:text-[var(--primary)] transition-colors">
              <a>Login</a>
            </Button>
          </Link>
          <Link href="/signup" passHref legacyBehavior>
            <Button variant="solid" color="crimson" asChild className="font-body bg-[var(--accent)] text-[var(--primary)] shadow hover:scale-105 transition-transform">
              <a>Sign Up</a>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
