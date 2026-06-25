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

  const [activeTab, setActiveTab] = useState<"drafts" | "published">("drafts");

  const [modal, setModal] = useState<"new" | IPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const isPublishedFlag = activeTab === "published";
      const res = await postService.getMyPosts(isPublishedFlag);

      setPosts(res.data);
    } catch (err) {
      showToast("Failed to load posts from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

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
      showToast("Failed to execute deletion operation.");
    }
  };

  const handlePublish = async (postId: string) => {
    try {
      await postService.publish(postId);
      showToast("Post published successfully!");
      fetchPosts();
    } catch (err) {
      showToast("Failed to publish post.");
    }
  };

  return (
    <div className="mx-auto max-w-[1040px] px-8 pt-10 pb-16">
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[28px] font-medium -tracking-[0.5px] text-ink sm:text-[34px]">My posts</h1>
          <p className="mt-[4px] text-[13px] text-ink-light">
            {posts.length} {activeTab} managed
          </p>
        </div>
        <button 
          className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-ink px-[18px] py-[10px] text-[13px] font-medium text-surface transition-opacity duration-150 hover:opacity-85" 
          onClick={() => setModal("new")}
        >
          + New draft
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-6 border-b border-border">
        <button
          className={`pb-3 text-[14px] font-medium transition-colors ${
            activeTab === "drafts"
              ? "border-b-2 border-ink text-ink"
              : "text-ink-light hover:text-ink-mid"
          }`}
          onClick={() => setActiveTab("drafts")}
        >
          Drafts
        </button>
        <button
          className={`pb-3 text-[14px] font-medium transition-colors ${
            activeTab === "published"
              ? "border-b-2 border-ink text-ink"
              : "text-ink-light hover:text-ink-mid"
          }`}
          onClick={() => setActiveTab("published")}
        >
          Published
        </button>
      </div>

      <div className="mb-6 flex gap-3">
        <div className="relative flex flex-1 items-center">
          <span className="absolute left-[14px] pointer-events-none text-[14px] text-ink-light">🔍</span>
          <input
            type="text"
            placeholder={`Search ${activeTab} by title…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-[14px] py-2 text-[14px] text-ink outline-none transition-all focus:border-accent-warm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-ink" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[14px] border border-dashed border-border bg-surface px-8 py-16 text-center">
          <div className="mb-3 text-[36px]">📝</div>
          <h3 className="mb-[6px] font-serif text-[17px] font-medium text-ink">
            {search ? "No posts match search criteria" : `No ${activeTab} found`}
          </h3>
          <p className="mb-5 text-[13px] text-ink-mid">
            {search ? "Try checking spelling variations." : activeTab === "drafts" ? "Start writing your next big idea." : "Publish a draft to see it here."}
          </p>
        </div>
      ) : (
        <PostTable
          filteredPosts={filtered} 
          onEdit={(p) => setModal(p)} 
          onDeleteTarget={(id) => setDeleteTarget(id)} 
          onPublish={handlePublish}
        />
      )}

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