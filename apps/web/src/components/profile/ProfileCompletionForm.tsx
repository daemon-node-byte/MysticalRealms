'use client';

import { useState } from 'react';
import { 
  Card, 
  Heading, 
  Text, 
  Button, 
  TextField, 
  TextArea, 
  Flex, 
  Box,
  Callout,
  Separator,
  Badge
} from '@radix-ui/themes';
import { 
  PersonIcon,
  CheckIcon,
  Cross2Icon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons';
import { ProfileFormData, Profile } from '@/types/profile';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { formatFieldName } from '@/utils/profile';

interface ProfileCompletionFormProps {
  profile: Profile | null;
  onSave: (data: ProfileFormData) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

export function ProfileCompletionForm({ 
  profile, 
  onSave, 
  loading = false, 
  onCancel,
  showCancelButton = true 
}: ProfileCompletionFormProps) {
  const completion = useProfileCompletion(profile);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: profile?.username || '',
    bio: profile?.bio || '',
    status: profile?.status || ''
  });
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    } else if (formData.username.length > 50) {
      newErrors.username = 'Username must be less than 50 characters';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters';
    } else if (formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (!formData.status.trim()) {
      newErrors.status = 'Status is required';
    } else if (formData.status.length < 2) {
      newErrors.status = 'Status must be at least 2 characters';
    } else if (formData.status.length > 50) {
      newErrors.status = 'Status must be less than 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        bio: profile.bio || '',
        status: profile.status || ''
      });
    }
    setErrors({});
    onCancel?.();
  };

  return (
    <Card style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
      <Box p="6">
        {/* Header */}
        <Flex align="center" gap="3" mb="4">
          <PersonIcon className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
          <Box>
            <Heading size="5" style={{ color: 'var(--color-text)' }}>
              {completion.isComplete ? 'Update Profile' : 'Complete Your Profile'}
            </Heading>
            <Text size="2" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
              {completion.isComplete 
                ? 'Your profile is complete! Make any updates below.'
                : 'Fill in the required information to complete your mystical profile'
              }
            </Text>
          </Box>
        </Flex>

        {/* Completion Status */}
        {!completion.isComplete && (
          <Box mb="4">
            <Callout.Root color="orange">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>
                Profile is {completion.completionPercentage}% complete. 
                Missing: {completion.missingFields.map(formatFieldName).join(', ')}
              </Callout.Text>
            </Callout.Root>
          </Box>
        )}

        <Separator size="4" mb="4" />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Box style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Username */}
            <Box>
              <Flex align="center" gap="2" mb="2">
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }}>
                  Username *
                </Text>
                {completion.requiredFields.username && (
                  <Badge color="green" size="1">
                    <CheckIcon className="w-3 h-3" />
                    Complete
                  </Badge>
                )}
              </Flex>
              <TextField.Root
                value={formData.username}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, username: e.target.value }));
                  if (errors.username) {
                    setErrors(prev => ({ ...prev, username: undefined }));
                  }
                }}
                placeholder="Enter your mystical username"
                color={errors.username ? 'red' : undefined}
              />
              {errors.username && (
                <Text size="1" color="red" mt="1">
                  {errors.username}
                </Text>
              )}
            </Box>

            {/* Status */}
            <Box>
              <Flex align="center" gap="2" mb="2">
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }}>
                  Status *
                </Text>
                {completion.requiredFields.status && (
                  <Badge color="green" size="1">
                    <CheckIcon className="w-3 h-3" />
                    Complete
                  </Badge>
                )}
              </Flex>
              <TextField.Root
                value={formData.status}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, status: e.target.value }));
                  if (errors.status) {
                    setErrors(prev => ({ ...prev, status: undefined }));
                  }
                }}
                placeholder="e.g., Novice, Practitioner, Master, Seeker"
                color={errors.status ? 'red' : undefined}
              />
              {errors.status && (
                <Text size="1" color="red" mt="1">
                  {errors.status}
                </Text>
              )}
              <Text size="1" style={{ color: 'var(--color-text)', opacity: 0.6 }} mt="1">
                Your current level in your mystical journey
              </Text>
            </Box>

            {/* Bio */}
            <Box>
              <Flex align="center" gap="2" mb="2">
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }}>
                  Bio *
                </Text>
                {completion.requiredFields.bio && (
                  <Badge color="green" size="1">
                    <CheckIcon className="w-3 h-3" />
                    Complete
                  </Badge>
                )}
              </Flex>
              <TextArea
                value={formData.bio}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, bio: e.target.value }));
                  if (errors.bio) {
                    setErrors(prev => ({ ...prev, bio: undefined }));
                  }
                }}
                placeholder="Tell us about your spiritual journey, interests in tarot, astrology, or other mystical practices..."
                rows={4}
                color={errors.bio ? 'red' : undefined}
              />
              {errors.bio && (
                <Text size="1" color="red" mt="1">
                  {errors.bio}
                </Text>
              )}
              <Flex justify="between" mt="1">
                <Text size="1" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
                  Share your mystical interests and background
                </Text>
                <Text size="1" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
                  {formData.bio.length}/500
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Flex gap="2" justify="end" mt="6">
            {showCancelButton && (
              <Button
                type="button"
                variant="soft"
                onClick={handleCancel}
                disabled={loading}
              >
                <Cross2Icon />
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading}
              loading={loading}
            >
              <CheckIcon />
              {completion.isComplete ? 'Update Profile' : 'Complete Profile'}
            </Button>
          </Flex>
        </form>
      </Box>
    </Card>
  );
}
