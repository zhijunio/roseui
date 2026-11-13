import { NavigationMenuExamples } from "@/components/examples/navigation-menu/navigation-menu";

export const metadata = { title: "Navigation Menu" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <NavigationMenuExamples />
      </div>
    </div>
  );
}
