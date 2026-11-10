import { PageHeader } from "@/components/page-header";
import { ErrorMessageExamples } from "@/app/(app)/components/error-message/examples";

export const metadata = { title: "Error Message" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Error Message" description="Usage examples for the Error Message component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ErrorMessageExamples />
      </div>
    </div>
  );
}
