import { ComponentPreview } from "@/components/docs/component-preview";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 [&>*]:min-w-0">
      <ComponentPreview standaloneHref="/pre-blocks/auth/sign-in/password" title="Password sign-in" layout="fullStack">
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Password sign-in"
            src="/pre-blocks/auth/sign-in/password"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview standaloneHref="/pre-blocks/auth/sign-in/magic-link" title="Magic link" layout="fullStack">
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Magic link"
            src="/pre-blocks/auth/sign-in/magic-link"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview standaloneHref="/pre-blocks/auth/sign-in/passkey" title="Email and passkey" layout="fullStack">
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Email and passkey"
            src="/pre-blocks/auth/sign-in/passkey"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview
        standaloneHref="/pre-blocks/auth/sign-in/method"
        title="Choose a Sign-In Method"
        layout="fullStack"
      >
        <div className="h-[min(75vh,56rem)] min-h-[36rem] w-full group-data-[preview-fullscreen=true]/component-preview:h-full group-data-[preview-fullscreen=true]/component-preview:min-h-0">
          <iframe
            title="Choose a Sign-In Method"
            src="/pre-blocks/auth/sign-in/method"
            loading="lazy"
            className="block h-full w-full border-0"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
