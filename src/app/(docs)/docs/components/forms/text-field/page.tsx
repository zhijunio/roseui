import { TextFieldExamples } from "@/components/examples/text-field/text-field";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = { title: "Text Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TextFieldExamples />
      </div>
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use to collect a short, single-line text value with a visible label and optional validation.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for multi-line input, choosing from known options, or numeric ranges.
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
          code={`import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TextField } from "@/components/ui/text-field";

<TextField name="name" value={name} onChange={setName}><FieldLabel>Name</FieldLabel><Input /></TextField>`}
        />
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          API reference
        </h2>
        <p className="text-sm text-muted-foreground">
          TextField extends React Aria Components TextField. Compose it with Label, Input, Description, and FieldError
          to provide labeling, help text, and validation.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-3 font-mono">className</td>
                <td className="px-4 py-3 font-mono">string</td>
                <td className="px-4 py-3">Additional classes for the field container.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">isDisabled</td>
                <td className="px-4 py-3 font-mono">boolean</td>
                <td className="px-4 py-3">Disables the field and its input.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">isReadOnly</td>
                <td className="px-4 py-3 font-mono">boolean</td>
                <td className="px-4 py-3">Prevents editing while keeping the value available.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">isRequired</td>
                <td className="px-4 py-3 font-mono">boolean</td>
                <td className="px-4 py-3">Marks the field as required and validates it in forms.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">value / defaultValue</td>
                <td className="px-4 py-3 font-mono">string</td>
                <td className="px-4 py-3">Control the input value or provide its initial value.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          See the{" "}
          <a className="underline underline-offset-4" href="https://react-aria.adobe.com/TextField#api">
            React Aria TextField API
          </a>{" "}
          for all supported props.
        </p>
      </section>
    </div>
  );
}
