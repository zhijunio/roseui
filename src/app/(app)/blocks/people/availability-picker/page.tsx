import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { AvailabilityPickerExample } from "./examples";

export const metadata: Metadata = { title: "Availability Picker", description: "Choose a time that works for the people joining a meeting." };

export default function AvailabilityPickerPage() {
  return <div className="space-y-6"><PageHeader title="Availability Picker" description="Compare shared availability and confirm a time without leaving the flow." /><ComponentPreview previewId="people-availability-picker-01" title="Shared availability" layout="fullStack"><AvailabilityPickerExample /></ComponentPreview></div>;
}
