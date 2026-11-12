import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WorkspaceStep({
  workspace,
  onWorkspaceChange,
}: {
  workspace: string;
  onWorkspaceChange: (value: string) => void;
}) {
  return (
    <div className="bg-background grid gap-4 rounded-xl border p-4 sm:p-5">
      <div>
        <h2 className="text-base font-semibold">Name your workspace</h2>
        <p className="text-muted-foreground mt-1 text-sm">Give your team a clear place to start working together.</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="workspace-name">Workspace name</Label>
          <Input
            id="workspace-name"
            value={workspace}
            onChange={(event) => onWorkspaceChange(event.currentTarget.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="workspace-domain">Workspace URL</Label>
          <Input id="workspace-domain" defaultValue="app/northwind.workspace" />
        </div>
      </div>
    </div>
  );
}
