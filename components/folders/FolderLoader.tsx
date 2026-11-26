import type { ReactNode } from "react";
import { cookies } from "next/headers";
import type { LinkItem } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import FolderProvider from "./FolderProvider";

export default async function FolderLoader({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: ReactNode;
}) {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .order("created_at")
    .order("id");
  if (error) throw new Error(`폴더 목록을 불러오지 못했습니다: ${error.message}`);

  const folders = data.map((f) => ({ id: String(f.id), name: f.name, count: 0 }));

  return (
    <FolderProvider initialFolders={folders} initialLinks={initialLinks}>
      {children}
    </FolderProvider>
  );
}
