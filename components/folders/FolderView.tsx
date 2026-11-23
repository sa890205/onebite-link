"use client";

import { notFound } from "next/navigation";
import { useFolders } from "./FolderProvider";
import LinkGrid from "@/components/links/LinkGrid";

export default function FolderView({ folderId }: { folderId: string }) {
  const { folders, links, deletedIds } = useFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) {
    if (deletedIds.includes(folderId)) return null;
    notFound();
  }

  return (
    <>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">{folder.name}</h1>
      <LinkGrid links={links.filter((l) => l.folderId === folder.id)} />
    </>
  );
}
