import AppShell from "@/components/layout/AppShell";
import FolderView from "@/components/folders/FolderView";

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;

  return (
    <AppShell activeFolderId={id}>
      <FolderView folderId={id} />
    </AppShell>
  );
}
