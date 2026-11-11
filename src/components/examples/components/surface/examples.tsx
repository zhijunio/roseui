import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Surface } from "@/components/ui/surface";

const variants = [
  { variant: "default", label: "Default", description: "Standard content surface." },
  { variant: "secondary", label: "Secondary", description: "Lower emphasis for form controls." },
  { variant: "tertiary", label: "Tertiary", description: "More contrast from the page background." },
  { variant: "transparent", label: "Transparent", description: "Bordered container without a fill." },
] as const;

export function SurfaceExamples() {
  return (
    <>
      <ComponentPreview title="Variants" layout="grid2">
        {variants.map(({ variant, label, description }) => (
          <Surface key={variant} variant={variant} className="min-h-24 space-y-2 p-4">
            <p className="text-sm font-medium">{label} surface</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </Surface>
        ))}
      </ComponentPreview>
      <ComponentPreview title="Form Components" layout="panel">
        <Surface variant="secondary" className="w-full space-y-4 p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Workspace profile</p>
            <p className="text-sm text-muted-foreground">Edit the name shown to your team.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="surface-workspace-name">Workspace name</Label>
            <Input id="surface-workspace-name" defaultValue="Product Design" />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Save changes</Button>
          </div>
        </Surface>
      </ComponentPreview>
    </>
  );
}
