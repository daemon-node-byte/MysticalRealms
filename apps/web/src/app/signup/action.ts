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

  // Get the intended redirect path, default to "/"
  const redirectTo = (formData.get("redirectTo") as string) || "/";

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    redirect(`/signup?${params.toString()}`);
  }

  revalidatePath(redirectTo, "layout");
  redirect(redirectTo);
}
