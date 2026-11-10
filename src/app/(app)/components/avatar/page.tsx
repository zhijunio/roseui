import { PageHeader } from "@/components/page-header";
import { AvatarExamples } from "@/app/(app)/components/avatar/examples";

export const metadata = { title: "Avatar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Avatar" description="Usage examples for the Avatar component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AvatarExamples />
      </div>
    </div>
  );
}
