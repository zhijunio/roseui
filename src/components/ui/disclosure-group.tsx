"use client";

import { use } from "react";
import { Button, type ButtonProps } from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import {
  Disclosure as DisclosurePrimitive,
  type DisclosureProps,
} from "react-aria-components/Disclosure";
import type {
  DisclosureGroupProps,
  DisclosurePanelProps,
} from "react-aria-components/DisclosureGroup";
import {
  DisclosureGroup as DisclosureGroupPrimitive,
  DisclosurePanel as DisclosurePanelPrimitive,
  DisclosureStateContext,
} from "react-aria-components/DisclosureGroup";
import { Heading } from "react-aria-components/Heading";
import { ChevronDown as IconChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export function DisclosureGroup({ className, ...props }: DisclosureGroupProps) {
  return <DisclosureGroupPrimitive className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function Disclosure({ className, ...props }: DisclosureProps) {
  return (
    <DisclosurePrimitive
      className={composeRenderProps(className, (resolved, { isExpanded, isFocusVisibleWithin }) =>
        cn(
          "w-full rounded-lg border border-border bg-background transition-colors",
          (isExpanded || isFocusVisibleWithin) && "border-ring/50 bg-muted/20",
          resolved,
        ),
      )}
      {...props}
    />
  );
}

export interface DisclosureTriggerProps extends ButtonProps {
  triggerIndicator?: boolean;
}

export function DisclosureTrigger({ className, triggerIndicator = true, ...props }: DisclosureTriggerProps) {
  const state = use(DisclosureStateContext)!;
  return (
    <Heading>
      <Button
        {...props}
        slot="trigger"
        className={cn("flex w-full items-center justify-between gap-4 px-4 py-3 text-start text-sm font-medium", className)}
      >
        {(values) => (
          <>
            {typeof props.children === "function" ? props.children(values) : props.children}
            {triggerIndicator && (
              <IconChevronDown
                aria-hidden="true"
                className={cn("size-4 shrink-0 text-muted-foreground transition-transform", state.isExpanded && "rotate-180")}
              />
            )}
          </>
        )}
      </Button>
    </Heading>
  );
}

export function DisclosurePanel({ className, ...props }: DisclosurePanelProps) {
  return (
    <DisclosurePanelPrimitive data-slot="disclosure-panel" className={cn("overflow-hidden text-sm", className)}>
      <div className="px-4 pb-4 text-muted-foreground">{props.children}</div>
    </DisclosurePanelPrimitive>
  );
}
