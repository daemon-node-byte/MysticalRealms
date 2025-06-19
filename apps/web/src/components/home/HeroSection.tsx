import React from 'react';
import { Button, Text, Heading, Section, Flex } from '@radix-ui/themes';
import { MagicWandIcon, StarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export const HeroSection: React.FC = () => (
  <Section className="w-full min-h-[70vh] relative overflow-hidden">
    {/* Gradient Background */}
    <div 
      className="absolute inset-0" 
      style={{ 
        background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-background) 100%)' 
      }} 
    />
    
    {/* Decorative Stars */}
    <div className="absolute inset-0 opacity-30">
      <StarIcon className="absolute top-20 left-10 w-4 h-4 text-accent animate-pulse" />
      <StarIcon className="absolute top-32 right-20 w-3 h-3 text-accent animate-pulse" style={{ animationDelay: '1s' }} />
      <StarIcon className="absolute bottom-40 left-1/4 w-5 h-5 text-accent animate-pulse" style={{ animationDelay: '2s' }} />
      <StarIcon className="absolute bottom-32 right-1/3 w-3 h-3 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
    
    {/* Content */}
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      className="relative z-10 h-full min-h-[70vh] text-center px-4 py-16"
    >
      <Flex align="center" gap="4" mb="6" className="opacity-90">
        <MagicWandIcon className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: 'var(--color-accent)' }} />
        <Heading 
          size="9" 
          className="font-cinzel font-bold tracking-tight drop-shadow-lg"
          style={{ color: 'var(--color-text)' }}
        >
          Mystical Realms
        </Heading>
      </Flex>
      
      <Text 
        size="6" 
        className="max-w-3xl mx-auto mb-8 font-medium leading-relaxed"
        style={{ color: 'var(--color-accent)' }}
      >
        Explore Tarot, Astrology & More
      </Text>
      
      <Text 
        size="4" 
        className="max-w-2xl mx-auto mb-12 leading-relaxed opacity-90"
        style={{ color: 'var(--color-text)' }}
      >
        AI-powered readings, interactive 3D spreads, and a mystical journey await you. 
        Discover your cosmic blueprint and unlock the secrets of the universe.
      </Text>
      
      <Flex gap="4" wrap="wrap" justify="center">
        <Button 
          size="4" 
          asChild
          className="font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          style={{ 
            background: 'var(--color-accent)', 
            color: 'var(--color-primary)',
            border: 'none'
          }}
        >
          <Link href="/signup">Start Your Journey</Link>
        </Button>
        
        <Button 
          size="4" 
          variant="outline"
          asChild
          className="font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          style={{ 
            borderColor: 'var(--color-accent)', 
            color: 'var(--color-accent)',
            backgroundColor: 'transparent'
          }}
        >
          <Link href="/signin">Sign In</Link>
        </Button>
      </Flex>
    </Flex>
  </Section>
);
