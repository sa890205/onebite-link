"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder, LinkItem, NewLink } from "@/lib/types";
import { LINK_COLUMNS, toLinkItem } from "@/lib/links";
import { createClient } from "@/utils/supabase/client";
import NewFolderModal from "./NewFolderModal";
import DeleteFolderModal from "./DeleteFolderModal";
import EditLinkModal from "@/components/links/EditLinkModal";

type FolderContextValue = {
  folders: Folder[];
  links: LinkItem[];
  addLink: (link: NewLink) => Promise<void>;
  requestDeleteLink: (link: LinkItem) => void;
  requestEditLink: (link: LinkItem) => void;
  deletedIds: string[];
  openNewFolderModal: () => void;
  requestDeleteFolder: (folder: Folder) => void;
  requestEditFolder: (folder: Folder) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}

export default function FolderProvider({
  initialFolders,
  initialLinks,
  children,
}: {
  initialFolders: Folder[];
  initialLinks: LinkItem[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const addLink = useCallback(async (link: NewLink) => {
    const { data, error } = await createClient()
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail ?? null,
        folder_id: Number(link.folderId),
      })
      .select(LINK_COLUMNS)
      .single();
    if (error) throw new Error("링크를 저장하지 못했습니다.");
    setLinks((prev) => [toLinkItem(data), ...prev]);
  }, []);
  const [linkDeleteTarget, setLinkDeleteTarget] = useState<LinkItem | null>(null);
  const requestDeleteLink = useCallback((link: LinkItem) => setLinkDeleteTarget(link), []);
  const closeLinkDeleteModal = useCallback(() => setLinkDeleteTarget(null), []);
  function deleteLink() {
    if (!linkDeleteTarget) return;
    const { id } = linkDeleteTarget;
    setLinks((prev) => prev.filter((l) => l.id !== id));
    setLinkDeleteTarget(null);
  }
  const [linkEditTarget, setLinkEditTarget] = useState<LinkItem | null>(null);
  const requestEditLink = useCallback((link: LinkItem) => setLinkEditTarget(link), []);
  const closeLinkEditModal = useCallback(() => setLinkEditTarget(null), []);
  function updateLink(values: { folderId: string; title: string; description: string }) {
    if (!linkEditTarget) return;
    const { id } = linkEditTarget;
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...values } : l)));
    setLinkEditTarget(null);
  }
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null);

  const openNewFolderModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const requestDeleteFolder = useCallback((folder: Folder) => setDeleteTarget(folder), []);
  const [editTarget, setEditTarget] = useState<Folder | null>(null);
  const requestEditFolder = useCallback((folder: Folder) => setEditTarget(folder), []);
  const closeEditModal = useCallback(() => setEditTarget(null), []);
  const closeDeleteModal = useCallback(() => setDeleteTarget(null), []);

  async function addFolder(name: string) {
    const { data, error } = await createClient()
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();
    if (error) throw error;
    setFolders((prev) => [...prev, { id: String(data.id), name: data.name, count: 0 }]);
    setOpen(false);
  }

  async function renameFolder(name: string) {
    if (!editTarget) return;
    const { id } = editTarget;
    // single()은 수정된 행이 없으면 오류를 반환한다
    const { data, error } = await createClient()
      .from("folders")
      .update({ name })
      .eq("id", id)
      .select("name")
      .single();
    if (error) throw error;
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name: data.name } : f)));
    setEditTarget(null);
  }

  async function deleteFolder() {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    const { error } = await createClient()
      .from("folders")
      .delete()
      .eq("id", id)
      .select("id")
      .single();
    if (error) throw error;
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setDeletedIds((prev) => [...prev, id]);
    setDeleteTarget(null);
    if (pathname === `/folder/${id}`) router.push("/");
  }

  return (
    <FolderContext
      value={{ folders, links, addLink, requestDeleteLink, requestEditLink, deletedIds, openNewFolderModal, requestDeleteFolder, requestEditFolder }}
    >
      {children}
      {open && (
        <NewFolderModal
          existingNames={folders.map((f) => f.name)}
          onCancel={closeModal}
          onSave={addFolder}
        />
      )}
      {editTarget && (
        <NewFolderModal
          key={editTarget.id}
          title="폴더 이름 수정"
          initialName={editTarget.name}
          existingNames={folders.filter((f) => f.id !== editTarget.id).map((f) => f.name)}
          onCancel={closeEditModal}
          onSave={renameFolder}
        />
      )}
      {linkEditTarget && (
        <EditLinkModal
          key={linkEditTarget.id}
          link={linkEditTarget}
          folders={folders}
          onCancel={closeLinkEditModal}
          onSave={updateLink}
        />
      )}
      {linkDeleteTarget && (
        <DeleteFolderModal
          title="링크 삭제"
          label="링크"
          folderName={linkDeleteTarget.title}
          onCancel={closeLinkDeleteModal}
          onConfirm={deleteLink}
        />
      )}
      {deleteTarget && (
        <DeleteFolderModal
          folderName={deleteTarget.name}
          onCancel={closeDeleteModal}
          onConfirm={deleteFolder}
        />
      )}
    </FolderContext>
  );
}
