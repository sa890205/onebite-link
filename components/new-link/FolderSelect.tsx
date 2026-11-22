import type { Folder } from "@/lib/types";

export default function FolderSelect({ folders }: { folders: Folder[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
        폴더
      </label>
      <select
        id="folder"
        name="folder"
        required
        defaultValue=""
        className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
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
