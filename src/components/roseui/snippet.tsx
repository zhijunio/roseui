"use client";

import { Fragment, type ReactNode } from "react";

import { CopyButton } from "@/components/roseui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function Snippet({ className, ...props }: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs
      className={cn(
        "group/snippet w-full gap-0 overflow-hidden rounded-lg border border-border bg-background",
        className,
      )}
      {...props}
    />
  );
}

type CollectionProps<T> = {
  items?: Iterable<T>;
  children?: ReactNode | ((item: T) => ReactNode);
  className?: string;
  [key: string]: unknown;
};

export function SnippetTabsList<T extends { id: string }>({
  className,
  items,
  children,
  ...props
}: CollectionProps<T>) {
  const content: ReactNode =
    typeof children === "function"
      ? items
        ? Array.from(items, (item) => <Fragment key={item.id}>{children(item)}</Fragment>)
        : null
      : children;
  return (
    <TabsList
      data-slot="snippet-tabs-list"
      variant="line"
      className={cn(
        "flex-row gap-x-1 overflow-y-visible rounded-none border-b border-border bg-background px-4 py-2",
        className,
      )}
      {...props}
    >
      {content}
    </TabsList>
  );
}

export function SnippetTab({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) {
  return <TabsTrigger className={cn("gap-1.5", className)} {...props} />;
}

export function SnippetTabPanels<T extends { id: string }>({ items, children }: CollectionProps<T>) {
  const content: ReactNode =
    typeof children === "function"
      ? items
        ? Array.from(items, (item) => <Fragment key={item.id}>{children(item)}</Fragment>)
        : null
      : children;
  return <>{content}</>;
}

export function SnippetTabPanel({
  className,
  children,
  onCopy,
  id,
  value,
  ...props
}: Omit<React.ComponentProps<typeof TabsContent>, "value"> & {
  onCopy?: (text: string) => void;
  id?: string;
  value?: string;
}) {
  const copyValue = typeof children === "string" ? children : undefined;
  return (
    <TabsContent
      value={value ?? id ?? "snippet"}
      className={cn("mt-0 bg-background px-4 py-2 text-sm", className)}
      {...props}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <pre className="min-w-0 overflow-x-auto whitespace-pre">{children}</pre>
        {copyValue !== undefined ? (
          <CopyButton
            value={copyValue}
            iconOnly
            aria-label="Copy snippet"
            className="-me-2 shrink-0"
            onCopied={() => onCopy?.(copyValue)}
          />
        ) : null}
      </div>
    </TabsContent>
  );
}
