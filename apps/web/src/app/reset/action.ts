"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    const params = new URLSearchParams({ error: error.message });
    redirect(`/reset?${params.toString()}`);
  }

  revalidatePath("/", "layout");
  redirect("/reset-sent");
}
