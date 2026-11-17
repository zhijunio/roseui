import { ExpandableButtonExamples } from "@/components/examples/expandable-button/expandable-button";

export const metadata = { title: "Expandable Button" };

export default function ExpandableButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ExpandableButtonExamples />
    </div>
  );
}
