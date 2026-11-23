"use client";

import type { Folder } from "@/lib/types";
import { useFolders } from "@/components/folders/FolderProvider";
import SidebarItem from "./SidebarItem";

export default function FolderList({
  folders,
  activeFolderId,
}: {
  folders: Folder[];
  activeFolderId?: string;
}) {
  const { requestDeleteFolder, requestEditFolder } = useFolders();

  return (
    <div className="flex flex-col gap-1">
      <h2 className="px-3 pb-1 text-xs font-semibold text-[var(--text-sub)]">
        폴더
      </h2>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <li key={folder.id} className="group relative">
            <SidebarItem
              href={`/folder/${folder.id}`}
              active={folder.id === activeFolderId}
              label={folder.name}
              count={folder.count}
            />
            <button
              type="button"
              aria-label={`${folder.name} 폴더 이름 수정`}
              onClick={() => requestEditFolder(folder)}
              className="absolute right-8 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--text-sub)] opacity-0 hover:text-[var(--accent)] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`${folder.name} 폴더 삭제`}
              onClick={() => requestDeleteFolder(folder)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[var(--text-sub)] opacity-0 hover:text-[var(--error)] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 6h18" />
                <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
