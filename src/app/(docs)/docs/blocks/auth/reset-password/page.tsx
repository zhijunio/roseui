import { ComponentPreview } from "@/components/docs/component-preview";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <ComponentPreview standaloneHref="/pre-blocks/auth/reset-password" title="Set a new password" layout="fullBleed">
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Set a new password"
            src="/pre-blocks/auth/reset-password"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
