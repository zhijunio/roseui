import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";

import type { WorkspaceRole } from "./data";

export function PreferencesStep({
  role,
  updates,
  onRoleChange,
  onUpdatesChange,
}: {
  role: WorkspaceRole;
  updates: boolean;
  onRoleChange: (value: WorkspaceRole) => void;
  onUpdatesChange: (value: boolean) => void;
}) {
  return (
    <div className="bg-background grid gap-4 rounded-xl border p-4 sm:p-5">
      <div>
        <h2 className="text-base font-semibold">Set your preferences</h2>
        <p className="text-muted-foreground mt-1 text-sm">Choose defaults that can be changed later in settings.</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="workspace-role">Your role</Label>
          <NativeSelect
            id="workspace-role"
            fullWidth
            value={role}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (value === "admin" || value === "manager" || value === "member") onRoleChange(value);
            }}
          >
            <option value="admin">Workspace admin</option>
            <option value="manager">Team manager</option>
            <option value="member">Team member</option>
          </NativeSelect>
        </div>
        <label htmlFor="workspace-product-updates" className="flex items-start gap-3 rounded-lg border p-3 text-sm">
          <Checkbox
            id="workspace-product-updates"
            checked={updates}
            onCheckedChange={(value) => onUpdatesChange(value === true)}
          />
          <span>
            <span className="font-medium">Product updates</span>
            <span className="text-muted-foreground mt-1 block">
              Receive occasional notes about new workspace features.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
