"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData): Promise<Error | void> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    redirect(`/signup?${params.toString()}`);
  }

  // If user signup was successful, create a minimal profile
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      username: null, // Will be filled during profile setup
      bio: null,
      status: null
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Don't fail signup if profile creation fails, user can complete later
    }
  }

  // Redirect new users to profile setup instead of home
  revalidatePath("/", "layout");
  redirect("/profile/setup");
}
