import { MultiStepFormExample } from "@/components/examples/blocks/auth/multi-step-form/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Multi-step Form" };

export default function MultiStepFormPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Multi-step Form"
        description="Guide workspace setup through focused steps with review before completion."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview title="Workspace setup" layout="fullStack" span={2}>
          <div className="mx-auto w-full max-w-2xl px-1 py-2 sm:px-2">
            <MultiStepFormExample />
          </div>
        </ComponentPreview>
      </div>
    </div>
  );
}
