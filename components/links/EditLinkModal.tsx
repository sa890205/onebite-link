"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Folder, LinkItem } from "@/lib/types";

type Props = {
  link: LinkItem;
  folders: Folder[];
  onCancel: () => void;
  onSave: (values: { folderId: string; title: string; description: string }) => Promise<void>;
};

const fieldClass =
  "rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]";

export default function EditLinkModal({ link, folders, onCancel, onSave }: Props) {
  // 폴더가 없거나 이미 삭제된 폴더를 가리키는 링크는 "폴더 없음"으로 시작한다
  const hasFolder = folders.some((f) => f.id === link.folderId);
  const [folderId, setFolderId] = useState(hasFolder ? link.folderId : "");
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !savingRef.current) onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  function handleCancel() {
    if (!savingRef.current) onCancel();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (savingRef.current) return;
    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setError("");
    try {
      await onSave({ folderId, title: title.trim(), description: description.trim() });
    } catch {
      setError("링크를 저장하지 못했습니다. 다시 시도해주세요.");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleCancel}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-link-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
      >
        <h2 id="edit-link-title" className="text-lg font-semibold text-[var(--text)]">
          링크 수정
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-link-folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <select
            id="edit-link-folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className={fieldClass}
          >
            {!hasFolder && <option value="">폴더 없음</option>}
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-link-name" className="text-sm font-medium text-[var(--text)]">
            제목
          </label>
          <input
            ref={titleRef}
            id="edit-link-name"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-link-desc" className="text-sm font-medium text-[var(--text)]">
            설명
          </label>
          <textarea
            id="edit-link-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${fieldClass} resize-none`}
          />
        </div>

        {error && <p className="text-xs text-[var(--error)]">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="item-hover rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] disabled:opacity-60"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
