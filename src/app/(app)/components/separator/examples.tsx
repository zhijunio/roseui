import { ComponentPreview } from "@/components/composite/component-preview";
import { ContentDivider, Separator } from "@/components/ui/separator";

export function SeparatorExamples() {
  return (
    <>
      <ComponentPreview previewId="separator-01" title="Horizontal">
        <div className="w-full space-y-3 text-sm">
          <p className="font-medium">Workspace settings</p>
          <Separator />
          <p className="text-muted-foreground">
            Manage members and workspace access.
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="separator-02" title="Vertical">
        <div className="flex h-8 items-center gap-4 text-sm">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Activity</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="separator-03" title="Contrast">
        <div className="w-full space-y-4">
          <Separator variant="default" />
          <Separator variant="secondary" />
          <Separator variant="tertiary" />
        </div>
      </ComponentPreview>
      <ComponentPreview previewId="separator-04" title="Centered Label">
        <ContentDivider>Or continue with</ContentDivider>
      </ComponentPreview>
      <ComponentPreview previewId="separator-05" title="Summary Rows">
        <div className="w-full space-y-3 text-sm">
          <p className="font-medium">Order summary</p>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>$49.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>$3.92</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$52.92</span>
          </div>
        </div>
      </ComponentPreview>
    </>
  );
}
