"use client";

import { useFolders } from "@/components/folders/FolderProvider";

export default function NewFolderButton() {
  const { openNewFolderModal } = useFolders();
  return (
    <button
      type="button"
      onClick={openNewFolderModal}
      className="item-hover inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
    >
      <span aria-hidden>+</span> 새 폴더
    </button>
  );
}
