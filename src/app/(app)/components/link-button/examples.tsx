import {
  IconArrowLeft,
  IconArrowRight,
  IconDownload,
  IconExternalLink,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { LinkButton } from "@/components/ui/link-button";
import { ArrowLinkButton } from "@/components/composite/arrow-link-button";

export function LinkButtonExamples() {
  return (
    <>
      <ComponentPreview previewId="link-button-01" title="Navigate within the workspace">
        <div className="flex flex-wrap items-center gap-4">
          <LinkButton href="/components/input">Browse input examples</LinkButton>
          <LinkButton href="/components/button" variant="secondary">
            Return to buttons
          </LinkButton>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-button-02" title="Sizes and icon placement">
        <div className="flex flex-wrap items-center gap-4">
          <LinkButton href="/components/file-upload" size="xs" variant="secondary" trailingIcon={<IconArrowRight />}>
            View uploads
          </LinkButton>
          <LinkButton href="/components/table" size="sm" variant="secondary" leadingIcon={<IconDownload />}>
            Export report
          </LinkButton>
          <LinkButton href="/components/button-group" variant="secondary" leadingIcon={<IconArrowLeft />}>
            View action groups
          </LinkButton>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-button-03" title="External destination">
        <LinkButton
          href="https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating"
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          trailingIcon={<IconExternalLink />}
        >
          Read navigation guidance
        </LinkButton>
      </ComponentPreview>

      <ComponentPreview previewId="link-button-04" title="Prominent navigation">
        <ArrowLinkButton href="/components/button">
          Explore button examples
        </ArrowLinkButton>
      </ComponentPreview>

      <ComponentPreview previewId="link-button-05" title="Unavailable action">
        <LinkButton variant="secondary" disabled>
          Export is unavailable
        </LinkButton>
      </ComponentPreview>
    </>
  );
}
