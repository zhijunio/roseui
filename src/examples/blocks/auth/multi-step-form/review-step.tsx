import type { WorkspaceRole } from "./data";

export function ReviewStep({ workspace, role, updates }: { workspace: string; role: WorkspaceRole; updates: boolean }) {
  return (
    <div className="bg-background grid gap-4 rounded-xl border p-4 sm:p-5">
      <div>
        <h2 className="text-base font-semibold">Review your setup</h2>
        <p className="text-muted-foreground mt-1 text-sm">Check these details before creating the workspace.</p>
      </div>
      <div className="divide-y rounded-lg border">
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-muted-foreground text-sm">Workspace</span>
          <span className="text-right text-sm font-medium">{workspace}</span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-muted-foreground text-sm">Role</span>
          <span className="text-right text-sm font-medium">
            {role === "admin" ? "Workspace admin" : role === "manager" ? "Team manager" : "Team member"}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-muted-foreground text-sm">Product updates</span>
          <span className="text-right text-sm font-medium">{updates ? "Enabled" : "Disabled"}</span>
        </div>
      </div>
    </div>
  );
}
