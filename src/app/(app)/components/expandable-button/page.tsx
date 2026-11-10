import type { Metadata } from "next";
import { ExpandableButtonExamples } from "./examples";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Expandable Button" };

export default function ExpandableButtonPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Expandable Button"
        description="Keep a frequent action compact until someone focuses or hovers it."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ExpandableButtonExamples />
      </div>
    </div>
  );
}
