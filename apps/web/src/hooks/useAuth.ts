"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

interface Profile {
  id: string;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  status: string | null;
  badges: string[] | null;
  created_at: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;
    let fetchId = 0;

    // Get initial session
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      setUser(user);

      if (user) {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (isMounted) {
          setProfile(profileData);
        }
      } else {
        if (isMounted) {
          setProfile(null);
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    getUser();

    // Listen for auth state changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      fetchId += 1;
      const currentFetchId = fetchId;

      if (currentUser) {
        // Fetch user profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        // Only update if this is the latest fetch and component is still mounted
        if (currentFetchId === fetchId && isMounted) {
          setProfile(profileData);
        }
      } else {
        if (isMounted) {
          setProfile(null);
        }
      }

      // Only update loading if this is the latest fetch and component is still mounted
      if (currentFetchId === fetchId && isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    profile,
    loading,
    signOut,
    isAuthenticated: !!user
  };
}
