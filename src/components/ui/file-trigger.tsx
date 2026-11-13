"use client";

import type { ReactNode } from "react";

import { Paperclip } from "lucide-react";
import {
  FileTrigger as FileTriggerPrimitive,
  type FileTriggerProps as FileTriggerPrimitiveProps,
} from "react-aria-components/FileTrigger";

import { Button, type ButtonProps } from "@/components/ui/button";

export type FileTriggerProps = FileTriggerPrimitiveProps & {
  children?: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  isDisabled?: boolean;
  className?: string;
};

export function FileTrigger({
  children = "Browse files",
  variant = "outline",
  size = "default",
  isDisabled = false,
  className,
  ...props
}: FileTriggerProps) {
  return (
    <FileTriggerPrimitive {...props}>
      <Button variant={variant} size={size} isDisabled={isDisabled} className={className}>
        <Paperclip data-icon="inline-start" aria-hidden="true" />
        {children}
      </Button>
    </FileTriggerPrimitive>
  );
}
