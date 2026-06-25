import Link from "next/link";
import Loading from "../ui/Loading";

interface AuthCardProps {
  title: string;
  subtitle: string;
  alternativeText?: string;
  alternativeLinkText?: string;
  alternativeHref?: string;
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
      
      {loading && <Loading fullscreen label="Loading…" />}

      <div className="w-full max-w-[420px] rounded-[18px] border border-border bg-surface px-10 py-11">
        {/* Header */}
        <div className="font-serif text-[22px] font-semibold mb-2">
          Write<span className="text-accent-warm">Nest</span>
        </div>
        <div className="mb-9 text-[13px] text-ink-mid">
          {subtitle}
        </div>

        <h2 className="font-serif text-[24px] font-medium -tracking-[0.5px] mb-1">
          {title}
        </h2>
        {(alternativeText && alternativeLinkText && alternativeHref) && (
            <p className="mt-1 mb-5 text-[13px] text-ink-light">
            {alternativeText}{" "}
            <Link
                href={alternativeHref}
                className="font-medium text-accent-warm no-underline hover:underline"
            >
                {alternativeLinkText}
            </Link>
            </p>
        )}

        <div className="relative my-5 text-center text-[12px] text-ink-light before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[calc(50%-28px)] before:bg-border after:absolute after:top-1/2 after:right-0 after:h-[1px] after:w-[calc(50%-28px)] after:bg-border">
          {dividerText}
        </div>

        {/* Local Error Boxes */}
        {error && (
          <p className="mb-4 rounded-lg bg-danger-bg px-3 py-2 text-[13px] text-danger">
            {error}
          </p>
        )}

        {children}

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