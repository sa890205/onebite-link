"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  label?: string;
  folderName: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function DeleteFolderModal({
  title = "폴더 삭제",
  label = "폴더",
  folderName,
  onCancel,
  onConfirm,
}: Props) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const deletingRef = useRef(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !deletingRef.current) onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  function handleCancel() {
    if (!deletingRef.current) onCancel();
  }

  async function handleConfirm() {
    if (deletingRef.current) return;
    deletingRef.current = true;
    setDeleting(true);
    setError("");
    try {
      await onConfirm();
    } catch {
      setError("삭제하지 못했습니다. 다시 시도해주세요.");
    } finally {
      deletingRef.current = false;
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-folder-title"
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
      >
        <h2 id="delete-folder-title" className="text-lg font-semibold text-[var(--text)]">
          {title}
        </h2>
        <p className="text-sm text-[var(--text)]">
          <strong>{folderName}</strong> {label}를 정말 삭제할까요?
        </p>
        {error && <p className="text-xs text-[var(--error)]">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            onClick={handleCancel}
            disabled={deleting}
            className="item-hover rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] disabled:opacity-60"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={deleting}
            className="rounded-md bg-[var(--error)] px-4 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
          >
            {deleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}
