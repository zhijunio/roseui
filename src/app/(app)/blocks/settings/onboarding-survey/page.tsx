import type { Metadata } from "next";

import { OnboardingSurveyExample } from "@/components/examples/blocks/settings/onboarding-survey/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata: Metadata = {
  title: "Onboarding Survey",
  description: "A compact multi-step onboarding survey.",
};
export default function OnboardingSurveyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Onboarding Survey" description="Collect an onboarding answer one focused step at a time." />
      <ComponentPreview title="Onboarding" layout="fullStack">
        <OnboardingSurveyExample />
      </ComponentPreview>
    </div>
  );
}
