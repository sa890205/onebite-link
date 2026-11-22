"use client";

import type { Folder } from "@/lib/types";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

export default function NewLinkForm({ folders }: { folders: Folder[] }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex max-w-lg flex-col gap-5"
    >
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <button
        type="submit"
        className="h-10 rounded-lg bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        저장
      </button>
    </form>
  );
}
