import { TypographyExamples } from "@/components/examples/typography/typography";

export const metadata = { title: "Typography" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TypographyExamples />
      </div>
    </div>
  );
}
