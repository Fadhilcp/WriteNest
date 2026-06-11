import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[680px] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-4 select-none text-[48px]">📭</div>
      
      {/* Title */}
      <h1 className="font-serif text-[28px] font-medium -tracking-[0.5px] text-ink mb-2.5">
        Story not found
      </h1>
      
      {/* Description */}
      <p className="max-w-[400px] text-[15px] leading-[1.6] text-ink-mid mb-7">
        This post may have been moved, deleted, or never existed.
      </p>
      
      {/* Return Link Button */}
      <Link 
        href="/" 
        className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-transparent px-[14px] py-2 text-[13px] font-medium text-ink no-underline transition-all duration-150 hover:bg-surface-alt"
      >
        ← Back to stories
      </Link>
    </div>
  );
}