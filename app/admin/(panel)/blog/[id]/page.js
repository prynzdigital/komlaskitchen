import { notFound } from "next/navigation";
import { requirePageUser } from "@/lib/auth";
import { loadPosts } from "@/lib/adminData";
import PostEditor from "@/components/admin/PostEditor";

export const metadata = { title: "Edit post" };

export default async function PostAdmin({ params }) {
  await requirePageUser("content");
  const { id } = await params;
  const posts = await loadPosts();
  const post = id === "new" ? null : posts.find((p) => p.id === id);
  if (id !== "new" && !post) notFound();
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  return <PostEditor post={post} categories={categories} />;
}
