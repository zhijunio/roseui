import type { ComponentProps } from "react";

import { SplitButtonExamples } from "@/components/examples/split-button/split-button";
import { CodeBlock } from "@/components/ui/code-block";
import type { SplitButton } from "@/components/ui/split-button";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

type SplitButtonProps = ComponentProps<typeof SplitButton>;

const properties = [
  {
    name: "label",
    type: 'SplitButtonProps["label"]',
    defaultValue: "Required",
    description:
      "Visible label for the primary action. Also provides the accessible name for the action group and menu trigger.",
  },
  {
    name: "options",
    type: 'SplitButtonProps["options"]',
    defaultValue: "Required",
    description: "Menu options, each with an id, label, and optional disabled state.",
  },
  {
    name: "onAction",
    type: 'SplitButtonProps["onAction"]',
    defaultValue: "Required",
    description: "Called when the primary action is activated.",
  },
  {
    name: "onOptionSelect",
    type: 'SplitButtonProps["onOptionSelect"]',
    defaultValue: "Required",
    description: "Called with the selected option when a menu item is chosen.",
  },
  {
    name: "disabled",
    type: 'SplitButtonProps["disabled"]',
    defaultValue: "false",
    description: "Disables the primary action and the menu trigger.",
  },
] satisfies { name: keyof SplitButtonProps; type: string; defaultValue: string; description: string }[];

export const metadata = { title: "Split Button" };

export default function SplitButtonExamplePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use when a primary action has a small set of closely related alternatives.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid unrelated commands or long menus; use separate controls instead.
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
          code={`import { SplitButton } from "@/components/ui/split-button";

<SplitButton label="Export" options={exportOptions} onAction={exportFile} onOptionSelect={selectExportOption} />`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <SplitButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          SplitButton combines a primary action with a menu of alternate actions. Option records use the exported{" "}
          <code className="text-xs">SplitButtonOption</code> type.
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
                <TableCell role="rowheader" className="text-foreground align-top font-mono">
                  {property.name}
                </TableCell>
                <TableCell className="max-w-sm min-w-48 align-top whitespace-normal">
                  <code className="text-xs">{property.type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code className="text-xs">{property.defaultValue}</code>
                </TableCell>
                <TableCell className="text-muted-foreground min-w-56 align-top whitespace-normal">
                  {property.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h3 className="font-semibold">Option type</h3>
        <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
          <code>{`type SplitButtonOption = {
  id: string;
  label: string;
  disabled?: boolean;
};`}</code>
        </pre>
      </section>
    </div>
  );
}
