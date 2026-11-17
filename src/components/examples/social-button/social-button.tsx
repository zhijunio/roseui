"use client";

import { useState } from "react";

import { Building as IconBuilding } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { SocialButton } from "@/components/roseui/social-button";
import { SOCIAL_PROVIDERS, type SocialProvider } from "@/components/roseui/social-providers";

const providers = Object.keys(SOCIAL_PROVIDERS) as SocialProvider[];

export function SocialButtonExamples() {
  const [status, setStatus] = useState("");

  return (
    <>
      <ComponentPreview title="Providers" span={2} layout="grid3">
        {providers.map((brand) => (
          <SocialButton key={brand} brand={brand} appearance="white" fullWidth />
        ))}
      </ComponentPreview>

      <ComponentPreview title="Appearance" layout="stack">
        <SocialButton brand="google" appearance="colorful" />
        <SocialButton brand="google" appearance="black" />
        <SocialButton brand="google" appearance="white" />
        <SocialButton brand="github" appearance="white" size="sm" />
        <SocialButton brand="github" appearance="white" disabled />
      </ComponentPreview>

      <ComponentPreview title="Labels and Layout" layout="stack">
        <SocialButton brand="google" appearance="white" />
        <SocialButton brand="google" appearance="white">
          Sign up with Google
        </SocialButton>
        <SocialButton brand="google" appearance="white" fullWidth>
          Continue with Google
        </SocialButton>
        <div className="flex gap-2">
          <SocialButton brand="google" appearance="white" iconOnly aria-label="Continue with Google" />
          <SocialButton brand="apple" appearance="white" iconOnly aria-label="Continue with Apple" />
          <SocialButton brand="github" appearance="white" iconOnly aria-label="Continue with GitHub" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Actions and Custom Brand" layout="stack">
        <div className="space-y-3">
          <SocialButton brand="google" appearance="white" onClick={() => setStatus("Google sign-in started.")}>
            Continue with Google
          </SocialButton>
          <SocialButton brand="github" appearance="white" href="https://github.com/login">
            Continue to GitHub
          </SocialButton>
          <SocialButton
            brand="custom"
            appearance="colorful"
            config={{ icon: <IconBuilding className="size-full" />, label: "Acme", color: "#334155" }}
          >
            Continue with Acme
          </SocialButton>
          {status ? (
            <p role="status" aria-live="polite" className="text-muted-foreground text-sm">
              {status}
            </p>
          ) : null}
        </div>
      </ComponentPreview>
    </>
  );
}
