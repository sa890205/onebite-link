import type { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  children: ReactNode;
  footerText: string;
  footerHref: "/login" | "/signup";
  footerLinkLabel: string;
};

export default function AuthShell({ title, children, footerText, footerHref, footerLinkLabel }: Props) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-[30px] font-bold leading-[1.2]">한입 링크</p>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
          <h1 className="mb-6 text-xl font-semibold leading-[1.3]">{title}</h1>
          {children}
          <p className="mt-4 text-center text-sm text-[var(--text-sub)]">
            {footerText}{" "}
            <Link href={footerHref} className="link-hover text-[var(--accent-text)]">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
