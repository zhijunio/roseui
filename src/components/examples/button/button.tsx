"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { ArrowRight, Check, LoaderCircle, Plus } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";

const textSizes = ["xs", "sm", "default", "lg"] satisfies ButtonProps["size"][];
const iconSizes = ["icon-xs", "icon-sm", "icon", "icon-lg"] satisfies ButtonProps["size"][];

export function ButtonVariantExample() {
  return (
    <>
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </>
  );
}

function ButtonShapeExample() {
  return (
    <>
      <Button variant="outline">Rounded</Button>
      <Button variant="outline" className="rounded-full">
        Pill
      </Button>
      <Button variant="outline" size="icon" className="rounded-full" aria-label="Add item">
        <Plus />
      </Button>
    </>
  );
}

export function ButtonSizeExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {textSizes.map((size) => (
          <Button key={size} variant="outline" size={size}>
            {size === "default" ? "Default" : size.toUpperCase()}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {iconSizes.map((size) => (
          <Button key={size} variant="outline" size={size} aria-label={`Add item (${size})`}>
            <Plus />
          </Button>
        ))}
      </div>
    </div>
  );
}

export function ButtonIconExample() {
  return (
    <>
      <Button variant="outline">
        <Plus data-icon="inline-start" />
        Add item
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Add item">
        <Plus />
      </Button>
    </>
  );
}

function ButtonDisabledExample() {
  return (
    <>
      <Button isDisabled>Unavailable</Button>
      <Button variant="outline" isDisabled>
        Unavailable
      </Button>
      <Button variant="outline" size="icon" isDisabled aria-label="Add item">
        <Plus />
      </Button>
    </>
  );
}

function ButtonPendingExample({ withLoader = false }: { withLoader?: boolean }) {
  const [status, setStatus] = useState<"idle" | "pending" | "saved">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    },
    [],
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        isPending={status === "pending"}
        onPress={() => {
          setStatus("pending");
          timer.current = setTimeout(() => setStatus("saved"), 1500);
        }}
      >
        {({ isPending }) => (
          <>
            {withLoader &&
              (isPending ? (
                <LoaderCircle aria-hidden className="motion-safe:animate-spin" />
              ) : status === "saved" ? (
                <Check aria-hidden />
              ) : (
                <Plus aria-hidden />
              ))}
            {isPending ? "Saving…" : status === "saved" ? "Save again" : "Save changes"}
          </>
        )}
      </Button>
      <span role="status" className="text-muted-foreground text-sm">
        {status === "saved" ? "Changes saved." : ""}
      </span>
    </div>
  );
}

function ButtonLinkExample() {
  return (
    <>
      <Link href="/docs/components/buttons/button-group" className={buttonVariants()}>
        Button group
      </Link>
      <Link href="/docs/components/buttons/button-group" className={buttonVariants({ variant: "outline" })}>
        Explore components
        <ArrowRight data-icon="inline-end" />
      </Link>
    </>
  );
}

function ButtonRenderExample() {
  return (
    <Button
      render={(domProps, { isPressed }) => (
        <button
          {...domProps}
          className={`${domProps.className} motion-safe:data-[pressed]:scale-95`}
          data-pressed={isPressed || undefined}
        />
      )}
    >
      Press me
    </Button>
  );
}

export function ButtonExamples() {
  return (
    <>
      <ComponentPreview title="Variants">
        <ButtonVariantExample />
      </ComponentPreview>
      <ComponentPreview title="Shape">
        <ButtonShapeExample />
      </ComponentPreview>
      <ComponentPreview title="Size">
        <ButtonSizeExample />
      </ComponentPreview>
      <ComponentPreview title="With icon">
        <ButtonIconExample />
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <ButtonDisabledExample />
      </ComponentPreview>
      <ComponentPreview title="Pending">
        <ButtonPendingExample />
      </ComponentPreview>
      <ComponentPreview title="With loader">
        <ButtonPendingExample withLoader />
      </ComponentPreview>
      <ComponentPreview title="Link">
        <ButtonLinkExample />
      </ComponentPreview>
      <ComponentPreview title="Render">
        <ButtonRenderExample />
      </ComponentPreview>
    </>
  );
}
