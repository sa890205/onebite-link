"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder, LinkItem } from "@/lib/types";
import NewFolderModal from "./NewFolderModal";
import DeleteFolderModal from "./DeleteFolderModal";

type FolderContextValue = {
  folders: Folder[];
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
  requestDeleteLink: (link: LinkItem) => void;
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
  const addLink = useCallback((link: LinkItem) => setLinks((prev) => [link, ...prev]), []);
  const [linkDeleteTarget, setLinkDeleteTarget] = useState<LinkItem | null>(null);
  const requestDeleteLink = useCallback((link: LinkItem) => setLinkDeleteTarget(link), []);
  const closeLinkDeleteModal = useCallback(() => setLinkDeleteTarget(null), []);
  function deleteLink() {
    if (!linkDeleteTarget) return;
    const { id } = linkDeleteTarget;
    setLinks((prev) => prev.filter((l) => l.id !== id));
    setLinkDeleteTarget(null);
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

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: `folder-${Date.now()}`, name, count: 0 }]);
    setOpen(false);
  }

  function renameFolder(name: string) {
    if (!editTarget) return;
    const { id } = editTarget;
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name } : f)));
    setEditTarget(null);
  }

  function deleteFolder() {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setDeletedIds((prev) => [...prev, id]);
    setDeleteTarget(null);
    if (pathname === `/folder/${id}`) router.push("/");
  }

  return (
    <FolderContext
      value={{ folders, links, addLink, requestDeleteLink, deletedIds, openNewFolderModal, requestDeleteFolder, requestEditFolder }}
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
