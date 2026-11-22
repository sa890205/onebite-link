import type { Folder } from "@/lib/types";
import SidebarItem from "./SidebarItem";

export default function FolderList({
  folders,
  activeFolderId,
}: {
  folders: Folder[];
  activeFolderId?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="px-3 pb-1 text-xs font-semibold uppercase text-zinc-400">
        폴더
      </h2>
      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <li key={folder.id}>
            <SidebarItem
              href={`/folder/${folder.id}`}
              active={folder.id === activeFolderId}
              label={folder.name}
              count={folder.count}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
