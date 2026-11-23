import AppShell from "@/components/layout/AppShell";
import FolderView from "@/components/folders/FolderView";
import { folders, links } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: folder.id }));
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;

  return (
    <AppShell activeFolderId={id}>
      <FolderView folderId={id} links={links} />
    </AppShell>
  );
}
