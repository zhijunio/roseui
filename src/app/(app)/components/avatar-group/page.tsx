import { AvatarGroupExamples } from "@/components/examples/components/avatar-group/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Avatar Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Avatar Group" description="Usage examples for the Avatar Group component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AvatarGroupExamples />
      </div>
    </div>
  );
}
