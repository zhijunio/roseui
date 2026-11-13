import { VirtualizerExamples } from "@/components/examples/virtualizer/virtualizer";

export const metadata = { title: "Virtualizer" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <VirtualizerExamples />
    </div>
  );
}
