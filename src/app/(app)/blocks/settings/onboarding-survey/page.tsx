import type { Metadata } from "next";

import { OnboardingSurveyExample } from "@/examples/blocks/settings/onboarding-survey/onboarding-survey";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata: Metadata = {
  title: "Onboarding Survey",
  description: "A compact multi-step onboarding survey.",
};
export default function OnboardingSurveyPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Onboarding Survey" />
      <ComponentPreview title="Onboarding" layout="fullStack">
        <OnboardingSurveyExample />
      </ComponentPreview>
    </div>
  );
}
