import { CopyButtonExamples } from "@/components/examples/copy-button/copy-button";

export const metadata = { title: "Copy Button" };

export default function CopyButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <CopyButtonExamples />
    </div>
  );
}
