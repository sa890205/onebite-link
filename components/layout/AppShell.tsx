import type { ReactNode } from "react";
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
          allActive={allActive}
          activeFolderId={activeFolderId}
        />
        <main className="flex-1 px-6 pb-10 pt-10"><div className="mx-auto max-w-[720px]">{children}</div></main>
      </div>
    </div>
  );
}
