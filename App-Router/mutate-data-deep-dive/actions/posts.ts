"use server";
import { redirect } from "next/navigation";
import { storePost, updatePostLikeStatus } from "../lib/posts";
import { State } from "@/app/new-post/page";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function createPost(prevState: State, formData: FormData) {
  const title = formData.get("title")?.toString();
  const image = formData.get("image") as File;
  const content = formData.get("content")?.toString();

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  title &&
    content &&
    (await storePost({
      imageUrl: imageUrl,
      title,
      content,
      userId: 1,
    }));
  revalidatePath("/", "layout");
  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath("/", "layout");
}
