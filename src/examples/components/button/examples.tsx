"use client";

import { useState } from "react";

import { IconArrowRight, IconLoader2, IconPlus, IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { AvatarButton } from "@/components/ui/avatar-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { PaymentButton } from "@/components/ui/payment-button";
import { StatusDot } from "@/components/ui/status-dot";
import { users } from "@/data/user";
import { ComponentPreview } from "@/examples/component-preview";

const iconVariants = ["outline", "secondary", "ghost", "destructive"] as const;
const textSizes = ["xs", "sm", "default", "lg"] as const;
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;

export function ButtonAdornmentExample() {
  return (
    <>
      <Button variant="outline">
        Button<span className="bg-foreground/10 rounded-full px-1.5 text-xs">5</span>
      </Button>
      <Button variant="outline">
        Button<span className="bg-foreground/10 rounded-full px-1.5 text-xs">12</span>
      </Button>
      <Button variant="outline">
        <IconSearch data-icon="inline-start" />
        Search
        <Kbd>⌘K</Kbd>
      </Button>
      <Button variant="outline">
        <StatusDot color="success" />
        Available
      </Button>
      <Button variant="ghost" aria-label="Updates (new)">
        Updates
        <Badge variant="secondary" size="sm">
          New
        </Badge>
      </Button>
      <AvatarButton label="Account" src={users[0].avatar} fallback="AM" />
      <AvatarButton label="Account" src={users[0].avatar} fallback="AM" variant="secondary" />
      <AvatarButton label="Account" src={users[0].avatar} fallback="AM" size="sm" />
      <AvatarButton label="Account" src={users[0].avatar} fallback="AM" variant="secondary" size="sm" />
      <PaymentButton />
    </>
  );
}

export function ButtonIconExample() {
  return (
    <>
      {iconVariants.map((variant) => (
        <span key={variant} className="contents">
          <Button variant={variant}>
            <IconPlus data-icon="inline-start" />
            Button
          </Button>
          <Button variant={variant}>
            Button
            <IconArrowRight data-icon="inline-end" />
          </Button>
        </span>
      ))}
      <Button variant="outline" size="lg">
        <IconPlus data-icon="inline-start" />
        Button
      </Button>
      <Button variant="outline" size="lg">
        Button
        <IconArrowRight data-icon="inline-end" />
      </Button>
    </>
  );
}

export function ButtonSizeExample() {
  return (
    <>
      {textSizes.map((size) => (
        <Button key={size} variant="outline" size={size}>
          Button
        </Button>
      ))}
      {iconSizes.map((size) => (
        <Button key={size} variant="outline" size={size} aria-label="Add item">
          <IconPlus />
        </Button>
      ))}
    </>
  );
}

export function ButtonStateExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" disabled>
        Unavailable
      </Button>
      <Button variant="outline" aria-invalid="true">
        Needs attention
      </Button>
      <Button variant="outline" disabled aria-busy="true">
        <IconLoader2 aria-hidden className="motion-safe:animate-spin" />
        Saving changes
      </Button>
    </div>
  );
}

export function ButtonVariantExample() {
  return (
    <>
      <Button>Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="link">Button</Button>
    </>
  );
}

function AsyncLabelButton() {
  const [status, setStatus] = useState<"ready" | "saving" | "saved">("ready");
  const reducedMotion = useReducedMotion();

  const save = () => {
    if (status === "saving") return;
    setStatus("saving");
    window.setTimeout(() => setStatus("saved"), 700);
  };

  const label = status === "saving" ? "Saving" : status === "saved" ? "Saved" : "Save changes";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        aria-busy={status === "saving"}
        aria-disabled={status === "saving" || undefined}
        onClick={save}
        onKeyDown={(event) => {
          if (status === "saving" && (event.key === "Enter" || event.key === " ")) event.preventDefault();
        }}
        className="min-w-28"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={status}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(3px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(3px)" }}
            transition={{ duration: reducedMotion ? 0 : 0.16 }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </Button>
      <span role="status" aria-live="polite" className="text-muted-foreground text-sm">
        {status === "saved" ? "Changes saved." : status === "saving" ? "Saving your changes." : "Ready to save."}
      </span>
    </div>
  );
}

export function ButtonExamples() {
  return (
    <>
      <ComponentPreview title="Variants">
        <ButtonVariantExample />
      </ComponentPreview>
      <ComponentPreview title="Sizes">
        <ButtonSizeExample />
      </ComponentPreview>
      <ComponentPreview title="Icons">
        <ButtonIconExample />
      </ComponentPreview>
      <ComponentPreview title="States">
        <ButtonStateExample />
      </ComponentPreview>
      <ComponentPreview title="Async label and focus">
        <AsyncLabelButton />
      </ComponentPreview>
      <ComponentPreview title="Adornments">
        <ButtonAdornmentExample />
      </ComponentPreview>
      <ComponentPreview title="Full Width" layout="field">
        <Button className="w-full">Continue</Button>
      </ComponentPreview>
    </>
  );
}
