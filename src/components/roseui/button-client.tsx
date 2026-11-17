"use client";

import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonDOMProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  "data-slot"?: string;
  "data-variant"?: string;
  "data-size"?: string;
  "data-pressed"?: boolean;
};

export type RoseButtonState = { isPending: boolean; isPressed: boolean };

export type RoseButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "disabled"
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    disabled?: boolean;
    isPending?: boolean;
    children?: React.ReactNode | ((state: RoseButtonState) => React.ReactNode);
    className?: string | ((state: RoseButtonState) => string);
    render?: (props: ButtonDOMProps, state: RoseButtonState) => React.ReactElement;
  };

type ButtonClientProps = RoseButtonProps & { variantClassName: string };

export const ButtonClient = React.forwardRef<HTMLButtonElement, ButtonClientProps>(
  (
    {
      asChild = false,
      className,
      variantClassName,
      variant = "default",
      size = "default",
      disabled,
      isPending = false,
      render,
      children,
      onClick,
      type,
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    const state: RoseButtonState = { isPending, isPressed };
    const resolvedClassName = typeof className === "function" ? className(state) : className;
    const buttonClassName = cn(variantClassName, resolvedClassName);
    const content = typeof children === "function" ? children(state) : children;
    const isDisabledValue = disabled ?? false;
    const domProps: ButtonDOMProps = {
      ...props,
      type: type ?? "button",
      disabled: isDisabledValue,
      "aria-disabled": isPending ? true : undefined,
      "aria-busy": isPending ? true : undefined,
      "data-slot": "button",
      "data-variant": variant ?? undefined,
      "data-size": size ?? undefined,
      "data-pressed": isPressed || undefined,
      className: buttonClassName,
      onClick: (event) => {
        onClick?.(event);
        if (event.defaultPrevented || isDisabledValue || isPending) {
          if (isPending) event.preventDefault();
          return;
        }
      },
      onPointerDown: (event) => {
        props.onPointerDown?.(event);
        if (!event.defaultPrevented) setIsPressed(true);
      },
      onPointerUp: (event) => {
        props.onPointerUp?.(event);
        setIsPressed(false);
      },
      onPointerCancel: (event) => {
        props.onPointerCancel?.(event);
        setIsPressed(false);
      },
      onBlur: (event) => {
        props.onBlur?.(event);
        setIsPressed(false);
      },
    };
    if (render) return render(domProps, state);
    const Component = asChild ? Slot : "button";
    return (
      <Component ref={ref} {...domProps} type={asChild ? undefined : domProps.type}>
        {content}
      </Component>
    );
  },
);

ButtonClient.displayName = "ButtonClient";
