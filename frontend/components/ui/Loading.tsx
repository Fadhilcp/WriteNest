interface LoadingProps {
  fullscreen?: boolean;
  label?: string;
}

export default function Loading({ fullscreen = false, label }: LoadingProps) {
  if (fullscreen) {
    return (
      <div className="
        fixed inset-0 z-[200]
        flex flex-col items-center justify-center gap-4
        bg-bg/85 backdrop-blur-sm
      ">
        <Spinner />
        {label && (
          <p className="text-[13px] text-ink-mid animate-pulse">{label}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Spinner />
      {label && (
        <p className="text-[13px] text-ink-mid">{label}</p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div className="relative w-9 h-9">
      {/* Track */}
      <div className="
        absolute inset-0 rounded-full
        border-2 border-border
      " />
      {/* Head */}
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: "var(--color-ink)",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </div>
  );
}