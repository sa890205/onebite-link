"use client";

import { useFolders } from "@/components/folders/FolderProvider";
import LinkGrid from "./LinkGrid";

export default function AllLinks() {
  const { links } = useFolders();
  return <LinkGrid links={links} />;
}
