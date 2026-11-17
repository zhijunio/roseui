import { CloseButtonExamples } from "@/components/examples/close-button/close-button";

export const metadata = { title: "Close Button" };

export default function CloseButtonPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <CloseButtonExamples />
    </div>
  );
}
