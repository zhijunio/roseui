import { ComponentPreview } from "@/components/docs/component-preview";

export const metadata = { title: "Two-factor Setup" };

export default function TwoFactorSetupPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 [&>*]:min-w-0">
      <ComponentPreview
        standaloneHref="/pre-blocks/auth/two-factor-setup/totp"
        title="TOTP authenticator"
        layout="fullStack"
        previewClassName="mx-auto w-full max-w-3xl"
      >
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="TOTP authenticator"
            src="/pre-blocks/auth/two-factor-setup/totp"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview
        standaloneHref="/pre-blocks/auth/two-factor-setup/email"
        title="Email code"
        layout="fullStack"
        previewClassName="mx-auto w-full max-w-3xl"
      >
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Email code"
            src="/pre-blocks/auth/two-factor-setup/email"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview
        standaloneHref="/pre-blocks/auth/two-factor-setup/backup"
        title="Backup codes"
        layout="fullStack"
      >
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Backup codes"
            src="/pre-blocks/auth/two-factor-setup/backup"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview
        standaloneHref="/pre-blocks/auth/two-factor-setup/recovery"
        title="Recovery phrase"
        layout="fullStack"
      >
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Recovery phrase"
            src="/pre-blocks/auth/two-factor-setup/recovery"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
