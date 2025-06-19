import React from 'react';
import SignUpForm from "@/components/auth/SignUpForm";
import { signup } from "./action";
import { Card, Heading, Text, Section, Flex, Box, Separator } from '@radix-ui/themes';
import { StarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <Section className="w-full min-h-screen relative overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-background) 100%)' 
        }} 
      />
      
      {/* Decorative Stars */}
      <div className="absolute inset-0 opacity-20">
        <StarIcon className="absolute top-20 left-10 w-4 h-4 text-accent animate-pulse" />
        <StarIcon className="absolute top-40 right-20 w-3 h-3 text-accent animate-pulse" style={{ animationDelay: '1s' }} />
        <StarIcon className="absolute bottom-40 left-1/4 w-5 h-5 text-accent animate-pulse" style={{ animationDelay: '2s' }} />
        <StarIcon className="absolute bottom-32 right-1/3 w-3 h-3 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Content */}
      <Flex 
        align="center" 
        justify="center" 
        className="relative z-10 min-h-screen p-4"
      >
        <Card 
          className="w-full max-w-md shadow-2xl"
          style={{ 
            background: 'var(--color-card)', 
            border: '1px solid var(--color-border)',
            borderRadius: '16px'
          }}
        >
          <Box p="6">
            {/* Header */}
            <Flex direction="column" align="center" mb="6">
              <Image 
                src="/logo.svg" 
                alt="Mystical Realms Logo" 
                width={48} 
                height={48}
                className="w-12 h-12 mb-4"
                style={{ filter: 'brightness(0) saturate(100%) invert(60%) sepia(85%) saturate(1000%) hue-rotate(260deg) brightness(1.2) contrast(1.1)' }}
              />
              <Heading 
                size="6" 
                className="font-cinzel font-bold mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                Begin Your Journey
              </Heading>
              <Text 
                size="3" 
                className="text-center opacity-80"
                style={{ color: 'var(--color-text)' }}
              >
                Create your account and unlock the mysteries
              </Text>
            </Flex>
            
            <Separator size="4" mb="6" />
            
            {/* Sign Up Form */}
            <SignUpForm onSubmit={signup} />
            
            <Separator size="4" my="6" />
            
            {/* Additional Links */}
            <Flex direction="column" gap="3" align="center">
              <Text size="2" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                Already have an account?{' '}
                <Link 
                  href="/signin" 
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Sign in here
                </Link>
              </Text>
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Section>
  );
}
