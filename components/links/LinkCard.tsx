import type { LinkItem } from "@/lib/types";

export default function LinkCard({ link }: { link: LinkItem }) {
  const host = new URL(link.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-xl border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="flex h-24 items-center justify-center rounded-lg bg-zinc-100 text-2xl font-bold text-zinc-400 dark:bg-zinc-900">
        {host[0].toUpperCase()}
      </div>
      <h3 className="line-clamp-1 font-semibold">{link.title}</h3>
      <p className="line-clamp-2 text-sm text-zinc-500">{link.description}</p>
      <div className="mt-auto flex items-center justify-between pt-1 text-xs text-zinc-400">
        <span>{host}</span>
        <time dateTime={link.createdAt}>{link.createdAt}</time>
      </div>
    </a>
  );
}
