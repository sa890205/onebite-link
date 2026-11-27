"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
};

const DURATION_MS = 4000;

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, DURATION_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-6">
      <div
        role="alert"
        className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-[var(--error)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)]"
      >
        <p className="flex-1">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="item-hover rounded px-1 text-[var(--text-sub)]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
