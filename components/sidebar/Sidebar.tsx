"use client";

import { useFolders } from "@/components/folders/FolderProvider";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

type Props = {
  allActive?: boolean;
  activeFolderId?: string;
};

export default function Sidebar({ allActive = false, activeFolderId }: Props) {
  const { folders, links } = useFolders();
  const foldersWithCount = folders.map((f) => ({
    ...f,
    count: links.filter((l) => l.folderId === f.id).length,
  }));

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-[var(--border)] p-4 md:flex">
      <SidebarItem href="/" label="All" count={links.length} active={allActive} />
      <FolderList folders={foldersWithCount} activeFolderId={activeFolderId} />
    </aside>
  );
}
