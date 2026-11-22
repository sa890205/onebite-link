import type { ReactNode } from "react";
import { folders, links } from "@/lib/mock-data";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "./Header";

type Props = {
  children: ReactNode;
  allActive?: boolean;
  activeFolderId?: string;
};

export default function AppShell({ children, allActive = false, activeFolderId }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          folders={folders}
          totalCount={links.length}
          allActive={allActive}
          activeFolderId={activeFolderId}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
