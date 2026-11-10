
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { IconArrowRight, IconLoader2, IconPlus, IconSearch } from "@tabler/icons-react";
import { people } from "@/data/avatar-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { StatusDot } from "@/components/ui/status-dot";
import { AvatarButton } from "@/components/composite/avatar-button";
import { PaymentButton } from "@/components/composite/payment-button";
import { ComponentPreview } from "@/components/composite/component-preview";

const iconVariants = ["outline", "secondary", "ghost", "destructive"] as const;
const textSizes = ["xs", "sm", "default", "lg"] as const;
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;

export function ButtonAdornmentExample() {
  return (
    <>
      <Button variant="outline">Button<span className="rounded-full bg-foreground/10 px-1.5 text-xs">5</span></Button>
      <Button variant="outline">Button<span className="rounded-full bg-foreground/10 px-1.5 text-xs">12</span></Button>
      <Button variant="outline"><IconSearch data-icon="inline-start" />Search<Kbd>⌘K</Kbd></Button>
      <Button variant="outline"><StatusDot color="success" />Available</Button>
      <Button variant="ghost" aria-label="Updates (new)">Updates<Badge variant="secondary" size="sm">New</Badge></Button>
      <AvatarButton label="Account" src={people[0].avatar} fallback="AM" />
      <AvatarButton label="Account" src={people[0].avatar} fallback="AM" variant="secondary" />
      <AvatarButton label="Account" src={people[0].avatar} fallback="AM" size="sm" />
      <AvatarButton label="Account" src={people[0].avatar} fallback="AM" variant="secondary" size="sm" />
      <PaymentButton />
    </>
  );
}

export function ButtonIconExample() {
  return (
    <>
      {iconVariants.map((variant) => (
        <span key={variant} className="contents">
          <Button variant={variant}><IconPlus data-icon="inline-start" />Button</Button>
          <Button variant={variant}>Button<IconArrowRight data-icon="inline-end" /></Button>
        </span>
      ))}
      <Button variant="outline" size="lg"><IconPlus data-icon="inline-start" />Button</Button>
      <Button variant="outline" size="lg">Button<IconArrowRight data-icon="inline-end" /></Button>
    </>
  );
}

export function ButtonSizeExample() {
  return (
    <>
      {textSizes.map((size) => <Button key={size} variant="outline" size={size}>Button</Button>)}
      {iconSizes.map((size) => <Button key={size} variant="outline" size={size} aria-label="Add item"><IconPlus /></Button>)}
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
      <span role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {status === "saved" ? "Changes saved." : status === "saving" ? "Saving your changes…" : "Ready to save."}
      </span>
    </div>
  );
}

export function ButtonExamples() {
  return (
    <>
      <ComponentPreview previewId="button-01" title="Variants"><ButtonVariantExample /></ComponentPreview>
      <ComponentPreview previewId="button-02" title="Sizes"><ButtonSizeExample /></ComponentPreview>
      <ComponentPreview previewId="button-03" title="Icons"><ButtonIconExample /></ComponentPreview>
      <ComponentPreview previewId="button-04" title="States"><ButtonStateExample /></ComponentPreview>
      <ComponentPreview previewId="button-05" title="Async label and focus"><AsyncLabelButton /></ComponentPreview>
      <ComponentPreview previewId="button-06" title="Adornments"><ButtonAdornmentExample /></ComponentPreview>
      <ComponentPreview previewId="button-07" title="Full Width" layout="field">
        <Button className="w-full">Continue</Button>
      </ComponentPreview>
    </>
  );
}
