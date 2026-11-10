import { IconBuilding } from "@tabler/icons-react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { SocialButton } from "@/components/composite/social-button";
import { SOCIAL_PROVIDERS, type SocialProvider } from "@/components/ui/social-providers";

const providers = Object.keys(SOCIAL_PROVIDERS) as SocialProvider[];

export function SocialButtonExamples() {
  return (
    <>
      <ComponentPreview previewId="social-button-01"
        title="Brands"

        span={2}
        layout="grid3"
      >
        {providers.map((brand) => (
          <SocialButton key={brand} brand={brand} appearance="white" fullWidth />
        ))}
      </ComponentPreview>

      <ComponentPreview previewId="social-button-02"
        title="Appearance"

        layout="stack"
        exampleLabels={["Colorful", "Black", "White"]}
      >
        <SocialButton brand="google" appearance="colorful" />
        <SocialButton brand="google" appearance="black" />
        <SocialButton brand="google" appearance="white" />
      </ComponentPreview>

      <ComponentPreview previewId="social-button-03"
        title="Sizes"

        layout="stack"
        exampleLabels={["Default", "Compact", "Full width"]}
      >
        <SocialButton brand="github" appearance="white" size="default" />
        <SocialButton brand="github" appearance="white" size="sm" />
        <SocialButton brand="github" appearance="white" fullWidth />
      </ComponentPreview>

      <ComponentPreview previewId="social-button-04"
        title="Icon Only"

      >
        <SocialButton brand="google" appearance="white" iconOnly aria-label="Continue with Google" />
        <SocialButton brand="apple" appearance="white" iconOnly aria-label="Continue with Apple" />
        <SocialButton brand="github" appearance="white" iconOnly aria-label="Continue with GitHub" />
      </ComponentPreview>

      <ComponentPreview previewId="social-button-05"
        title="Custom Brand"

      >
        <SocialButton
          brand="custom"
          appearance="colorful"
          config={{ icon: <IconBuilding className="size-full" />, label: "Acme", color: "#334155" }}
        >
          Continue with Acme
        </SocialButton>
      </ComponentPreview>

      <ComponentPreview previewId="social-button-06"
        title="Labels"

        layout="stack"
        exampleLabels={["Provider default", "Sign-up action", "Login action"]}
      >
        <SocialButton brand="google" appearance="white" />
        <SocialButton brand="google" appearance="white">Sign up with Google</SocialButton>
        <SocialButton brand="google" appearance="white">Log in with Google</SocialButton>
      </ComponentPreview>

      <ComponentPreview previewId="social-button-07"
        title="Buttons and Links"

      >
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
