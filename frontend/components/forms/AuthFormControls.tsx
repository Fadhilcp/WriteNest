import { InputHTMLAttributes, ButtonHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function InputField({ label, id, ...props }: InputFieldProps) {
  return (
    <div className="mb-[18px]">
      <label 
        htmlFor={id} 
        className="mb-[6px] block text-[12px] font-medium tracking-[0.02em] text-ink-mid"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-lg border border-border bg-bg px-[14px] py-[10px] font-sans text-[14px] text-ink outline-none transition-all duration-150 [appearance:none] focus:border-accent-warm focus:bg-surface disabled:opacity-60"
        {...props}
      />
    </div>
  );
}

