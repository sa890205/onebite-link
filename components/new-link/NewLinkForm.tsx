"use client";

import { useFolders } from "@/components/folders/FolderProvider";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

export default function NewLinkForm() {
  const { folders } = useFolders();
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex max-w-lg flex-col gap-5"
    >
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white"
      >
        저장
      </button>
    </form>
  );
}
