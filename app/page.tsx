import AppShell from "@/components/layout/AppShell";
import LinkGrid from "@/components/links/LinkGrid";
import { links } from "@/lib/mock-data";

export default function Home() {
  return (
    <AppShell allActive>
      <LinkGrid links={links} />
    </AppShell>
  );
}
