"use client";

import { notFound } from "next/navigation";
import { useFolders } from "./FolderProvider";
import LinkGrid from "@/components/links/LinkGrid";
import type { LinkItem } from "@/lib/types";

export default function FolderView({ folderId, links }: { folderId: string; links: LinkItem[] }) {
  const { folders } = useFolders();
  const folder = folders.find((f) => f.id === folderId);
  if (!folder) notFound();

  return (
    <>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">{folder.name}</h1>
      <LinkGrid links={links.filter((l) => l.folderId === folder.id)} />
    </>
  );
}
