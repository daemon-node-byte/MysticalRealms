'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { ProfileCompletionBanner } from '@/components/profile/ProfileCompletionBanner';
import { 
  Card, 
  Heading, 
  Text, 
  Grid, 
  Box, 
  Badge,
  Separator,
  Button,
  Flex
} from '@radix-ui/themes';
import { 
  MagicWandIcon, 
  StarIcon, 
  CalendarIcon, 
  Pencil1Icon,
  PersonIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';

// Types for Quick Actions configuration
interface QuickAction {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  title: string;
  buttonText: string;
  href: string;
}

function DashboardContent() {
  const { profile, loading } = useAuth();

  console.log('Dashboard render:', { profile, loading });

  // Show loading state while auth is resolving
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div>Loading dashboard...</div>
          <div className="text-sm text-gray-500">Profile: {profile ? 'loaded' : 'loading'}</div>
        </div>
      </div>
    );
  }

  // Quick Actions data configuration
  const quickActions: QuickAction[] = [
    {
      icon: MagicWandIcon,
      title: 'New Tarot Reading',
      buttonText: 'Draw Cards',
      href: '/tarot/new'
    },
    {
      icon: StarIcon,
      title: 'Birth Chart',
      buttonText: 'Generate',
      href: '/astrology/chart'
    },
    {
      icon: Pencil1Icon,
      title: 'Journal Entry',
      buttonText: 'Write',
      href: '/journal/new'
    },
    {
      icon: CalendarIcon,
      title: 'Calendar',
      buttonText: 'View',
      href: '/calendar'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Completion Banner */}
      <ProfileCompletionBanner profile={profile} />

      {/* Welcome Header */}
      <Box mb="6">
        <Flex align="center" gap="3" mb="2">
          <MagicWandIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
          <Heading size="8" style={{ color: 'var(--color-text)' }}>
            Welcome back{profile?.username ? `, ${profile.username}` : ''}
          </Heading>
        </Flex>
        <Text size="4" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
          Your mystical journey continues...
        </Text>
      </Box>

      <Separator size="4" mb="6" />

      {/* Quick Actions */}
      <Box mb="8">
        <Heading size="6" mb="4" style={{ color: 'var(--color-text)' }}>
          Quick Actions
        </Heading>
        <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index} 
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <Flex direction="column" align="center" gap="3" p="4">
                  <IconComponent className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                  <Text size="3" weight="bold" style={{ color: 'var(--color-text)' }}>
                    {action.title}
                  </Text>
                  <Button asChild size="2">
                    <Link href={action.href}>{action.buttonText}</Link>
                  </Button>
                </Flex>
              </Card>
            );
          })}
        </Grid>
      </Box>

      <Separator size="4" mb="6" />

      {/* Recent Activity & Profile Status */}
      <Grid columns={{ initial: '1', md: '2' }} gap="6">
        {/* Recent Activity */}
        <Box>
          <Heading size="5" mb="4" style={{ color: 'var(--color-text)' }}>
            Recent Activity
          </Heading>
          <Card style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
            <Box p="4">
              <Text size="3" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                No recent activity yet. Start your mystical journey by drawing your first Tarot cards or generating your birth chart!
              </Text>
              <Flex gap="2" mt="4">
                <Button asChild size="1" variant="soft">
                  <Link href="/tarot">Start Tarot Reading</Link>
                </Button>
                <Button asChild size="1" variant="soft">
                  <Link href="/astrology">View Astrology</Link>
                </Button>
              </Flex>
            </Box>
          </Card>
        </Box>

        {/* Profile Overview */}
        <Box>
          <Heading size="5" mb="4" style={{ color: 'var(--color-text)' }}>
            Profile Overview
          </Heading>
          <Card style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
            <Box p="4">
              <Flex align="center" gap="3" mb="3">
                <PersonIcon className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                <Text size="4" weight="bold" style={{ color: 'var(--color-text)' }}>
                  {profile?.username || 'Mystical User'}
                </Text>
              </Flex>
              
              {profile?.status && (
                <Box mb="3">
                  <Badge color="purple" size="2">
                    {profile.status}
                  </Badge>
                </Box>
              )}

              {profile?.bio && (
                <Text size="2" style={{ color: 'var(--color-text)', opacity: 0.8 }} mb="3">
                  {profile.bio}
                </Text>
              )}

              <Flex gap="2" mt="4">
                <Button asChild size="2" variant="soft">
                  <Link href="/profile">Edit Profile</Link>
                </Button>
              </Flex>
            </Box>
          </Card>
        </Box>
      </Grid>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
