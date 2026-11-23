"use client";

import { useFolders } from "@/components/folders/FolderProvider";
import type { LinkItem } from "@/lib/types";

export default function LinkEditButton({ link }: { link: LinkItem }) {
  const { requestEditLink } = useFolders();
  return (
    <button
      type="button"
      aria-label={`${link.title} 링크 수정`}
      onClick={() => requestEditLink(link)}
      className="absolute right-10 top-2 rounded-md bg-[var(--surface)]/90 p-1.5 text-[var(--text-sub)] opacity-0 shadow-sm hover:text-[var(--accent)] focus-visible:opacity-100 group-hover:opacity-100"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    </button>
  );
}
