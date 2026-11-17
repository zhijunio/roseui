import * as React from "react";

import { ButtonClient, type RoseButtonProps } from "@/components/roseui/button-client";
import { buttonVariants } from "@/components/ui/button";

const RoseButton = React.forwardRef<HTMLButtonElement, RoseButtonProps>(({ variant, size, ...props }, ref) => {
  const resolvedVariant = variant ?? "default";
  const resolvedSize = size ?? "default";

  return (
    <ButtonClient
      ref={ref}
      variant={resolvedVariant}
      size={resolvedSize}
      variantClassName={buttonVariants({ variant: resolvedVariant, size: resolvedSize })}
      {...props}
    />
  );
});

RoseButton.displayName = "RoseButton";

export type { RoseButtonProps };
export { RoseButton };
