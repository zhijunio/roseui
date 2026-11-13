import type { ComponentProps } from "react";

import { CloseButtonExamples } from "@/components/examples/close-button/close-button";
import type { CloseButton } from "@/components/ui/close-button";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

type CloseButtonProps = ComponentProps<typeof CloseButton>;

const properties = [
  {
    name: "aria-label",
    type: 'CloseButtonProps["aria-label"]',
    defaultValue: "Required",
    description: "Accessible name describing the item or notice that will be dismissed.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "default"',
    defaultValue: '"sm"',
    description: "Sets the close button and icon size.",
  },
  {
    name: "children",
    type: 'CloseButtonProps["children"]',
    defaultValue: "Close icon",
    description: "Optional custom icon or content. The default is an X icon.",
  },
  {
    name: "disabled",
    type: 'CloseButtonProps["disabled"]',
    defaultValue: "false",
    description: "Disables the native button and prevents it from being activated.",
  },
  {
    name: "onClick",
    type: 'CloseButtonProps["onClick"]',
    defaultValue: "—",
    description: "Called when the button is activated.",
  },
  {
    name: "className",
    type: 'CloseButtonProps["className"]',
    defaultValue: "—",
    description: "Additional classes merged with the close button styles.",
  },
] satisfies {
  name: keyof CloseButtonProps;
  type: string;
  defaultValue: string;
  description: string;
}[];

export const metadata = { title: "Close Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use a compact dismiss control for a closable notice, dialog, or removable item.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid unlabeled icon-only controls; use a text button when the action needs explanation.
        </p>
      </section>
      <section aria-labelledby="usage" className="min-w-0 space-y-4">
        <h2 id="usage" className="scroll-mt-20 text-xl font-semibold">
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </h2>
        <CodeBlock
          fileName="Usage.tsx"
          language="tsx"
          code={`import { CloseButton } from "@/components/ui/close-button";

<CloseButton aria-label="Close dialog" onClick={onClose} />`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <CloseButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          CloseButton renders a native button with its type fixed to <code className="mx-1 text-xs">button</code>. Its
          accessible name is required; standard button attributes and events are also supported.
        </p>
        <Table>
          <TableHeader>
            <TableColumn isRowHeader>Prop</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.name}>
                <TableCell role="rowheader" className="text-foreground align-middle font-mono">
                  {property.name}
                </TableCell>
                <TableCell className="min-w-48 max-w-sm whitespace-normal align-top">
                  <code className="text-xs">{property.type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code className="text-xs">{property.defaultValue}</code>
                </TableCell>
                <TableCell className="min-w-56 whitespace-normal align-top text-muted-foreground">
                  {property.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
