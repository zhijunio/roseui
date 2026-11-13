import { ComponentPreview } from "@/components/docs/component-preview";

export const metadata = { title: "Multi-step Form" };

export default function MultiStepFormPage() {
  return (
    <div className="space-y-6">
      <ComponentPreview
        standaloneHref="/pre-blocks/auth/multi-step-form"
        title="Workspace setup"
        layout="fullStack"
        span={2}
      >
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Workspace setup"
            src="/pre-blocks/auth/multi-step-form"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
