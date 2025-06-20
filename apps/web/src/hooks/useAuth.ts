"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Profile } from "@/types/profile";

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
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();

        if (userError) {
          console.error("Error getting user:", userError);
        }

        if (!isMounted) return;

        setUser(user);

        if (user) {
          try {
            // Fetch user profile
            const { data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

            if (profileError) {
              console.error("Error fetching profile:", profileError);
              // If profile doesn't exist, that's ok - user just needs to complete profile
              if (profileError.code !== "PGRST116") {
                // PGRST116 is "not found"
                console.error("Unexpected profile error:", profileError);
              }
            }

            if (isMounted) {
              setProfile(profileData || null);
            }
          } catch (error) {
            console.error("Profile fetch error:", error);
            if (isMounted) {
              setProfile(null);
            }
          }
        } else {
          if (isMounted) {
            setProfile(null);
          }
        }

        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth error:", error);
        if (isMounted) {
          setLoading(false);
        }
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
        try {
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", currentUser.id)
            .single();

          if (profileError && profileError.code !== "PGRST116") {
            console.error("Profile fetch error in auth change:", profileError);
          }

          // Only update if this is the latest fetch and component is still mounted
          if (currentFetchId === fetchId && isMounted) {
            setProfile(profileData || null);
          }
        } catch (error) {
          console.error("Error fetching profile in auth change:", error);
          if (currentFetchId === fetchId && isMounted) {
            setProfile(null);
          }
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
