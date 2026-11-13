import { CopyButtonExamples } from "@/components/examples/copy-button/copy-button";
import { CodeBlock } from "@/components/ui/code-block";
import type { CopyButtonProps } from "@/components/ui/copy-button";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Copy Button" };

const properties = [
  {
    name: "value",
    type: "string",
    defaultValue: "required",
    description: "The text written to the clipboard when the button is pressed.",
  },
  {
    name: "iconOnly",
    type: "boolean",
    defaultValue: "false",
    description: "Shows only the copy or success icon. The accessible name follows the active label by default.",
  },
  {
    name: "copyLabel",
    type: "string",
    defaultValue: '"Copy"',
    description: "The visible label and default accessible name before copying.",
  },
  {
    name: "copiedLabel",
    type: "string",
    defaultValue: '"Copied"',
    description: "The success label and accessible name shown after copying.",
  },
  {
    name: "errorMessage",
    type: "string",
    defaultValue: '"Unable to copy. Try again."',
    description: "The live announcement shown when the clipboard write fails.",
  },
  {
    name: "onCopied",
    type: 'CopyButtonProps["onCopied"]',
    defaultValue: "—",
    description: "Called after the clipboard write succeeds.",
  },
  {
    name: "onPress",
    type: 'CopyButtonProps["onPress"]',
    defaultValue: "—",
    description: "The inherited button press handler. It runs before the clipboard write.",
  },
  {
    name: "variant",
    type: 'CopyButtonProps["variant"]',
    defaultValue: '"outline"',
    description: "The visual style inherited from Button.",
  },
  {
    name: "size",
    type: 'CopyButtonProps["size"]',
    defaultValue: 'iconOnly ? "icon" : "default"',
    description: "The Button size. Defaults to icon when iconOnly is true, otherwise default.",
  },
  {
    name: "isDisabled",
    type: 'CopyButtonProps["isDisabled"]',
    defaultValue: "false",
    description: "Prevents interaction. Inherited from Button.",
  },
  {
    name: "className",
    type: 'CopyButtonProps["className"]',
    defaultValue: "—",
    description: "Additional classes applied to the button.",
  },
  {
    name: "aria-label",
    type: 'CopyButtonProps["aria-label"]',
    defaultValue: "active label when iconOnly is true",
    description: "Overrides the accessible name for icon-only buttons.",
  },
] satisfies { name: keyof CopyButtonProps; type: string; defaultValue: string; description: string }[];

export default function CopyButtonPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use to copy a known value such as a URL, token, or code sample and confirm the result.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for actions that transform or submit data; provide feedback for clipboard failures.
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
          code={`import { CopyButton } from "@/components/ui/copy-button";

<CopyButton value={shareUrl} aria-label="Copy link" />`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <CopyButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          CopyButton wraps the React Aria Button and adds clipboard writing with success and error feedback. It accepts
          Button props except children, which are managed by the component. See the{" "}
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
        <h3 className="font-semibold">Labeled and icon-only usage</h3>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`import { CopyButton } from "@/components/ui/copy-button";

<CopyButton value="npm install roseui" onCopied={() => console.log("Copied")} />
<CopyButton value="npm install roseui" iconOnly aria-label="Copy install command" />`}</code>
        </pre>
        <p className="text-muted-foreground text-sm">
          Clipboard access requires a secure context. The success or error feedback is announced and resets after two
          seconds.
        </p>
      </section>
    </div>
  );
}
