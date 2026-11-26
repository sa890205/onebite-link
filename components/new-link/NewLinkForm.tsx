"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/components/folders/FolderProvider";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

type OgInfo = { title: string; description: string; image: string; url: string };

export default function NewLinkForm() {
  const { folders, addLink } = useFolders();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // state가 화면에 반영되기 전의 연속 제출까지 막기 위한 플래그
  const savingRef = useRef(false);
  const savedRef = useRef(false);
  const visibleRef = useRef(true);
  const formRef = useRef<HTMLFormElement>(null);

  function resetForm(form: HTMLFormElement | null) {
    form?.reset();
    savingRef.current = false;
    savedRef.current = false;
    setLoading(false);
  }

  // Cache Components는 페이지를 이동해도 상태를 보존하므로, 저장을 마치고 벗어날 때 폼을 초기화한다
  useLayoutEffect(() => {
    visibleRef.current = true;
    const form = formRef.current;
    return () => {
      visibleRef.current = false;
      if (savedRef.current) resetForm(form);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (savingRef.current) return;
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const url = String(form.get("url") ?? "").trim();
    const folderId = String(form.get("folder") ?? "");
    if (!url || !folderId) return;

    savingRef.current = true;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "링크 정보를 가져오지 못했습니다.");
      const og = data as OgInfo;

      await addLink({
        title: og.title,
        description: og.description,
        url: og.url,
        thumbnail: og.image || undefined,
        folderId,
      });

      // 저장 중에 다른 페이지로 이동했다면 다시 끌고 오지 않는다
      if (!visibleRef.current) {
        resetForm(formElement);
        return;
      }
      // 이동이 끝날 때까지 버튼은 비활성 상태로 둔다
      savedRef.current = true;
      router.push(`/folder/${folderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "링크 정보를 가져오지 못했습니다.");
      savingRef.current = false;
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      {error && <p className="text-sm text-[var(--error)]">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:opacity-60"
      >
        {loading ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
