import { useEffect } from "react";

// ── 2. DELETE CONFIRMATION MODAL ──
interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ onClose, onConfirm }: DeleteModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]" onClick={onClose}>
      <div className="w-full max-w-[400px] rounded-[16px] border border-border bg-surface p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-serif text-[18px] font-medium text-ink mb-2">Delete this post?</h3>
        <p className="text-[13px] leading-[1.6] text-ink-mid mb-5">
          This is permanent and cannot be undone. The post will be removed for all readers.
        </p>
        <div className="flex justify-end gap-[10px]">
          <button className="cursor-pointer rounded-lg border border-border bg-transparent px-[14px] py-2 text-[13px] font-medium text-ink transition-all duration-150 hover:bg-surface-alt" onClick={onClose}>
            Cancel
          </button>
          <button className="cursor-pointer rounded-lg bg-danger px-4 py-2 text-[13px] font-medium text-white transition-opacity duration-150 hover:opacity-85" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}