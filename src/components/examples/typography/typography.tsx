import { ComponentPreview } from "@/components/docs/component-preview";
import { Heading } from "@/components/roseui/heading";
import { Code, Strong, Text, TextLink } from "@/components/roseui/text";

export function TypographyExamples() {
  return (
    <>
      <ComponentPreview title="Heading Levels" layout="panel">
        <div className="grid w-full gap-4">
          <Heading level={1}>Build clearer product interfaces</Heading>
          <Heading level={2}>A calmer content hierarchy</Heading>
          <Heading level={3}>Supporting section</Heading>
          <Heading level={4}>Compact heading</Heading>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Body And Inline Text" layout="panel">
        <div className="grid max-w-xl gap-3">
          <Text>
            Typography primitives keep body copy, links, and inline emphasis consistent across documentation and product
            surfaces.
          </Text>
          <Text>
            Use <Strong>strong emphasis</Strong> for important terms, <Code>inline code</Code> for identifiers, and a{" "}
            <TextLink href="/docs/components/navigation/link">text link</TextLink> for navigation.
          </Text>
        </div>
      </ComponentPreview>
    </>
  );
}
