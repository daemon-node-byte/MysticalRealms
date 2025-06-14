'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import { Form } from 'radix-ui';

// ...
 export default function ProfileForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
        alert('Error loading user data!')
        console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
        alert('Error updating the data!')
        console.error('Error updating the profile:', error)
    } finally {
      setLoading(false)
    }
  }

    return (
        <div>
            <Form.Root>
                <Form.Field name='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control asChild>
                        <input type="email" value={user?.email} disabled />
                    </Form.Control>
                </Form.Field>
                <Form.Field name='fullName'>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            value={fullname || ''}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="text"
                            value={username || ''}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name='website'>
                    <Form.Label>Website</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="url"
                            value={website || ''}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Field name='avatar_url'>
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control asChild>
                        <input
                            type="url"
                            value={avatar_url || ''}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                        />
                    </Form.Control>
                </Form.Field>
                <Form.Submit
                    className="button primary block"
                    onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </Form.Submit>
            </Form.Root>
            <Form.Root>
                <Form.Submit
                    className="button secondary block"
                    onClick={() => supabase.auth.signOut()}
                >
                    Sign Out
                </Form.Submit>
            </Form.Root>
            </div>
  )
 }

