"use client";

import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/types";

interface PostDetailClientProps {
  post: IPost;
  paragraphs: string[];
}

function calculateReadTime(content: string = ""): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

function getInitials(name: string = ""): string {
  if (!name.trim()) return "?";
  return name.trim().slice(0, 2).toUpperCase();
}

export default function PostDetailClient({ post, paragraphs }: PostDetailClientProps) {
  const authorName = post.author?.name || "Anonymous Author";
  const authorInitials = getInitials(authorName);
  
  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="mx-auto max-w-[680px] px-6 py-12">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-light no-underline transition-colors duration-150 hover:text-ink"
      >
        ← Back to stories
      </Link>

      {/* Meta row */}
      <div className="mt-8 mb-3 flex items-center gap-2 text-[13px] font-medium tracking-[0.02em]">
        <span className="rounded-md bg-surface-alt px-2 py-[2px] text-accent-warm">
          Story
        </span>
        {formattedDate && <span className="text-ink-light">{formattedDate}</span>}
        <span className="text-ink-light">· {calculateReadTime(post.content)}</span>
      </div>

      {/* Title */}
      <h1 className="font-serif text-[32px] font-bold leading-[1.2] -tracking-[0.5px] text-ink sm:text-[42px] mb-6">
        {post.title}
      </h1>

      {/* Author Info */}
      <div className="mb-10 flex items-center gap-3 border-b border-border pb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-alt font-sans text-[14px] font-semibold text-ink-mid border border-border">
          {authorInitials}
        </div>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-ink">{authorName}</div>
          <div className="text-[12px] text-ink-light">
            Writer at WriteNest
          </div>
        </div>
      </div>

      {/* Cover Image Wrapper using Next.js Optimizations */}
      <div className="relative mb-10 flex aspect-[16/9] w-full items-center justify-center rounded-[14px] bg-surface-alt overflow-hidden border border-border">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-w-[680px]) 100vw, 680px"
          />
        ) : (
          <span className="text-[72px] select-none">📝</span>
        )}
      </div>

      {/* Body Content */}
      <article className="font-serif text-[17px] leading-[1.85] text-ink space-y-6">
        {paragraphs.map((para, i) => (
          <p key={i} className="first-of-type:text-[18px]">
            {para.replace(/[#*`_>]/g, "")}
          </p>
        ))}
      </article>

      {/* Footer */}
      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-alt font-sans text-[15px] font-semibold text-ink-mid border border-border">
            {authorInitials}
          </div>
          <div>
            <div className="text-[14px] font-medium text-ink">{authorName}</div>
            <div className="text-[12px] text-ink-light">Writer at WriteNest</div>
          </div>
        </div>
      </footer>
    </div>
  );
}