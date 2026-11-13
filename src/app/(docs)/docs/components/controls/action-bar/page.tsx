import { ActionBarExamples } from "@/components/examples/action-bar/action-bar";

export const metadata = { title: "Action Bar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ActionBarExamples />
      </div>
    </div>
  );
}
