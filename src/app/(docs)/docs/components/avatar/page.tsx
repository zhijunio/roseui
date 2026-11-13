import { AvatarExamples } from "@/examples/components/avatar/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Avatar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Avatar" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AvatarExamples />
      </div>
    </div>
  );
}
