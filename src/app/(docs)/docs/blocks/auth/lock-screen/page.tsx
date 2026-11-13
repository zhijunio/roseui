import { ComponentPreview } from "@/components/docs/component-preview";

export default function LockPage() {
  return (
    <div className="space-y-6">
      <ComponentPreview standaloneHref="/pre-blocks/auth/lock-screen" title="Unlock session" layout="fullBleed">
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Unlock session"
            src="/pre-blocks/auth/lock-screen"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
