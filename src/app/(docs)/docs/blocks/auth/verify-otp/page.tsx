import type { Metadata } from "next";

import { ComponentPreview } from "@/components/docs/component-preview";

export const metadata: Metadata = { title: "Verify one-time password" };

export default function VerifyOtpPage() {
  return (
    <ComponentPreview standaloneHref="/pre-blocks/auth/verify-otp" title="Two-factor verification" layout="fullBleed">
      <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
        <iframe
          title="Two-factor verification"
          src="/pre-blocks/auth/verify-otp"
          loading="lazy"
          className="block h-full w-full border-0"
        />
      </div>
    </ComponentPreview>
  );
}
