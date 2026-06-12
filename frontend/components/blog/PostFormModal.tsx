"use client";

import { useState, useRef, useEffect } from "react";
import { IPost } from "@/types";

interface PostFormModalProps {
  post: IPost | null;
  onClose: () => void;
  onSave: (title: string, content: string, imageFile?: File) => Promise<void>;
}

export default function PostFormModal({ post, onClose, onSave }: PostFormModalProps) {
  const isEdit = post !== null;

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [imgPreviewName, setImgPreviewName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImgPreviewName(file.name);
    }
  };

  const handleSaveClick = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      setSaving(true);
      await onSave(title, content, selectedFile);
    } catch (err) {
    } finally {
      setSaving(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-[640px] rounded-[16px] border border-border bg-surface p-8 shadow-xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {saving && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[16px] bg-surface/80 backdrop-blur-[1px]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-ink" />
          </div>
        )}

        {/* Header Layout */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-serif text-[20px] font-medium text-ink">
            {isEdit ? "Edit post" : "New post"}
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer border-none bg-transparent text-[18px] text-ink-light transition-colors duration-150 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {/* Title input form element */}
        <div className="mb-[18px] flex flex-col">
          <label htmlFor="post-title" className="mb-[6px] text-[12px] font-medium tracking-[0.02em] text-ink-mid">Title *</label>
          <input
            id="post-title"
            type="text"
            placeholder="Give your post a compelling title…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
            className="w-full rounded-lg border border-border bg-bg px-[14px] py-[10px] font-sans text-[14px] text-ink outline-none transition-all duration-150 focus:border-accent-warm focus:bg-surface"
          />
          <div className="mt-1 text-right text-[11px] text-ink-light">{title.length} / 100</div>
        </div>

        {/* File Image Upload Elements row */}
        <div className="mb-[18px] flex flex-col">
          <label className="mb-[6px] text-[12px] font-medium tracking-[0.02em] text-ink-mid">Cover image</label>
          <div
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border bg-bg px-4 py-[10px] text-left transition-all duration-150 hover:bg-surface-alt"
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="shrink-0 text-[18px]">🖼️</span>
            <div className="min-w-0">
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-ink">
                {imgPreviewName ?? (post?.image ? "Change existing image" : "Upload image")}
              </p>
              <span className="block text-[11px] text-ink-light">JPG, PNG, WebP · max 4MB</span>
            </div>
          </div>
        </div>

        {/* Core Content Layout info fields */}
        <div className="mb-6 flex flex-col">
          <label htmlFor="post-content" className="mb-[6px] text-[12px] font-medium tracking-[0.02em] text-ink-mid">Content *</label>
          <textarea
            id="post-content"
            placeholder="Start writing your story blocks..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[180px] w-full rounded-lg border border-border bg-bg px-[14px] py-[10px] font-serif text-[15px] leading-[1.8] text-ink outline-none transition-all duration-150 focus:border-accent-warm focus:bg-surface"
          />
          <div className="mt-[6px] flex justify-between text-[11px]">
            <span className="text-ink-light">**bold**, *italic*, ## heading, &gt; quote</span>
            <span className="font-medium text-ink-mid">{wordCount} words</span>
          </div>
        </div>

        {/* Modal Action Options container */}
        <div className="flex justify-end gap-[10px] border-t border-border pt-5">
          <button 
            className="cursor-pointer rounded-lg border border-border bg-transparent px-[14px] py-2 text-[13px] font-medium text-ink transition-all duration-150 hover:bg-surface-alt" 
            onClick={onClose} 
            type="button"
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-lg bg-ink px-4 py-2 text-[13px] font-medium text-surface transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleSaveClick}
            type="button"
            disabled={!title.trim() || !content.trim() || saving}
          >
            {isEdit ? "Update post" : "Publish post"}
          </button>
        </div>
      </div>
    </div>
  );
}