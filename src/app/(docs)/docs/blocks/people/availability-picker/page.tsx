import type { Metadata } from "next";

import { AvailabilityPickerExample } from "@/examples/blocks/people/availability-picker/availability-picker";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Availability Picker",
  description: "Choose a time that works for the people joining a meeting.",
};

export default function AvailabilityPickerPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Availability Picker" />
      <ComponentPreview title="Shared availability" layout="fullStack">
        <AvailabilityPickerExample />
      </ComponentPreview>
    </div>
  );
}
