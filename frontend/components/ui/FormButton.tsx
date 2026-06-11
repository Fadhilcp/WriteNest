import { ButtonHTMLAttributes } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: React.ReactNode;
}

export function FormButton({ loading, children, ...props }: FormButtonProps) {
  return (
    <button
      className="mt-[6px] w-full cursor-pointer rounded-lg border-none bg-ink p-3 font-sans text-[14px] font-medium text-surface transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={loading}
      {...props}
    >
      {children}
    </button>
  );
}