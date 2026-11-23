"use client";

import { useEffect } from "react";

type Props = {
  folderName: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteFolderModal({ folderName, onCancel, onConfirm }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-folder-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
      >
        <h2 id="delete-folder-title" className="text-lg font-semibold text-[var(--text)]">
          폴더 삭제
        </h2>
        <p className="text-sm text-[var(--text)]">
          <strong>{folderName}</strong> 폴더를 정말 삭제할까요?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="item-hover rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm text-white hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
