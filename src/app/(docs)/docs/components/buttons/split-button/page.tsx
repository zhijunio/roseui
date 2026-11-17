import { SplitButtonExamples } from "@/components/examples/split-button/split-button";

export const metadata = { title: "Split Button" };

export default function SplitButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <SplitButtonExamples />
    </div>
  );
}
