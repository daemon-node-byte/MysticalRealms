import React from 'react';
import { Card, Button, Section, Flex, Heading, Text, Box, Grid } from '@radix-ui/themes';
import { ChatBubbleIcon, HeartIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const community = [
  {
    entry: 'Pulled The Star today—feeling hopeful and inspired! ✨',
    user: 'Luna_Mystic',
    likes: 12,
    replies: 3,
  },
  {
    entry: 'My birth chart reading was so accurate, it gave me chills. The Saturn return insights were life-changing!',
    user: 'StarSeer89',
    likes: 8,
    replies: 5,
  },
  {
    entry: 'Just shared my first 3D tarot spread—this platform is incredible! The Celtic Cross has never felt so immersive.',
    user: 'MysticJourney',
    likes: 15,
    replies: 7,
  },
];

export const CommunityPreview: React.FC = () => (
  <Section
    className="w-full py-20"
    style={{
      background: 'linear-gradient(to bottom, var(--color-background), var(--color-primary))',
    }}
  >
    <Box className="max-w-6xl mx-auto px-4">
      <Flex direction="column" align="center" mb="12">
        <Heading 
          size="8" 
          className="font-cinzel font-bold mb-4 text-center"
          style={{ color: 'var(--color-accent)' }}
        >
          Community Wisdom
        </Heading>
        <Text 
          size="4" 
          className="text-center max-w-2xl opacity-90"
          style={{ color: 'var(--color-text)' }}
        >
          Connect with fellow seekers, share insights, and learn from the collective wisdom of our mystical community
        </Text>
      </Flex>
      
      <Grid columns={{ initial: '1', md: '3' }} gap="6" mb="12">
        {community.map((post, i) => (
          <Card
            key={i}
            className="group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px'
            }}
          >
            <Box p="6">
              <Flex direction="column" gap="4">
                {/* User Info */}
                <Flex align="center" gap="2">
                  <PersonIcon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                  <Text 
                    size="2" 
                    className="font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {post.user}
                  </Text>
                </Flex>
                
                {/* Post Content */}
                <Text
                  size="3"
                  className="leading-relaxed"
                  style={{ color: 'var(--color-text)', opacity: 0.9 }}
                >
                  {post.entry}
                </Text>
                
                {/* Engagement */}
                <Flex justify="between" align="center" pt="2">
                  <Flex align="center" gap="4">
                    <Flex align="center" gap="1">
                      <HeartIcon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      <Text size="1" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                        {post.likes}
                      </Text>
                    </Flex>
                    <Flex align="center" gap="1">
                      <ChatBubbleIcon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      <Text size="1" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                        {post.replies}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Card>
        ))}
      </Grid>
      
      <Flex justify="center">
        <Button
          asChild
          size="4"
          className="font-semibold transition-all hover:shadow-lg transform hover:scale-105"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-primary)',
            border: 'none'
          }}
        >
          <Link href="/community">Join the Conversation</Link>
        </Button>
      </Flex>
    </Box>
  </Section>
);
