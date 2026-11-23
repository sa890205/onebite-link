"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import NewFolderModal from "./NewFolderModal";
import DeleteFolderModal from "./DeleteFolderModal";

type FolderContextValue = {
  folders: Folder[];
  deletedIds: string[];
  openNewFolderModal: () => void;
  requestDeleteFolder: (folder: Folder) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}

export default function FolderProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Folder | null>(null);

  const openNewFolderModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const requestDeleteFolder = useCallback((folder: Folder) => setDeleteTarget(folder), []);
  const closeDeleteModal = useCallback(() => setDeleteTarget(null), []);

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: `folder-${Date.now()}`, name, count: 0 }]);
    setOpen(false);
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
      value={{ folders, deletedIds, openNewFolderModal, requestDeleteFolder }}
    >
      {children}
      {open && (
        <NewFolderModal
          existingNames={folders.map((f) => f.name)}
          onCancel={closeModal}
          onSave={addFolder}
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
