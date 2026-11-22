import type { Folder } from "@/lib/types";
import FolderList from "./FolderList";
import SidebarItem from "./SidebarItem";

type Props = {
  folders: Folder[];
  totalCount: number;
  allActive?: boolean;
  activeFolderId?: string;
};

export default function Sidebar({ folders, totalCount, allActive = false, activeFolderId }: Props) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-6 border-r border-zinc-200 p-4 dark:border-zinc-800 md:flex">
      <SidebarItem href="/" label="All" count={totalCount} active={allActive} />
      <FolderList folders={folders} activeFolderId={activeFolderId} />
    </aside>
  );
}
