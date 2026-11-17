import type { ComponentProps, ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/roseui/avatar";
import { Button } from "@/components/ui/button";

export type AvatarButtonProps = {
  label: ReactNode;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  avatarSize?: ComponentProps<typeof Avatar>["size"];
} & Omit<ComponentProps<typeof Button>, "children">;

export function AvatarButton({
  label,
  src,
  alt = "",
  fallback,
  avatarSize = "xs",
  variant = "outline",
  ...buttonProps
}: AvatarButtonProps) {
  return (
    <Button {...buttonProps} variant={variant}>
      <Avatar size={avatarSize}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      {label}
    </Button>
  );
}
