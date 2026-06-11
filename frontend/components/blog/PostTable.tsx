"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IPost } from "@/types";

// ── 1. POST TABLE LIST COMPONENT ──
interface PostTableProps {
  filteredPosts: IPost[];
  onEdit: (post: IPost) => void;
  onDeleteTarget: (id: string) => void;
}

export function PostTable({ filteredPosts, onEdit, onDeleteTarget }: PostTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-surface">
      <div className="grid grid-cols-[1fr_120px_130px] border-b border-border bg-surface-alt px-5 py-3 text-[11px] font-medium uppercase tracking-[0.05em] text-ink-light">
        <span>Title</span>
        <span>Author</span>
        <span className="text-right">Actions</span>
      </div>

      {filteredPosts.map((p) => (
        <div 
          className="grid grid-cols-[1fr_120px_130px] items-center border-b border-border last:border-b-0 px-5 py-4 transition-colors duration-150 hover:bg-surface-alt/40" 
          key={p._id}
        >
          {/* Title and Date info */}
          <div className="pr-4">
            <h4 className="font-serif text-[15px] font-medium leading-[1.35] text-ink mb-1">{p.title}</h4>
            <span className="block text-[11px] text-ink-light">
              {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          {/* Real Author Display */}
          <div className="text-[13px] text-ink-mid overflow-hidden text-ellipsis whitespace-nowrap" title={p.author?.email}>
            {p.author?.name || "Unknown"}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-1">
            <Link
              href={`/blogs/${p._id}`}
              target="_blank"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-transparent text-[14px] text-ink-light no-underline transition-all duration-150 hover:bg-surface-alt hover:text-ink"
              title="View live"
            >
              ↗
            </Link>
            <button
              className="inline-flex h-8 px-3.5 cursor-pointer items-center justify-center rounded-md bg-transparent text-[13px] font-medium text-ink-mid transition-all duration-150 hover:bg-surface-alt hover:text-ink"
              onClick={() => onEdit(p)}
              title="Edit"
            >
              Edit
            </button>
            <button
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-transparent text-[14px] text-ink-light transition-all duration-150 hover:bg-danger/10 hover:text-danger"
              onClick={() => onDeleteTarget(p._id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}