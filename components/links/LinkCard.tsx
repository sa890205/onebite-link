import type { LinkItem } from "@/lib/types";

export default function LinkCard({ link }: { link: LinkItem }) {
  const host = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
    >
      <div className="flex h-24 items-center justify-center rounded-md bg-[var(--hover-bg)] text-2xl font-bold text-[var(--text-sub)]">
        {host[0].toUpperCase()}
      </div>
      <h3 className="line-clamp-1 font-semibold text-[var(--text)]">{link.title}</h3>
      <p className="line-clamp-2 text-sm leading-[1.4] text-[var(--text-sub)]">{link.description}</p>
      <div className="mt-auto flex items-center justify-between pt-1 text-[13px] text-[var(--text-sub)]">
        <span>{host}</span>
        <time dateTime={link.createdAt}>{link.createdAt}</time>
      </div>
    </a>
  );
}
