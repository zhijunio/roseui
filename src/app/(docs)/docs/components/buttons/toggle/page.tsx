import { ToggleExamples } from "@/components/examples/toggle/toggle";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";
import type { ToggleProps } from "@/components/ui/toggle";

export const metadata = { title: "Toggle" };

const properties = [
  {
    name: "variant",
    type: '"default" | "outline"',
    defaultValue: '"default"',
    description: "The visual style of the toggle.",
  },
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    defaultValue: '"default"',
    description: "The height and horizontal padding of the toggle.",
  },
  {
    name: "isSelected",
    type: "boolean",
    defaultValue: "—",
    description: "Controls whether the toggle is selected. Pair with onChange for controlled state.",
  },
  {
    name: "defaultSelected",
    type: "boolean",
    defaultValue: "false",
    description: "Sets the initial selected state for an uncontrolled toggle.",
  },
  {
    name: "onChange",
    type: 'ToggleProps["onChange"]',
    defaultValue: "—",
    description: "Called with the next selected state when the toggle changes.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction with the toggle.",
  },
  {
    name: "isIconOnly",
    type: "boolean",
    defaultValue: "false",
    description: "Uses a square layout for icon-only toggles. Provide an accessible name with aria-label.",
  },
  {
    name: "children",
    type: 'ToggleProps["children"]',
    defaultValue: "—",
    description: "Toggle content, such as a label, an icon, or both.",
  },
  {
    name: "className",
    type: 'ToggleProps["className"]',
    defaultValue: "—",
    description: "Additional classes, or a function receiving toggle state. These are merged with the toggle styles.",
  },
] satisfies { name: keyof ToggleProps; type: string; defaultValue: string; description: string }[];

export default function TogglePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use for an immediate on/off setting whose selected state remains visible.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for actions that submit a form or require a separate confirmation step.
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
          code={`import { Toggle } from "@/components/ui/toggle";

<Toggle aria-label="Bold" isSelected={bold} onChange={setBold} />`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <ToggleExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Toggle extends React Aria ToggleButton. RoseUI adds variant, size, and isIconOnly. See the{" "}
          <a
            href="https://react-aria.adobe.com/ToggleButton#api"
            className="text-foreground underline underline-offset-4"
          >
            React Aria ToggleButton API
          </a>{" "}
          for supported events, accessibility attributes, and render state.
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
        <h3 className="font-semibold">Controlled state and icon-only toggles</h3>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { useState } from "react";
import { Toggle, type ToggleProps } from "@/components/ui/toggle";

const props = { variant: "outline", size: "sm" } satisfies ToggleProps;
const [selected, setSelected] = useState(false);

<Toggle {...props} isSelected={selected} onChange={setSelected}>
  {selected ? "Bookmarked" : "Bookmark"}
</Toggle>

<Toggle isIconOnly aria-label="Bookmark">
  <BookmarkIcon />
</Toggle>`}</code>
        </pre>
        <p className="text-muted-foreground text-sm">
          Use isSelected with onChange when the parent owns the selected state. Icon-only toggles need an accessible
          name such as aria-label.
        </p>
      </section>
    </div>
  );
}
