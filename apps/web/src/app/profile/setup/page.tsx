'use client';

import { useState } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import { ProfileCompletionForm } from '@/components/profile/ProfileCompletionForm';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ProfileFormData } from '@/types/profile';
import { useRouter } from 'next/navigation';
import {
  Heading,
  Text,
  Box,
  Flex,
  Separator,
  Callout
} from '@radix-ui/themes';
import {
  PersonIcon,
  CheckIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

function ProfileSetupContent() {
  const { profile, user, loading } = useAuth();
  const completion = useProfileCompletion(profile);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const supabase = createClient();

  console.log('ProfileSetupContent render:', { profile, user: !!user, loading });

  const handleSave = async (formData: ProfileFormData) => {
    if (!user) return;

    setFormLoading(true);
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

      setMessage({ type: 'success', text: 'Profile completed successfully!' });
      
      // Redirect to dashboard after successful completion
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to update profile' 
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  // Show loading state while auth is resolving
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div>Loading profile setup...</div>
          <div className="text-sm text-gray-500">
            Auth: {loading ? 'loading' : 'loaded'},
            User: {user ? 'authenticated' : 'not authenticated'},
            Profile: {profile ? 'loaded' : 'loading'}
          </div>
        </div>
      </div>
    );
  }

  // If profile is already complete, redirect to dashboard
  if (profile && completion.isComplete) {
    router.push('/dashboard');
    return null;
  }

  // If no profile and not loading, show message
  if (!profile && !loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Text>Profile not found. This may indicate a data issue. Please try signing out and back in.</Text>
      </div>
    );
  }

  // If still loading or profile exists but not complete, show the form
  if (loading || !profile) {
    return null; // Let the loading state above handle this
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <Box mb="6">
        <Flex align="center" gap="3" mb="2">
          <PersonIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
          <Heading size="8" style={{ color: 'var(--color-text)' }}>
            Complete Your Profile
          </Heading>
        </Flex>
        <Text size="4" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
          Welcome to Mystical Realms! Let&apos;s set up your profile to unlock all features.
        </Text>
      </Box>

      <Separator size="4" mb="6" />

      {/* Welcome Message */}
      <Box mb="6">
        <Callout.Root color="blue">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Complete your profile to access all features including personalized tarot readings, 
            astrology charts, and your mystical journal. This will only take a minute!
          </Callout.Text>
        </Callout.Root>
      </Box>

      {/* Success Message */}
      {message && (
        <Box mb="4">
          <Callout.Root color={message.type === 'success' ? 'green' : 'red'}>
            <Callout.Icon>
              {message.type === 'success' ? <CheckIcon /> : <InfoCircledIcon />}
            </Callout.Icon>
            <Callout.Text>{message.text}</Callout.Text>
          </Callout.Root>
        </Box>
      )}

      {/* Profile Completion Form */}
      <ProfileCompletionForm
        profile={profile}
        onSave={handleSave}
        loading={formLoading}
        onCancel={handleCancel}
        showCancelButton={true}
      />
    </div>
  );
}

export default function ProfileSetupPage() {
  return (
    <AuthGuard>
      <ProfileSetupContent />
    </AuthGuard>
  );
}
