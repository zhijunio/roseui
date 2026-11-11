import { CommandExamples } from "@/components/examples/components/command/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Command" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Command" description="Usage examples for the Command component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CommandExamples />
      </div>
    </div>
  );
}
