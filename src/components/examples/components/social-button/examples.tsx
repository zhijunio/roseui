import { IconBuilding } from "@tabler/icons-react";

import { SocialButton } from "@/components/composite/social-button";
import { ComponentPreview } from "@/components/examples/component-preview";
import { SOCIAL_PROVIDERS, type SocialProvider } from "@/components/ui/social-providers";

const providers = Object.keys(SOCIAL_PROVIDERS) as SocialProvider[];

export function SocialButtonExamples() {
  return (
    <>
      <ComponentPreview title="Brands" span={2} layout="grid3">
        {providers.map((brand) => (
          <SocialButton key={brand} brand={brand} appearance="white" fullWidth />
        ))}
      </ComponentPreview>

      <ComponentPreview title="Appearance" layout="stack" exampleLabels={["Colorful", "Black", "White"]}>
        <SocialButton brand="google" appearance="colorful" />
        <SocialButton brand="google" appearance="black" />
        <SocialButton brand="google" appearance="white" />
      </ComponentPreview>

      <ComponentPreview title="Sizes" layout="stack" exampleLabels={["Default", "Compact", "Full width"]}>
        <SocialButton brand="github" appearance="white" size="default" />
        <SocialButton brand="github" appearance="white" size="sm" />
        <SocialButton brand="github" appearance="white" fullWidth />
      </ComponentPreview>

      <ComponentPreview title="Icon Only">
        <SocialButton brand="google" appearance="white" iconOnly aria-label="Continue with Google" />
        <SocialButton brand="apple" appearance="white" iconOnly aria-label="Continue with Apple" />
        <SocialButton brand="github" appearance="white" iconOnly aria-label="Continue with GitHub" />
      </ComponentPreview>

      <ComponentPreview title="Custom Brand">
        <SocialButton
          brand="custom"
          appearance="colorful"
          config={{ icon: <IconBuilding className="size-full" />, label: "Acme", color: "#334155" }}
        >
          Continue with Acme
        </SocialButton>
      </ComponentPreview>

      <ComponentPreview
        title="Labels"
        layout="stack"
        exampleLabels={["Provider default", "Sign-up action", "Login action"]}
      >
        <SocialButton brand="google" appearance="white" />
        <SocialButton brand="google" appearance="white">
          Sign up with Google
        </SocialButton>
        <SocialButton brand="google" appearance="white">
          Log in with Google
        </SocialButton>
      </ComponentPreview>

      <ComponentPreview title="Buttons and Links">
        <SocialButton brand="google" appearance="white">
          Start Google sign-in
        </SocialButton>
        <SocialButton brand="github" appearance="white" href="https://github.com/login">
          Continue to GitHub
        </SocialButton>
      </ComponentPreview>
    </>
  );
}
