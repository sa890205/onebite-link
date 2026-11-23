"use client";

import { useFolders } from "@/components/folders/FolderProvider";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

type Props = {
  totalCount: number;
  allActive?: boolean;
  activeFolderId?: string;
};

export default function Sidebar({ totalCount, allActive = false, activeFolderId }: Props) {
  const { folders } = useFolders();
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-[var(--border)] p-4 md:flex">
      <SidebarItem href="/" label="All" count={totalCount} active={allActive} />
      <FolderList folders={folders} activeFolderId={activeFolderId} />
    </aside>
  );
}
