import { MenubarExamples } from "@/components/examples/components/menubar/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Menubar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Menubar" description="Usage examples for the Menubar component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MenubarExamples />
      </div>
    </div>
  );
}
