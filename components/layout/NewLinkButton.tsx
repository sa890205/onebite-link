import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary inline-flex items-center gap-1 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white"
    >
      <span aria-hidden>+</span> 새 링크
    </Link>
  );
}
