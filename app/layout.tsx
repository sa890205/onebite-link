import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import FolderLoader from "@/components/folders/FolderLoader";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Suspense fallback={<p className="p-4 text-sm text-[var(--text-sub)]">불러오는 중...</p>}>
          <FolderLoader>{children}</FolderLoader>
        </Suspense>
      </body>
    </html>
  );
}
