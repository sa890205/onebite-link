import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export default function AuthInput({ id, label, ...inputProps }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-[var(--text)]">
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        name={id}
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
      />
    </div>
  );
}
