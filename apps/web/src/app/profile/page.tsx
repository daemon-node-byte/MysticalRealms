'use client';

import { useState, useEffect } from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/utils/supabase/client';
import {
  Card,
  Heading,
  Text,
  Box,
  Button,
  TextField,
  TextArea,
  Flex,
  Avatar,
  Badge,
  Separator,
  Callout
} from '@radix-ui/themes';
import {
  PersonIcon,
  Pencil1Icon,
  CheckIcon,
  Cross2Icon,
  InfoCircledIcon
} from '@radix-ui/react-icons';

interface ProfileFormData {
  username: string;
  bio: string;
  status: string;
}

function ProfileContent() {
  const { profile, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    bio: '',
    status: ''
  });

  const supabase = createClient();

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        bio: profile.bio || '',
        status: profile.status || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
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
      setIsEditing(false);
      
      // Refresh the page to get updated profile data
      window.location.reload();
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

  const handleCancel = () => {
    if (profile) {
      setFormData({
        username: profile.username || '',
        bio: profile.bio || '',
        status: profile.status || ''
      });
    }
    setIsEditing(false);
    setMessage(null);
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

      {/* Profile Card */}
      <Card style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
        <Box p="6">
          {/* Avatar Section */}
          <Flex align="center" gap="4" mb="6">
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

          <Separator size="4" mb="6" />

          {/* Profile Form */}
          <Box>
            <Flex justify="between" align="center" mb="4">
              <Heading size="5" style={{ color: 'var(--color-text)' }}>
                Profile Information
              </Heading>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} size="2">
                  <Pencil1Icon />
                  Edit Profile
                </Button>
              )}
            </Flex>

            <Box style={{ display: 'grid', gap: '1rem' }}>
              {/* Username */}
              <Box>
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }} mb="1">
                  Username
                </Text>
                {isEditing ? (
                  <TextField.Root
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Enter your username"
                  />
                ) : (
                  <Text size="3" style={{ color: 'var(--color-text)' }}>
                    {profile.username || 'No username set'}
                  </Text>
                )}
              </Box>

              {/* Status */}
              <Box>
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }} mb="1">
                  Status
                </Text>
                {isEditing ? (
                  <TextField.Root
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    placeholder="e.g., Novice, Practitioner, Master"
                  />
                ) : (
                  <Text size="3" style={{ color: 'var(--color-text)' }}>
                    {profile.status || 'No status set'}
                  </Text>
                )}
              </Box>

              {/* Bio */}
              <Box>
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }} mb="1">
                  Bio
                </Text>
                {isEditing ? (
                  <TextArea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about your spiritual journey..."
                    rows={4}
                  />
                ) : (
                  <Text size="3" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
                    {profile.bio || 'No bio added yet'}
                  </Text>
                )}
              </Box>

              {/* Account Info */}
              <Box>
                <Text size="2" weight="bold" style={{ color: 'var(--color-text)' }} mb="1">
                  Member Since
                </Text>
                <Text size="3" style={{ color: 'var(--color-text)', opacity: 0.8 }}>
                  {new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </Box>
            </Box>

            {/* Action Buttons */}
            {isEditing && (
              <Flex gap="2" justify="end" mt="6">
                <Button
                  variant="soft"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <Cross2Icon />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  loading={loading}
                >
                  <CheckIcon />
                  Save Changes
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Card>
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
