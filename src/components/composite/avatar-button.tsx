import type { ComponentProps, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AvatarButton({
  label,
  src,
  alt = "",
  fallback,
  avatarSize = "xs",
  variant = "outline",
  ...buttonProps
}: {
  label: ReactNode;
  src?: string;
  alt?: string;
  fallback?: ReactNode;
  avatarSize?: ComponentProps<typeof Avatar>["size"];
} & Omit<ComponentProps<typeof Button>, "children">) {
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
