"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Folder } from "@/lib/types";
import NewFolderModal from "./NewFolderModal";

type FolderContextValue = {
  folders: Folder[];
  openNewFolderModal: () => void;
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
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [open, setOpen] = useState(false);

  const openNewFolderModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  function addFolder(name: string) {
    setFolders((prev) => [...prev, { id: `folder-${Date.now()}`, name, count: 0 }]);
    setOpen(false);
  }

  return (
    <FolderContext value={{ folders, openNewFolderModal }}>
      {children}
      {open && (
        <NewFolderModal
          existingNames={folders.map((f) => f.name)}
          onCancel={closeModal}
          onSave={addFolder}
        />
      )}
    </FolderContext>
  );
}
