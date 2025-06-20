'use client';

import { 
  Card, 
  Heading, 
  Text, 
  Button, 
  Flex, 
  Box,
  Progress,
  Badge
} from '@radix-ui/themes';
import { 
  PersonIcon, 
  ArrowRightIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { formatFieldName } from '@/utils/profile';
import { Profile } from '@/types/profile';

interface ProfileCompletionBannerProps {
  profile: Profile | null;
}

export function ProfileCompletionBanner({ profile }: ProfileCompletionBannerProps) {
  const completion = useProfileCompletion(profile);

  // Don't show banner if profile is complete
  if (completion.isComplete) {
    return null;
  }

  return (
    <Card 
      style={{ 
        background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-secondary) 100%)',
        border: '1px solid var(--color-accent)',
        marginBottom: '1.5rem'
      }}
    >
      <Box p="4">
        <Flex align="center" justify="between" gap="4">
          <Flex align="center" gap="3" style={{ flex: 1 }}>
            <PersonIcon className="w-6 h-6" style={{ color: 'white' }} />
            <Box style={{ flex: 1 }}>
              <Heading size="4" style={{ color: 'white', marginBottom: '0.5rem' }}>
                Complete Your Mystical Profile
              </Heading>
              <Text size="2" style={{ color: 'white', opacity: 0.9, marginBottom: '0.75rem' }}>
                Unlock the full potential of your mystical journey by completing your profile
              </Text>
              
              {/* Progress Bar */}
              <Box mb="2">
                <Flex align="center" justify="between" mb="1">
                  <Text size="1" style={{ color: 'white', opacity: 0.8 }}>
                    Progress
                  </Text>
                  <Badge 
                    size="1" 
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {completion.completionPercentage}%
                  </Badge>
                </Flex>
                <Progress 
                  value={completion.completionPercentage} 
                  size="2"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                  }}
                />
              </Box>

              {/* Missing Fields */}
              {completion.missingFields.length > 0 && (
                <Flex align="center" gap="2" wrap="wrap">
                  <InfoCircledIcon className="w-3 h-3" style={{ color: 'white', opacity: 0.8 }} />
                  <Text size="1" style={{ color: 'white', opacity: 0.8 }}>
                    Missing: {completion.missingFields.map(formatFieldName).join(', ')}
                  </Text>
                </Flex>
              )}
            </Box>
          </Flex>

          <Button asChild size="3" style={{ background: 'white', color: 'var(--color-primary)' }}>
            <Link href="/profile/setup">
              Complete Profile
              <ArrowRightIcon />
            </Link>
          </Button>
        </Flex>
      </Box>
    </Card>
  );
}
