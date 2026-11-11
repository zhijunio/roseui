import { NavbarExamples } from "@/components/examples/components/navbar/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Navbar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Navbar" description="Usage examples for the Navbar component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NavbarExamples />
      </div>
    </div>
  );
}
