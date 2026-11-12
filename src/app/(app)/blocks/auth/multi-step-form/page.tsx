import { MultiStepFormExample } from "@/examples/blocks/auth/multi-step-form/multi-step-form";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Multi-step Form" };

export default function MultiStepFormPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Multi-step Form" />
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
