export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-200 -translate-x-1/2 rounded-lg bg-ink px-[18px] py-3 text-[13px] font-medium text-surface shadow-lg animate-fade-in animate-duration-200">
      {message}
    </div>
  );
}