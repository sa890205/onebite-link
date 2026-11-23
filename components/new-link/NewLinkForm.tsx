"use client";

import { useState, type FormEvent } from "react";
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const url = String(form.get("url") ?? "").trim();
    const folderId = String(form.get("folder") ?? "");
    if (!url || !folderId) return;

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "링크 정보를 가져오지 못했습니다.");
      const og = data as OgInfo;

      addLink({
        id: `link-${Date.now()}`,
        title: og.title,
        description: og.description,
        url: og.url,
        thumbnail: og.image || undefined,
        folderId,
        createdAt: new Date().toISOString().slice(0, 10),
      });
      router.push(`/folder/${folderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "링크 정보를 가져오지 못했습니다.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
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
