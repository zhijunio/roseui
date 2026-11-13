"use client";

import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

type ButtonBehaviorProps = ButtonPrimitiveProps;

type ButtonDOMProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "children" | "className" | "disabled" | keyof ButtonPrimitiveProps
>;

export type ButtonProps = ButtonBehaviorProps & ButtonDOMProps & VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <ButtonPrimitive
        ref={ref}
        {...props}
        type={props.type ?? "button"}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={composeRenderProps(className, (className) =>
          cn(buttonVariants({ variant, size }), className),
        )}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
