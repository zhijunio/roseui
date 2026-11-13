import { ButtonExamples } from "@/components/examples/button/button";
import type { ButtonProps } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Button" };

const properties = [
  {
    name: "variant",
    type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
    defaultValue: '"default"',
    description: "The visual style of the button.",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"',
    defaultValue: '"default"',
    description: "Four text sizes and four square icon sizes. Give icon-only buttons an aria-label.",
  },
  {
    name: "type",
    type: '"button" | "submit" | "reset"',
    defaultValue: '"button"',
    description: "The native button behavior. Use submit to submit a form.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    defaultValue: "false",
    description: "Prevents interaction and removes the button from the tab order.",
  },
  {
    name: "isPending",
    type: "boolean",
    defaultValue: "false",
    description:
      "Disables press and hover events while retaining focusability, and announces the pending state. Add a loader through children when needed.",
  },
  {
    name: "onPress",
    type: 'ButtonProps["onPress"]',
    defaultValue: "—",
    description: "Called when the button is activated with a mouse, touch, keyboard, or assistive technology.",
  },
  {
    name: "children",
    type: 'ButtonProps["children"]',
    defaultValue: "—",
    description: "Button content, or a function receiving button state such as isPending and isPressed.",
  },
  {
    name: "className",
    type: 'ButtonProps["className"]',
    defaultValue: "—",
    description: "Additional classes, or a function receiving button state. These are merged with the button styles.",
  },
  {
    name: "render",
    type: 'ButtonProps["render"]',
    defaultValue: "—",
    description:
      "Customizes the underlying element. A render function receives DOM props and button state; forward the supplied props to preserve behavior and accessibility.",
  },
] satisfies { name: keyof ButtonProps; type: string; defaultValue: string; description: string }[];

export default function ComponentExamplePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <ul className="text-muted-foreground list-disc space-y-1 ps-5 text-sm">
          <li>Trigger one immediate action, such as saving changes, submitting a form, or opening a dialog.</li>
          <li>
            Show progress for an asynchronous action with <code>isPending</code>.
          </li>
          <li>Confirm an action in place by changing the button label after it completes.</li>
        </ul>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <ul className="text-muted-foreground list-disc space-y-1 ps-5 text-sm">
          <li>Use a link for navigation to another page or location.</li>
          <li>Use Toggle or Toggle Group when the control changes a persistent selected state.</li>
          <li>
            Use Split Button for related action alternatives, or Hold to Confirm for deliberate confirmation of a
            destructive action.
          </li>
        </ul>
      </section>
      <section aria-labelledby="usage" className="min-w-0 space-y-4">
        <h2 id="usage" className="scroll-mt-20 text-xl font-semibold">
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Choose a variant for emphasis, provide a clear action label, and give icon-only buttons an accessible name.
          Set <code>isPending</code> while an action is in progress.
        </p>
        <CodeBlock
          fileName="Usage.tsx"
          language="tsx"
          code={`import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Actions({ isSaving, onSave }: { isSaving: boolean; onSave: () => void }) {
  return (
    <>
      <Button onPress={onSave}>Save changes</Button>
      <Button variant="outline" isPending={isSaving} onPress={onSave}>
        Save changes
      </Button>
      <Button size="icon" aria-label="Add item"><Plus /></Button>
    </>
  );
}`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <ButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <div className="space-y-2">
          <h3 className="font-semibold">
            <code>Button</code>
          </h3>
          <p className="text-muted-foreground text-sm">
            Button extends React Aria Button. RoseUI adds variant and size and defaults type to button. See the{" "}
            <a href="https://react-aria.adobe.com/Button#api" className="text-foreground underline underline-offset-4">
              React Aria Button API
            </a>{" "}
            for all supported events, accessibility attributes, and render state.
          </p>
        </div>
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
        <h3 className="font-semibold">Types and link styling</h3>
        <CodeBlock
          fileName="button-usage.tsx"
          language="tsx"
          code={`import { Button, buttonVariants, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";

const props = { variant: "outline", size: "sm" } satisfies ButtonProps;

<Button {...props}>Save changes</Button>
<Link href="/docs/components/buttons/button-group" className={buttonVariants(props)}>
  Button group
</Link>`}
        />
        <p className="text-muted-foreground text-sm">
          Use buttonVariants to style a link with the existing variant and size options. The link variant changes
          appearance only; Button still renders a button.
        </p>
        <h3 className="font-semibold">Keyboard interactions</h3>
        <p className="text-muted-foreground text-sm">
          <kbd>Enter</kbd> and <kbd>Space</kbd> activate the focused button. Button inherits this behavior from React
          Aria.
        </p>
        <h3 className="font-semibold">Accessibility</h3>
        <ul className="text-muted-foreground list-disc space-y-1 ps-5 text-sm">
          <li>
            Use a visible label that describes the action; give icon-only buttons an <code>aria-label</code>.
          </li>
          <li>
            <code>isPending</code> prevents repeated activation while keeping the button focusable.
          </li>
          <li>
            Use <code>type="button"</code> for form actions that should not submit; this is the default.
          </li>
        </ul>
      </section>
    </div>
  );
}
