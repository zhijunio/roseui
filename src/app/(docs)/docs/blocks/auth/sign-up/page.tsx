import { ComponentPreview } from "@/components/docs/component-preview";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <ComponentPreview standaloneHref="/pre-blocks/auth/sign-up" title="Create account" layout="fullBleed">
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Create account"
            src="/pre-blocks/auth/sign-up"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
