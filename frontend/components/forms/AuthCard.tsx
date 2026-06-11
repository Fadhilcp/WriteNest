// app/(auth)/components/AuthCard.tsx
import Link from "next/link";
import Loading from "../ui/Loading";

interface AuthCardProps {
  title: string;
  subtitle: string;
  alternativeText: string;
  alternativeLinkText: string;
  alternativeHref: string;
  dividerText?: string;
  error: string | null;
  loading: boolean;
  children: React.ReactNode;
  showLegalText?: boolean;
}

export default function AuthCard({
  title,
  subtitle,
  alternativeText,
  alternativeLinkText,
  alternativeHref,
  dividerText = "or",
  error,
  loading,
  children,
  showLegalText = false,
}: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-60px)] items-center justify-center bg-bg px-4 py-10">
      
      {/* ── Global Loading Overlay ── */}
      {loading && <Loading fullscreen label="Loading…" />}

      {/* ── Visual Frame Card ── */}
      <div className="w-full max-w-[420px] rounded-[18px] border border-border bg-surface px-10 py-11">
        {/* Brand Header */}
        <div className="font-serif text-[22px] font-semibold mb-2">
          Write<span className="text-accent-warm">Nest</span>
        </div>
        <div className="mb-9 text-[13px] text-ink-mid">
          {subtitle}
        </div>

        <h2 className="font-serif text-[24px] font-medium -tracking-[0.5px] mb-1">
          {title}
        </h2>
        <p className="mt-1 mb-5 text-[13px] text-ink-light">
          {alternativeText}{" "}
          <Link
            href={alternativeHref}
            className="font-medium text-accent-warm no-underline hover:underline"
          >
            {alternativeLinkText}
          </Link>
        </p>

        {/* OAuth Integration Button */}
        <button 
          type="button" 
          className="mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-transparent p-[10px] font-sans text-[14px] text-ink transition-all duration-150 hover:bg-surface-alt"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Dynamic Horizontal Rules Splitter */}
        <div className="relative my-5 text-center text-[12px] text-ink-light before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[calc(50%-28px)] before:bg-border after:absolute after:top-1/2 after:right-0 after:h-[1px] after:w-[calc(50%-28px)] after:bg-border">
          {dividerText}
        </div>

        {/* Local Error Boxes */}
        {error && (
          <p className="mb-4 rounded-lg bg-danger-bg px-3 py-2 text-[13px] text-danger">
            {error}
          </p>
        )}

        {/* Interactive Custom Form Layer */}
        {children}

        {/* Optional Legal Footer Blocks */}
        {showLegalText && (
          <p className="mt-[14px] text-center text-[11px] leading-relaxed text-ink-light">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-ink-light underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-ink-light underline">
              Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}