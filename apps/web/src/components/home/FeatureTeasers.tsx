import React from 'react';
import { Card, Text, Button, Heading, Section, Grid, Flex, Box } from '@radix-ui/themes';
import { StarIcon, RocketIcon, MagicWandIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const features = [
  {
    icon: <MagicWandIcon className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />,
    title: 'Tarot Readings',
    desc: 'Draw cards, explore spreads, and receive mystical insights with our interactive Tarot engine.',
    link: '/tarot',
  },
  {
    icon: <StarIcon className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />,
    title: 'Astrology Charts',
    desc: 'Generate birth charts, transits, and discover your cosmic blueprint with AI-powered astrology.',
    link: '/astrology',
  },
  {
    icon: <RocketIcon className="w-12 h-12" style={{ color: 'var(--color-accent)' }} />,
    title: 'Dice Divinations',
    desc: 'Roll the mystical dice and let fate reveal your path in a playful, magical way.',
    link: '/dice',
  },
];

export const FeatureTeasers: React.FC = () => (
  <Section className="w-full py-20" style={{ background: 'var(--color-primary)' }}>
    <Box className="max-w-6xl mx-auto px-4">
      <Flex direction="column" align="center" mb="12">
        <Heading 
          size="8" 
          className="font-cinzel font-bold mb-4 text-center"
          style={{ color: 'var(--color-text)' }}
        >
          Discover Your Path
        </Heading>
        <Text 
          size="4" 
          className="text-center max-w-2xl opacity-90"
          style={{ color: 'var(--color-text)' }}
        >
          Explore ancient wisdom through modern technology. Choose your mystical journey.
        </Text>
      </Flex>
      
      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ 
              background: 'var(--color-card)', 
              border: '1px solid var(--color-border)',
              borderRadius: '12px'
            }}
          >
            <Flex direction="column" align="center" p="6" gap="4">
              <Box className="mb-2 transition-transform group-hover:scale-110">
                {feature.icon}
              </Box>
              
              <Heading 
                size="5" 
                className="font-cinzel font-bold text-center"
                style={{ color: 'var(--color-text)' }}
              >
                {feature.title}
              </Heading>
              
              <Text 
                size="3" 
                className="text-center leading-relaxed"
                style={{ color: 'var(--color-text)', opacity: 0.8 }}
              >
                {feature.desc}
              </Text>
              
              <Button 
                asChild 
                size="3"
                className="mt-4 font-semibold transition-all hover:shadow-lg"
                style={{ 
                  background: 'var(--color-accent)', 
                  color: 'var(--color-primary)',
                  border: 'none'
                }}
              >
                <Link href={feature.link}>Explore</Link>
              </Button>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Box>
  </Section>
);
