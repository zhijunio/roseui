import { AvatarButtonExamples } from "@/components/examples/avatar-button/avatar-button";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Avatar Button" };

const properties = [
  {
    name: "label",
    type: "ReactNode",
    defaultValue: "Required",
    description: "Visible action label displayed beside the avatar.",
  },
  { name: "src", type: "string", defaultValue: "—", description: "Avatar image source." },
  {
    name: "alt",
    type: "string",
    defaultValue: '""',
    description: "Alternative text for the avatar image. The visible label already names the button.",
  },
  {
    name: "fallback",
    type: "ReactNode",
    defaultValue: "—",
    description: "Avatar content shown when the image is unavailable or omitted.",
  },
  {
    name: "avatarSize",
    type: '"xs" | "sm" | "default" | "lg"',
    defaultValue: '"xs"',
    description: "Size of the avatar.",
  },
  { name: "variant", type: 'ButtonProps["variant"]', defaultValue: '"outline"', description: "Visual button style." },
  {
    name: "...buttonProps",
    type: 'Omit<ButtonProps, "children">',
    defaultValue: "—",
    description: "Button behavior and attributes, including size, isDisabled, and onPress.",
  },
] satisfies { name: string; type: string; defaultValue: string; description: string }[];

export default function AvatarButtonPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <ul className="list-disc space-y-1 ps-5 text-sm text-muted-foreground">
          <li>Present a person or account as the target of an action, such as selecting a teammate.</li>
          <li>Keep the avatar and its action label together in a compact button.</li>
        </ul>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <ul className="list-disc space-y-1 ps-5 text-sm text-muted-foreground">
          <li>Use Avatar for a non-interactive identity display.</li>
          <li>Use Avatar Group when showing several people without a button action.</li>
          <li>Use Button with a custom composition when the avatar should not appear beside the label.</li>
        </ul>
      </section>
      <section aria-labelledby="usage" className="min-w-0 space-y-4">
        <h2 id="usage" className="scroll-mt-20 text-xl font-semibold">
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </h2>
        <p className="text-sm text-muted-foreground">
          Provide a visible label and either an image source or fallback content. AvatarButton forwards Button props
          such as <code>onPress</code>, <code>variant</code>, and <code>isDisabled</code>.
        </p>
        <CodeBlock
          fileName="Usage.tsx"
          language="tsx"
          code={`import { AvatarButton } from "@/components/ui/avatar-button";

<AvatarButton
  label="Alex Morgan"
  src="https://api.dicebear.com/9.x/avataaars/svg?seed=Alex%20Morgan"
  fallback="AM"
  onPress={selectAlex}
/>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <AvatarButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-sm text-muted-foreground">
          AvatarButton composes RoseUI Avatar and Button. For inherited button interaction props, see the{" "}
          <a href="/docs/components/buttons/button" className="text-foreground underline underline-offset-4">
            Button API reference
          </a>
          .
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
                <TableCell role="rowheader" className="align-middle font-mono text-foreground">
                  {property.name}
                </TableCell>
                <TableCell className="max-w-sm min-w-48 align-top whitespace-normal">
                  <code className="text-xs">{property.type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code className="text-xs">{property.defaultValue}</code>
                </TableCell>
                <TableCell className="min-w-56 align-top whitespace-normal text-muted-foreground">
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
