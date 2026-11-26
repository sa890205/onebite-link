"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Props = {
  title?: string;
  initialName?: string;
  existingNames: string[];
  onCancel: () => void;
  onSave: (name: string) => void | Promise<void>;
};

export default function NewFolderModal({
  title = "새 폴더",
  initialName = "",
  existingNames,
  onCancel,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  // state가 화면에 반영되기 전의 연속 제출까지 막기 위한 플래그
  const savingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !savingRef.current) onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  // 저장 중에 닫고 다시 열어 중복 추가하는 것을 막는다
  function handleCancel() {
    if (!savingRef.current) onCancel();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (savingRef.current) return;
    const trimmed = name.trim();
    if (!trimmed) {
      setError("폴더 이름을 입력해주세요.");
      return;
    }
    if (existingNames.includes(trimmed)) {
      setError("이미 존재하는 폴더 이름입니다.");
      return;
    }
    savingRef.current = true;
    setSaving(true);
    try {
      await onSave(trimmed);
    } catch {
      setError("폴더를 저장하지 못했습니다. 다시 시도해주세요.");
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
        aria-labelledby="new-folder-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
      >
        <h2 id="new-folder-title" className="text-lg font-semibold text-[var(--text)]">
          {title}
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            ref={inputRef}
            id="folder-name"
            value={name}
            readOnly={saving}
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
