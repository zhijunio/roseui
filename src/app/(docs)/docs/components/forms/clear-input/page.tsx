import type { Metadata } from "next";

import { ClearInputExamples } from "@/components/examples/clear-input/clear-input";

export const metadata: Metadata = {
  title: "Clear Input",
  description: "A controlled text input with an accessible clear action.",
};

export default function ClearInputPage() {
  return <ClearInputExamples />;
}
