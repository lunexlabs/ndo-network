import { createClient } from "@/src/lib/supabase/client";

export async function uploadAvatar(file: File, userId: string) {
  const supabase = createClient();

  const filePath = `users/${userId}/avatar.jpg`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) {
    console.error("Avatar upload error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}