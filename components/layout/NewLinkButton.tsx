import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="inline-flex h-9 items-center gap-1 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-80"
    >
      <span aria-hidden>+</span> 새 링크
    </Link>
  );
}
