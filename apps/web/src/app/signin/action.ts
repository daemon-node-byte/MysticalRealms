"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    redirect(`/signin?${params.toString()}`);
  }

  // Check if user has completed their profile
  if (authData.user) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, bio, status")
      .eq("id", authData.user.id)
      .single();

    // If profile doesn't exist or is incomplete, redirect to profile setup
    if (
      profileError ||
      !profile ||
      !profile.username ||
      !profile.bio ||
      !profile.status
    ) {
      revalidatePath("/", "layout");
      redirect("/profile/setup");
    }
  }

  // Profile is complete, redirect to dashboard
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  // Get the intended redirect path, default to "/"
  const redirectTo = (formData.get("redirectTo") as string) || "/";

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    redirect(`/signup?${params.toString()}`);
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}
