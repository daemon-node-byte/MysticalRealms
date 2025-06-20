'use client';

import { useState } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import { ProfileCompletionForm } from '@/components/profile/ProfileCompletionForm';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ProfileFormData } from '@/types/profile';
import {
  Card,
  Heading,
  Text,
  Box,
  Flex,
  Avatar,
  Badge,
  Separator,
  Callout
} from '@radix-ui/themes';
import {
  PersonIcon,
  CheckIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

function ProfileContent() {
  const { profile, user, loading: authLoading } = useAuth();
  const completion = useProfileCompletion(profile);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  console.log('Profile render:', { profile, user: !!user, authLoading });

  // Show loading state while auth is resolving
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div>Loading profile...</div>
          <div className="text-sm text-gray-500">Auth: {authLoading ? 'loading' : 'loaded'}</div>
        </div>
      </div>
    );
  }

  const handleSave = async (formData: ProfileFormData) => {
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username || null,
          bio: formData.bio || null,
          status: formData.status || null,
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Refresh the page to get updated profile data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Text>Loading profile...</Text>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <Box mb="6">
        <Flex align="center" gap="3" mb="2">
          <PersonIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
          <Heading size="8" style={{ color: 'var(--color-text)' }}>
            Profile
          </Heading>
        </Flex>
        <Text size="4" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
          Manage your mystical identity
        </Text>
      </Box>

      <Separator size="4" mb="6" />

      {/* Messages */}
      {message && (
        <Box mb="4">
          <Callout.Root color={message.type === 'success' ? 'green' : 'red'}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{message.text}</Callout.Text>
          </Callout.Root>
        </Box>
      )}

      {/* Completion Status */}
      {completion.isComplete && (
        <Box mb="4">
          <Callout.Root color="green">
            <Callout.Icon>
              <CheckIcon />
            </Callout.Icon>
            <Callout.Text>
              Your profile is complete! You can now access all features of Mystical Realms.
            </Callout.Text>
          </Callout.Root>
        </Box>
      )}

      {/* Profile Overview Card */}
      <Card style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }} mb="6">
        <Box p="6">
          {/* Avatar Section */}
          <Flex align="center" gap="4" mb="4">
            <Avatar
              size="6"
              src={profile.avatar_url || undefined}
              fallback={profile.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              style={{ background: 'var(--color-accent)' }}
            />
            <Box>
              <Text size="5" weight="bold" style={{ color: 'var(--color-text)' }}>
                {profile.username || 'Mystical User'}
              </Text>
              <Text size="3" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                {user?.email}
              </Text>
              {profile.status && (
                <Box mt="1">
                  <Badge color="purple" size="1">
                    {profile.status}
                  </Badge>
                </Box>
              )}
            </Box>
          </Flex>

          {/* Account Info */}
          <Text size="2" style={{ color: 'var(--color-text)', opacity: 0.6 }}>
            Member since {new Date(profile.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </Box>
      </Card>

      {/* Profile Completion Form */}
      <ProfileCompletionForm
        profile={profile}
        onSave={handleSave}
        loading={loading}
        showCancelButton={false}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
