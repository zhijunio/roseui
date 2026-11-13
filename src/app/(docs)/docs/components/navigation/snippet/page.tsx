import { SnippetExamples } from "@/components/examples/snippet/snippet";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

const components = [
  { name: "Snippet", description: "Tab container with code surface styling." },
  { name: "SnippetTabsList", description: "Tab list; accepts React Aria collection props." },
  { name: "SnippetTab", description: "Tab trigger; use the same value as its panel id." },
  { name: "SnippetTabPanels", description: "Collection wrapper for panels." },
  { name: "SnippetTabPanel", description: "Panel content with a copy button for string children." },
];

export const metadata = { title: "Snippet" };

export default function SnippetPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use to present related code or content variants in switchable, labeled panels.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid when users need to compare all content at once or when panels are unrelated.
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
          code={`import { Snippet, SnippetTab, SnippetTabPanel, SnippetTabPanels, SnippetTabsList } from "@/components/ui/snippet";

<Snippet><SnippetTabsList items={commands} aria-label="Package manager">{(command) => <SnippetTab key={command.id} value={command.id}>{command.label}</SnippetTab>}</SnippetTabsList><SnippetTabPanels items={commands}>{(command) => <SnippetTabPanel key={command.id} id={command.id}>{command.command}</SnippetTabPanel>}</SnippetTabPanels></Snippet>`}
        />
      </section>
      <section aria-labelledby="examples" className="space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <SnippetExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Snippet composes RoseUI Tabs with copyable tab panels. Tab values and panel ids must match. Panels copy their
          string content through the Clipboard API, which requires a secure context.
        </p>
        <Table>
          <TableHeader>
            <TableColumn isRowHeader>Component</TableColumn>
            <TableColumn>Purpose</TableColumn>
          </TableHeader>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.name}>
                <TableCell role="rowheader" className="text-foreground align-top font-mono">
                  {component.name}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-normal">{component.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
