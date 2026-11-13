import { HoldToConfirmExamples } from "@/components/examples/hold-to-confirm/hold-to-confirm";
import { CodeBlock } from "@/components/ui/code-block";
import type { HoldToConfirmProps } from "@/components/ui/hold-to-confirm";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Hold to Confirm" };

const properties = [
  {
    name: "label",
    type: "ReactNode",
    defaultValue: "required",
    description: "The content shown before the hold completes.",
  },
  {
    name: "confirmedLabel",
    type: "string",
    defaultValue: '"Confirmed"',
    description: "The content and accessible name shown after confirmation.",
  },
  {
    name: "duration",
    type: "number",
    defaultValue: "1200",
    description: "The hold time in milliseconds. Values below 300 are treated as 300.",
  },
  {
    name: "onConfirm",
    type: 'HoldToConfirmProps["onConfirm"]',
    defaultValue: "required",
    description: "Called once when the hold reaches the required duration.",
  },
  {
    name: "onHoldChange",
    type: 'HoldToConfirmProps["onHoldChange"]',
    defaultValue: "—",
    description: "Called with true when holding starts and false when it ends or confirms.",
  },
  {
    name: "resetOnComplete",
    type: "boolean",
    defaultValue: "false",
    description: "Resets the confirmed state and progress after 900 milliseconds.",
  },
  {
    name: "isDisabled",
    type: 'HoldToConfirmProps["isDisabled"]',
    defaultValue: "false",
    description: "Prevents the hold action. Inherited from Button.",
  },
  {
    name: "className",
    type: 'HoldToConfirmProps["className"]',
    defaultValue: "—",
    description: "Additional classes merged with the hold button styles.",
  },
] satisfies { name: keyof HoldToConfirmProps; type: string; defaultValue: string; description: string }[];

export default function HoldToConfirmPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use for consequential actions that benefit from deliberate press-and-hold confirmation.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for routine actions or as the only accessible confirmation path.
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
          code={`import { HoldToConfirm } from "@/components/ui/hold-to-confirm";

<HoldToConfirm onConfirm={deleteItem}>Hold to delete</HoldToConfirm>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <HoldToConfirmExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          HoldToConfirm wraps the React Aria Button and accepts Button props except onPress and children, which it
          manages. See the{" "}
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
        <h3 className="font-semibold">Hold to confirm</h3>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { HoldToConfirm } from "@/components/ui/hold-to-confirm";

<HoldToConfirm
  label="Delete project"
  confirmedLabel="Project deleted"
  duration={1500}
  onConfirm={() => deleteProject()}
/>`}</code>
        </pre>
        <p className="text-muted-foreground text-sm">
          Hold with a pointer, or press and hold Space or Enter. Releasing early cancels the confirmation.
        </p>
      </section>
    </div>
  );
}
