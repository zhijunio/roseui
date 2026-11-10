import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ComponentPreview } from "@/components/composite/component-preview"
import { OnboardingSurveyExample } from "./examples"

export const metadata: Metadata = { title: "Onboarding Survey", description: "A compact multi-step onboarding survey." }
export default function OnboardingSurveyPage() { return <div className="space-y-6"><PageHeader title="Onboarding Survey" description="Collect an onboarding answer one focused step at a time." /><ComponentPreview previewId="settings-onboarding-survey-01" title="Onboarding" layout="fullStack"><OnboardingSurveyExample /></ComponentPreview></div> }
