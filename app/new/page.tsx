import AppShell from "@/components/layout/AppShell";
import NewLinkForm from "@/components/new-link/NewLinkForm";

export default function NewLinkPage() {
  return (
    <AppShell>
      <h1 className="mb-8 text-[30px] font-bold leading-[1.2]">새 링크</h1>
      <NewLinkForm />
    </AppShell>
  );
}
