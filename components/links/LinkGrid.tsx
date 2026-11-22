import type { LinkItem } from "@/lib/types";
import LinkCard from "./LinkCard";

export default function LinkGrid({ links }: { links: LinkItem[] }) {
  if (links.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-zinc-400">
        등록된 링크가 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <li key={link.id} className="flex">
          <div className="flex w-full flex-col [&>a]:flex-1">
            <LinkCard link={link} />
          </div>
        </li>
      ))}
    </ul>
  );
}
