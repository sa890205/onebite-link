import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { LINK_COLUMNS, toLinkItem } from "@/lib/links";
import { createClient } from "@/utils/supabase/server";
import FolderProvider from "./FolderProvider";

export default async function FolderLoader({ children }: { children: ReactNode }) {
  const supabase = createClient(await cookies());
  const [folderResult, linkResult] = await Promise.all([
    supabase.from("folders").select("id, name").order("created_at").order("id"),
    supabase
      .from("links")
      .select(LINK_COLUMNS)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false }),
  ]);
  if (folderResult.error) {
    throw new Error(`폴더 목록을 불러오지 못했습니다: ${folderResult.error.message}`);
  }
  if (linkResult.error) {
    throw new Error(`링크 목록을 불러오지 못했습니다: ${linkResult.error.message}`);
  }

  const folders = folderResult.data.map((f) => ({ id: String(f.id), name: f.name, count: 0 }));
  const links = linkResult.data.map(toLinkItem);

  return (
    <FolderProvider initialFolders={folders} initialLinks={links}>
      {children}
    </FolderProvider>
  );
}
