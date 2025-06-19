import React from 'react';
import { Card, Text, Heading, Section, Grid, Flex, Box, Quote } from '@radix-ui/themes';
import { StarIcon } from '@radix-ui/react-icons';

const testimonials = [
  {
    quote: 'Mystical Realms gave me the most insightful tarot reading I&apos;ve ever had. The 3D spreads are magical!',
    name: 'Ava L.',
    rating: 5,
  },
  {
    quote: 'The astrology charts are spot on and the interface is stunning. I love the community journal!',
    name: 'Leo S.',
    rating: 5,
  },
  {
    quote: 'Dice divination is so fun and surprisingly accurate. Highly recommend for anyone curious about the mystical arts.',
    name: 'Maya R.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => (
  <Section className="w-full py-20" style={{ background: 'var(--color-secondary)' }}>
    <Box className="max-w-6xl mx-auto px-4">
      <Flex direction="column" align="center" mb="12">
        <Heading 
          size="8" 
          className="font-cinzel font-bold mb-4 text-center"
          style={{ color: 'var(--color-accent)' }}
        >
          What Our Mystics Say
        </Heading>
        <Text 
          size="4" 
          className="text-center max-w-2xl opacity-90"
          style={{ color: 'var(--color-text)' }}
        >
          Join thousands of seekers who have discovered their path through our platform
        </Text>
      </Flex>
      
      <Grid columns={{ initial: '1', md: '3' }} gap="6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ 
              background: 'var(--color-card)', 
              border: '1px solid var(--color-border)',
              borderRadius: '16px'
            }}
          >
            <Box p="6">
              <Flex direction="column" gap="4">
                {/* Rating Stars */}
                <Flex gap="1" justify="center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className="w-4 h-4" 
                      style={{ color: 'var(--color-accent)' }} 
                    />
                  ))}
                </Flex>
                
                {/* Quote */}
                <Box className="text-center">
                  <Quote>
                    <Text 
                      size="3" 
                      className="italic leading-relaxed"
                      style={{ color: 'var(--color-text)', opacity: 0.9 }}
                    >
                      {testimonial.quote}
                    </Text>
                  </Quote>
                </Box>
                
                {/* Author */}
                <Flex justify="center" mt="4">
                  <Text 
                    size="3" 
                    className="font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    — {testimonial.name}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  </Section>
);
