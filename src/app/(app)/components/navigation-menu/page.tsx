import { PageHeader } from "@/components/page-header";
import { NavigationMenuExamples } from "@/app/(app)/components/navigation-menu/examples";

export const metadata = { title: "Navigation Menu" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Navigation Menu" description="Usage examples for the Navigation Menu component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NavigationMenuExamples />
      </div>
    </div>
  );
}
