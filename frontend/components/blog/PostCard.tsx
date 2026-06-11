import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/types";

interface PostCardProps {
  post: IPost;
  calculateReadTime: (content?: string) => string;
  getInitials: (name?: string) => string;
}

export default function PostCard({ post, calculateReadTime, getInitials }: PostCardProps) {

  const cleanSnippet = post.content?.replace(/[#*`_>]/g, "") || "";
  
  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "";

  return (
    <Link
      href={`/blogs/${post._id}`}
      className="group overflow-hidden rounded-[14px] border border-border bg-surface no-underline text-inherit transition-all duration-200 hover:-translate-y-[2px] hover:border-border-dark hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      {/* Card Image Header */}
      <div className="relative flex h-[180px] items-center justify-center bg-surface-alt text-[40px]">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-w-768px) 100vw, 33vw"
          />
        ) : (
          <span>📝</span>
        )}
      </div>

      {/* Card Body Content */}
      <div className="p-5">
        <span className="mb-[10px] inline-block rounded-sm bg-tag px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.08em] text-tag-text">
          Story
        </span>
        
        <h3 className="mb-2 line-clamp-2 font-serif text-[17px] font-medium leading-[1.35] -tracking-[0.2px] text-ink">
          {post.title}
        </h3>
        
        {cleanSnippet && (
          <p className="mb-4 line-clamp-2 text-[13px] leading-[1.6] text-ink-mid">
            {cleanSnippet}
          </p>
        )}

        {/* Footer Meta Row */}
        <div className="mt-1 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-[11px] font-medium text-ink-mid">
              {getInitials(post.author?.name)}
            </div>
            <div className="text-[12px] text-ink-mid overflow-hidden text-ellipsis whitespace-nowrap max-w-[110px]">
              {post.author?.name || "Anonymous"}
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-0.5 text-[11px] text-ink-light shrink-0">
            <span>{calculateReadTime(post.content)}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}