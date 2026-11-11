import { IconArrowLeft, IconArrowRight, IconDownload, IconExternalLink } from "@tabler/icons-react";

import { ArrowLinkButton } from "@/components/composite/arrow-link-button";
import { ComponentPreview } from "@/components/examples/component-preview";
import { LinkButton } from "@/components/ui/link-button";

export function LinkButtonExamples() {
  return (
    <>
      <ComponentPreview title="Navigate within the workspace">
        <div className="flex flex-wrap items-center gap-4">
          <LinkButton href="/components/input">Browse input examples</LinkButton>
          <LinkButton href="/components/button" variant="secondary">
            Return to buttons
          </LinkButton>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sizes and icon placement">
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

      <ComponentPreview title="External destination">
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

      <ComponentPreview title="Prominent navigation">
        <ArrowLinkButton href="/components/button">Explore button examples</ArrowLinkButton>
      </ComponentPreview>

      <ComponentPreview title="Unavailable action">
        <LinkButton variant="secondary" disabled>
          Export is unavailable
        </LinkButton>
      </ComponentPreview>
    </>
  );
}
