"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Props = {
  existingNames: string[];
  onCancel: () => void;
  onSave: (name: string) => void;
};

export default function NewFolderModal({ existingNames, onCancel, onSave }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("폴더 이름을 입력해주세요.");
      return;
    }
    if (existingNames.includes(trimmed)) {
      setError("이미 존재하는 폴더 이름입니다.");
      return;
    }
    onSave(trimmed);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onCancel}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-folder-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
      >
        <h2 id="new-folder-title" className="text-lg font-semibold text-[var(--text)]">
          새 폴더
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            ref={inputRef}
            id="folder-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="폴더 이름을 입력하세요"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          {error && <p className="text-xs text-[var(--error)]">{error}</p>}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="item-hover rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="submit"
            className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
