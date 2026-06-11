export default function MyPostsLoading() {
  return (
    <div className="px-9 py-8">

      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-7 rounded-lg bg-surface-alt"
            style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
          <div className="w-40 h-4 rounded bg-surface-alt"
            style={{ animation: "pulse 1.5s ease-in-out infinite", animationDelay: "0.1s" }} />
        </div>
        <div className="w-28 h-10 rounded-lg bg-surface-alt"
          style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>

      {/* Search row skeleton */}
      <div className="flex gap-3 mb-6">
        <div className="w-[340px] h-10 rounded-lg bg-surface-alt"
          style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
        <div className="w-32 h-10 rounded-lg bg-surface-alt"
          style={{ animation: "pulse 1.5s ease-in-out infinite", animationDelay: "0.1s" }} />
      </div>

      {/* Table skeleton */}
      <div className="bg-surface border border-border rounded-[14px] overflow-hidden">

        {/* Table header */}
        <div className="
          grid grid-cols-[1fr_100px_80px_120px]
          px-5 py-3 bg-surface-alt border-b border-border gap-4
        ">
          {["60%", "60px", "40px", "80px"].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded bg-border"
              style={{
                width: w,
                animation: "pulse 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Table rows */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="
              grid grid-cols-[1fr_100px_80px_120px]
              px-5 py-4 border-b border-border
              last:border-b-0 items-center gap-4
            "
          >
            {/* Title cell */}
            <div className="flex flex-col gap-2">
              <div
                className="h-4 rounded bg-surface-alt"
                style={{
                  width: `${65 + (i % 3) * 12}%`,
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
              <div
                className="h-3 w-36 rounded bg-surface-alt"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1 + 0.05}s`,
                }}
              />
            </div>
            {/* Status */}
            <div
              className="h-5 w-16 rounded bg-surface-alt"
              style={{
                animation: "pulse 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.1 + 0.1}s`,
              }}
            />
            {/* Views */}
            <div
              className="h-4 w-10 rounded bg-surface-alt"
              style={{
                animation: "pulse 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.1 + 0.15}s`,
              }}
            />
            {/* Actions */}
            <div className="flex gap-2">
              <div
                className="h-7 w-8 rounded bg-surface-alt"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1 + 0.2}s`,
                }}
              />
              <div
                className="h-7 w-10 rounded bg-surface-alt"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1 + 0.25}s`,
                }}
              />
              <div
                className="h-7 w-6 rounded bg-surface-alt"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1 + 0.3}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}