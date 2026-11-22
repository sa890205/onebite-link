import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import LinkGrid from "@/components/links/LinkGrid";
import { folders, links } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: folder.id }));
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const { id } = await params;
  const folder = folders.find((f) => f.id === id);
  if (!folder) notFound();

  return (
    <AppShell activeFolderId={folder.id}>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">{folder.name}</h1>
      <LinkGrid links={links.filter((l) => l.folderId === folder.id)} />
    </AppShell>
  );
}
