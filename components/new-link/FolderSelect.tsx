import type { Folder } from "@/lib/types";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="folder" className="text-sm font-medium">
        폴더
      </label>
      <select
        id="folder"
        name="folder"
        required
        defaultValue=""
        className="h-10 rounded-lg border border-zinc-300 bg-background px-3 text-sm outline-none focus:border-foreground dark:border-zinc-700"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
