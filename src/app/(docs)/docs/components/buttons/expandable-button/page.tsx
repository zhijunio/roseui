import type { Metadata } from "next";

import { ExpandableButtonExamples } from "@/components/examples/expandable-button/expandable-button";
import { CodeBlock } from "@/components/ui/code-block";
import type { ExpandableButtonProps } from "@/components/ui/expandable-button";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = { title: "Expandable Button" };

const properties = [
  {
    name: "label",
    type: "string",
    defaultValue: '"Create new"',
    description: "The label revealed on hover or keyboard focus and the default accessible name.",
  },
  {
    name: "successLabel",
    type: "string",
    defaultValue: '"Created"',
    description: "The label shown after the button is activated.",
  },
  {
    name: "icon",
    type: "ReactNode",
    defaultValue: "plus icon",
    description: "The icon shown while the button is collapsed.",
  },
  {
    name: "variant",
    type: 'ExpandableButtonProps["variant"]',
    defaultValue: '"outline"',
    description: "The visual style inherited from Button.",
  },
  {
    name: "onPress",
    type: 'ExpandableButtonProps["onPress"]',
    defaultValue: "—",
    description: "Called after the success label is set when the button is activated.",
  },
  {
    name: "isDisabled",
    type: 'ExpandableButtonProps["isDisabled"]',
    defaultValue: "false",
    description: "Prevents interaction. Inherited from Button.",
  },
  {
    name: "isPending",
    type: 'ExpandableButtonProps["isPending"]',
    defaultValue: "false",
    description: "Disables press and hover events while retaining focusability. Inherited from Button.",
  },
  {
    name: "aria-label",
    type: 'ExpandableButtonProps["aria-label"]',
    defaultValue: "label",
    description: "Overrides the accessible name, which otherwise uses label.",
  },
  {
    name: "className",
    type: 'ExpandableButtonProps["className"]',
    defaultValue: "—",
    description: "Additional classes merged with the expandable button styles.",
  },
] satisfies { name: keyof ExpandableButtonProps; type: string; defaultValue: string; description: string }[];

export default function ExpandableButtonPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use when a compact control reveals additional action choices or content on demand.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid hiding essential actions or using it for navigation between destinations.
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
          code={`import { ExpandableButton } from "@/components/ui/expandable-button";

<ExpandableButton label="Create project" onPress={createProject} />`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <ExpandableButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          ExpandableButton wraps the React Aria Button and accepts Button props except children, which it manages. See
          the{" "}
          <a href="https://react-aria.adobe.com/Button#api" className="text-foreground underline underline-offset-4">
            React Aria Button API
          </a>{" "}
          for other supported events and accessibility attributes.
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
        <h3 className="font-semibold">Custom label and icon</h3>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { ExpandableButton } from "@/components/ui/expandable-button";
import { Sparkles } from "lucide-react";

<ExpandableButton
  label="Generate summary"
  successLabel="Summary ready"
  icon={<Sparkles aria-hidden />}
  onPress={() => createSummary()}
/>`}</code>
        </pre>
        <p className="text-muted-foreground text-sm">
          The label expands on hover or keyboard focus. After activation, successLabel remains visible in the expanded
          state.
        </p>
      </section>
    </div>
  );
}
