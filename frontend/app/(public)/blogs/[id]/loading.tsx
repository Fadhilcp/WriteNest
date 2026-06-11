export default function BlogDetailLoading() {
  return (
    <div className="mx-auto max-w-[680px] px-6 py-12">
      {/* Back skeleton */}
      <div className="h-4 w-[120px] animate-pulse rounded-md bg-surface-alt mb-8" />

      {/* Meta tags skeleton */}
      <div className="mb-6 flex gap-3">
        {[60, 80, 60].map((w, i) => (
          <div
            key={i}
            className="h-3.5 animate-pulse rounded bg-surface-alt"
            style={{ width: w }}
          />
        ))}
      </div>

      {/* Title skeleton */}
      <div className="mb-8 space-y-3">
        {[90, 75].map((w, i) => (
          <div
            key={i}
            className="h-9 animate-pulse rounded-md bg-surface-alt"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      {/* Author row skeleton */}
      <div className="mb-9 flex items-center gap-3 border-y border-border py-4">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-surface-alt" />
        <div className="space-y-2">
          {[100, 140].map((w, i) => (
            <div
              key={i}
              className="h-3 animate-pulse rounded bg-surface-alt"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>

      {/* Cover Image skeleton */}
      <div className="mb-9 aspect-[16/9] w-full animate-pulse rounded-2xl bg-surface-alt border border-border" />

      {/* Prose lines content skeleton */}
      <div className="space-y-4">
        {[100, 95, 88, 100, 92, 60].map((w, i) => (
          <div
            key={i}
            className="h-3.5 animate-pulse rounded bg-surface-alt"
            style={{ 
              width: `${w}%`,
              animationDelay: `${i * 0.08}s` 
            }}
          />
        ))}
      </div>
    </div>
  );
}