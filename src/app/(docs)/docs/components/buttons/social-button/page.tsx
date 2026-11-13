import { SocialButtonExamples } from "@/components/examples/social-button/social-button";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Social Button" };

const properties = [
  {
    name: "brand",
    type: "SocialBrand",
    defaultValue: "Required",
    description: 'A supported provider name, or "custom" when using a custom brand config.',
  },
  {
    name: "config",
    type: "SocialBrandConfig",
    defaultValue: "Required for custom brand",
    description: "Custom brand icon, optional accessible label, and optional brand color.",
  },
  {
    name: "appearance",
    type: "SocialButtonAppearance",
    defaultValue: '"colorful"',
    description: "Visual style: provider color, black, or white.",
  },
  {
    name: "size",
    type: "SocialButtonSize",
    defaultValue: '"default"',
    description: 'Control size: "default" or "sm".',
  },
  {
    name: "iconOnly",
    type: "boolean",
    defaultValue: "false",
    description: "Hides the visible label and keeps a screen-reader label.",
  },
  {
    name: "fullWidth",
    type: "boolean",
    defaultValue: "false",
    description: "Fills the available width when the button has a visible label.",
  },
  {
    name: "children",
    type: "ReactNode",
    defaultValue: '"Continue with {provider}"',
    description: "Optional visible label. Defaults to Continue with the provider name.",
  },
  {
    name: "href",
    type: "string",
    defaultValue: "—",
    description: "Renders an anchor for provider navigation. Omit it to render a button.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables interaction in button mode. Anchors do not support this prop.",
  },
  {
    name: "onClick",
    type: "button or anchor click handler",
    defaultValue: "—",
    description: "Handles activation in button mode, or click events in link mode.",
  },
  {
    name: "className",
    type: "string",
    defaultValue: "—",
    description: "Additional classes merged with the component styles.",
  },
  {
    name: "aria-label",
    type: "string",
    defaultValue: "Provider label",
    description: "Overrides the accessible name. The component provides a screen-reader label for icon-only buttons.",
  },
] satisfies { name: string; type: string; defaultValue: string; description: string }[];

export default function ComponentExamplePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">Use for recognizable provider sign-in or connect actions.</p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid using provider branding for unrelated actions or implying an unavailable integration.
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
          code={`import { SocialButton } from "@/components/ui/social-button";

<SocialButton brand="google" onClick={signIn}>Continue with Google</SocialButton>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <SocialButtonExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          SocialButton renders a native button when <code className="mx-1 text-xs">href</code> is omitted and an anchor
          when it is provided. Use <code className="mx-1 text-xs">aria-label</code> to override the accessible name,
          especially for icon-only buttons. Standard button or anchor attributes are also supported for the matching
          mode.
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
        <h3 className="font-semibold">Custom brand</h3>
        <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
          <code>{`import { SocialButton, type SocialBrandConfig } from "@/components/ui/social-button";

const acme: SocialBrandConfig = {
  icon: <AcmeIcon />,
  label: "Acme",
  color: "#334155",
};

<SocialButton brand="custom" config={acme} onClick={startAcmeSignIn}>
  Continue with Acme
</SocialButton>`}</code>
        </pre>
      </section>
    </div>
  );
}
