// app/blogs/[id]/page.tsx
import { notFound } from "next/navigation";
import { IPost } from "@/types";
import { postService } from "@/services/post.service";
import PostDetailClient from "@/components/blog/PostDetailClient";

async function getPostByIdOrSlug(id: string): Promise<IPost | null> {
  try {
    const res = await postService.getById(id);
    return res.data || res || null;
  } catch (error) {
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostByIdOrSlug(id);
  if (!post) return {};
  
  return {
    title: `${post.title} — WriteNest`,
    description: post.content ? post.content.slice(0, 150) : "Read this story on WriteNest",
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostByIdOrSlug(id);

  if (!post) notFound();

  // Split content text cleanly into distinct elements by paragraphs 
  const paragraphs = (post.content || "")
    .split("\n\n")
    .filter(Boolean);

  return (
    <PostDetailClient 
      post={post} 
      paragraphs={paragraphs} 
    />
  );
}