import { SnippetExamples } from "@/components/examples/snippet/snippet";

export const metadata = { title: "Snippet" };

export default function SnippetPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <SnippetExamples />
    </div>
  );
}
