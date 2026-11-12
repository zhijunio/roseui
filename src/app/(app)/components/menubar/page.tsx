import { MenubarExamples } from "@/examples/components/menubar/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Menubar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Menubar" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MenubarExamples />
      </div>
    </div>
  );
}
