import { siGithub } from "simple-icons";

import { cn } from "@/lib/utils";

import { SOCIAL_PROVIDERS } from "./social-providers";

type BrandIconProps = {
  name: "github" | "slack";
  className?: string;
};

export function BrandIcon({ name, className }: BrandIconProps) {
  if (name === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("size-4", className)}>
        <path d={siGithub.path} fill="currentColor" />
      </svg>
    );
  }

  const { viewBox, path } = SOCIAL_PROVIDERS.slack;

  return (
    <svg aria-hidden="true" viewBox={viewBox} className={cn("size-4", className)}>
      <path d={path} fill="currentColor" />
    </svg>
  );
}
