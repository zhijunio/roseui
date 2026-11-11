import type { Metadata } from "next";

import { AvailabilityPickerExample } from "@/components/examples/blocks/people/availability-picker/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Availability Picker",
  description: "Choose a time that works for the people joining a meeting.",
};

export default function AvailabilityPickerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Availability Picker"
        description="Compare shared availability and confirm a time without leaving the flow."
      />
      <ComponentPreview title="Shared availability" layout="fullStack">
        <AvailabilityPickerExample />
      </ComponentPreview>
    </div>
  );
}
