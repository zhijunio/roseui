import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import { MultiStepFormExample } from "./examples";

export const metadata = { title: "Multi-step Form" };

export default function MultiStepFormPage() {
  return <div className="space-y-6"><PageHeader title="Multi-step Form" description="Guide workspace setup through focused steps with review before completion." /><div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0"><ComponentPreview previewId="auth-multi-step-form-01" title="Workspace setup" layout="fullStack" span={2}><div className="mx-auto w-full max-w-2xl px-1 py-2 sm:px-2"><MultiStepFormExample /></div></ComponentPreview></div></div>;
}
