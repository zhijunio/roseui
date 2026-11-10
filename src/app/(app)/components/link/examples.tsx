import {
  IconArrowLeft,
  IconArrowRight,
  IconExternalLink,
} from "@tabler/icons-react"

import { ComponentPreview } from "@/components/composite/component-preview"
import { Link } from "@/components/ui/link"

const variants = [
  { label: "Primary", className: "text-primary" },
  { label: "Secondary", className: "text-secondary-foreground" },
  { label: "Success", className: "text-success" },
  { label: "Danger", className: "text-destructive" },
  { label: "Warning", className: "text-warning" },
  { label: "Info", className: "text-info" },
  { label: "Light", className: "text-muted-foreground" },
  { label: "Dark", className: "text-foreground" },
]

const opacityLevels = [
  { level: "10", className: "opacity-10" },
  { level: "25", className: "opacity-25" },
  { level: "50", className: "opacity-50" },
  { level: "75", className: "opacity-75" },
  { level: "100", className: "opacity-100" },
]

export function LinkExamples() {
  return (
    <>
      <ComponentPreview previewId="link-01" title="Colored Links">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {variants.map((item) => (
            <Link key={item.label} href="/components/button" className={`text-sm font-medium ${item.className}`}>
              {item.label} link
            </Link>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-02" title="Custom Link Colors">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {variants.map((item) => (
            <Link
              key={item.label}
              href="/components/button"
              className={`text-sm font-medium underline underline-offset-4 hover:opacity-80 ${item.className}`}
            >
              {item.label} custom link
            </Link>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-03" title="Custom Link Opacity">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">
          {opacityLevels.map((item) => (
            <Link key={item.level} href="/components/button" className={item.className}>
              Link opacity {item.level}
            </Link>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-04" title="Link Opacity Hover">
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-primary">
          {opacityLevels.map((item) => (
            <Link key={item.level} href="/components/button" className={`${item.className} hover:opacity-100`}>
              Link opacity {item.level}
            </Link>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-05" title="Underline Styles">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link href="/components/button" className="text-sm underline underline-offset-4">
            Always underlined
          </Link>
          <Link href="/components/button" className="text-sm decoration-dotted underline-offset-4 hover:underline">
            Dotted on hover
          </Link>
          <Link href="/components/button" className="text-sm decoration-2 underline-offset-4 hover:underline">
            Custom underline
          </Link>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-06" title="Icon Placement">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/components/button" icon={<IconArrowRight />}>
            Continue
          </Link>
          <Link href="/components/button" icon={<IconArrowLeft />} iconPlacement="start">
            Go back
          </Link>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="link-07" title="External Link">
        <Link
          href="https://example.com/documentation"
          target="_blank"
          rel="noopener noreferrer"
          icon={<IconExternalLink />}
        >
          Read the documentation
        </Link>
      </ComponentPreview>

      <ComponentPreview previewId="link-08" title="Disabled Link">
        <div className="grid justify-items-start gap-2">
          <Link href="/components/button" isDisabled>
            Unavailable destination
          </Link>
          <p className="text-xs text-muted-foreground">This destination is currently unavailable.</p>
        </div>
      </ComponentPreview>
    </>
  )
}
