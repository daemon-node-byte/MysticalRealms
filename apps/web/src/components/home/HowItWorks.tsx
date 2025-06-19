import React from 'react';
import { Card, Text, Heading, Section, Grid, Flex, Box, Badge } from '@radix-ui/themes';

const steps = [
  {
    step: 1,
    label: 'Sign Up',
    desc: 'Create your free account to unlock the mystical realms and begin your spiritual journey.'
  },
  {
    step: 2,
    label: 'Choose a Service',
    desc: 'Pick from Tarot readings, Astrology charts, or Dice divination to explore your path.'
  },
  {
    step: 3,
    label: 'Receive Insight',
    desc: 'Get personalized, AI-powered guidance and cosmic wisdom tailored to your unique journey.'
  }
];

export const HowItWorks: React.FC = () => (
  <Section 
    className="w-full py-20" 
    style={{ 
      background: 'linear-gradient(to bottom, var(--color-background), var(--color-primary))' 
    }}
  >
    <Box className="max-w-6xl mx-auto px-4">
      <Flex direction="column" align="center" mb="12">
        <Heading 
          size="8" 
          className="font-cinzel font-bold mb-4 text-center"
          style={{ color: 'var(--color-accent)' }}
        >
          How It Works
        </Heading>
        <Text 
          size="4" 
          className="text-center max-w-2xl opacity-90"
          style={{ color: 'var(--color-text)' }}
        >
          Your journey to mystical wisdom begins with just a few simple steps
        </Text>
      </Flex>
      
      <Grid columns={{ initial: '1', md: '3' }} gap="6">
        {steps.map((step, index) => (
          <Card
            key={step.step}
            className="relative group transition-all duration-300 hover:scale-105"
            style={{ 
              background: 'var(--color-card)', 
              border: '1px solid var(--color-border)',
              borderRadius: '16px'
            }}
          >
            <Box p="6">
              <Flex direction="column" align="center" gap="4">
                <Badge 
                  size="3"
                  className="font-bold text-xl w-12 h-12 flex items-center justify-center rounded-full"
                  style={{ 
                    background: 'var(--color-accent)', 
                    color: 'var(--color-primary)',
                    border: 'none'
                  }}
                >
                  {step.step}
                </Badge>
                
                <Heading 
                  size="5" 
                  className="font-cinzel font-bold text-center"
                  style={{ color: 'var(--color-text)' }}
                >
                  {step.label}
                </Heading>
                
                <Text 
                  size="3" 
                  className="text-center leading-relaxed"
                  style={{ color: 'var(--color-text)', opacity: 0.8 }}
                >
                  {step.desc}
                </Text>
              </Flex>
              
              {/* Connector line for larger screens */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 transform -translate-y-1/2"
                  style={{ background: 'var(--color-accent)', opacity: 0.5 }}
                />
              )}
            </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  </Section>
);
