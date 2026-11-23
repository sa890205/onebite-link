"use client";

import { useFolders } from "@/components/folders/FolderProvider";
import type { LinkItem } from "@/lib/types";

export default function LinkDeleteButton({ link }: { link: LinkItem }) {
  const { requestDeleteLink } = useFolders();
  return (
    <button
      type="button"
      aria-label={`${link.title} 링크 삭제`}
      onClick={() => requestDeleteLink(link)}
      className="absolute right-2 top-2 rounded-md bg-[var(--surface)]/90 p-1.5 text-[var(--text-sub)] opacity-0 shadow-sm hover:text-[var(--error)] focus-visible:opacity-100 group-hover:opacity-100"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 6h18" />
        <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
      </svg>
    </button>
  );
}
