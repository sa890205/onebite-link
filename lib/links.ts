import type { LinkItem } from "./types";

export const LINK_COLUMNS = "id, url, title, description, thumbnail_url, folder_id, created_at";

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};

// 서버와 브라우저에서 같은 날짜(YYYY-MM-DD)가 나오도록 시간대를 고정한다
const dateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    thumbnail: row.thumbnail_url ?? undefined,
    folderId: row.folder_id === null ? "" : String(row.folder_id),
    createdAt: dateFormat.format(new Date(row.created_at)),
  };
}
