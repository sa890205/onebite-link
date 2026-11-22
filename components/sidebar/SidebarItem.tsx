import Link from "next/link";

type Props = {
  href: string;
  label: string;
  count?: number;
  active?: boolean;
};

export default function SidebarItem({ href, label, count, active = false }: Props) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
        active
          ? "bg-[var(--hover-bg)] font-semibold text-[var(--text)]"
          : "item-hover text-[var(--text)]"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="text-xs text-[var(--text-sub)]">{count}</span>
      )}
    </Link>
  );
}
