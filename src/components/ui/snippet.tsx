"use client";

import {
  TabPanels as TabPanelsPrimitive,
  type TabPanelProps,
  type TabPanelsProps,
  type TabListProps,
} from "react-aria-components/Tabs";

import { CopyButton } from "@/components/ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function Snippet({ className, ...props }: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs
      className={cn("group/snippet w-full gap-0 overflow-hidden rounded-lg border border-border bg-background", className)}
      {...props}
    />
  );
}

export function SnippetTabsList<T extends object>({ className, ...props }: TabListProps<T>) {
  return (
    <TabsList
      data-slot="snippet-tabs-list"
      variant="line"
      className={cn("flex-row gap-x-1 overflow-y-visible rounded-none border-b border-border bg-background px-4 py-2", className)}
      {...props}
    />
  );
}

export function SnippetTab({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) {
  return <TabsTrigger className={cn("gap-1.5", className)} {...props} />;
}

export function SnippetTabPanels<T extends object>(props: TabPanelsProps<T>) {
  return <TabPanelsPrimitive {...props} />;
}

export function SnippetTabPanel({
  className,
  children,
  onCopy,
  ...props
}: TabPanelProps & { onCopy?: (text: string) => void }) {
  const copyValue = typeof children === "string" ? children : undefined;

  return (
    <TabsContent className={cn("mt-0 bg-background px-4 py-2 text-sm", className)} {...props}>
      {(values) => (
        <div className="flex min-w-0 items-center justify-between gap-3">
          <pre className="min-w-0 overflow-x-auto whitespace-pre">{typeof children === "function" ? children(values) : children}</pre>
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
      )}
    </TabsContent>
  );
}
