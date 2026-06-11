"use client";

import { useState, useEffect } from "react";
import { IPost } from "@/types";
import { postService } from "@/services/post.service";
import PostFormModal from "@/components/blog/PostFormModal";
import { PostTable } from "@/components/blog/PostTable";
import { DeleteModal } from "@/components/blog/DeletePostModal";
import { Toast } from "@/components/blog/Toast";

export default function MyPostsPage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState<"new" | IPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await postService.getAll();

      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      showToast("Failed to load posts from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = posts.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateOrUpdate = async (title: string, content: string, imageFile?: File) => {
    try {
      if (modal === "new") {
        await postService.create({ title, content }, imageFile);
        showToast("Post published successfully!");
      } else if (modal && typeof modal === "object") {
        await postService.update(modal._id, { title, content }, imageFile);
        showToast("Post updated successfully.");
      }
      setModal(null);
      fetchPosts();
    } catch (err) {
      console.error("Error saving post:", err);
      showToast("Error processing save configuration.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await postService.delete(deleteTarget);
      setDeleteTarget(null);
      showToast("Post removed permanently.");
      fetchPosts();
    } catch (err) {
      console.error("Error deleting target post:", err);
      showToast("Failed to execute deletion operation.");
    }
  };

  return (
    <div className="mx-auto max-w-[1040px] px-8 pt-10 pb-16">
      {/* Structural Heading wrapper */}
      <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="font-serif text-[28px] font-medium -tracking-[0.5px] text-ink sm:text-[34px]">My posts</h1>
          <p className="mt-[4px] text-[13px] text-ink-light">
            {posts.length} {posts.length === 1 ? "story" : "stories"} managed
          </p>
        </div>
        <button 
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-ink px-[18px] py-[10px] text-[13px] font-medium text-surface transition-opacity duration-150 hover:opacity-85" 
          onClick={() => setModal("new")}
        >
          + New post
        </button>
      </div>

      {/* Control bar interface components */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex flex-1 items-center">
          <span className="absolute left-[14px] pointer-events-none text-[14px] text-ink-light">🔍</span>
          <input
            type="text"
            placeholder="Search posts by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-[14px] py-2 text-[14px] text-ink outline-none transition-all focus:border-accent-warm"
          />
        </div>
      </div>

      {/* Main loading & layout control switches */}
      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-ink" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-border bg-surface px-8 py-16 text-center">
          <div className="mb-3 text-[36px]">📝</div>
          <h3 className="mb-[6px] font-serif text-[17px] font-medium text-ink">
            {search ? "No posts match search criteria" : "No stories authored yet"}
          </h3>
          <p className="mb-5 text-[13px] text-ink-mid">
            {search ? "Try checking spelling variations." : "Start sharing concepts to the public feed."}
          </p>
          {!search && (
            <button 
              className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-ink px-[18px] py-[10px] text-[13px] font-medium text-surface transition-opacity duration-150 hover:opacity-85" 
              onClick={() => setModal("new")}
            >
              Write your first story
            </button>
          )}
        </div>
      ) : (
        <PostTable
          filteredPosts={filtered} 
          onEdit={(p) => setModal(p)} 
          onDeleteTarget={(id) => setDeleteTarget(id)} 
        />
      )}

      {/* Layout Layer Modals mapping overlays */}
      {modal !== null && (
        <PostFormModal
          post={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleCreateOrUpdate}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}