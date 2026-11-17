import { CheckboxButton, CheckboxField } from "@/components/roseui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="workspace-role">Your role</Label>
          <Select
            value={role}
            onValueChange={(value) => {
              if (value === "admin" || value === "manager" || value === "member") onRoleChange(value);
            }}
            aria-label="Your role"
          >
            <SelectTrigger id="workspace-role" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Workspace admin</SelectItem>
              <SelectItem value="manager">Team manager</SelectItem>
              <SelectItem value="member">Team member</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CheckboxField
          id="workspace-product-updates"
          checked={updates}
          onCheckedChange={(value) => onUpdatesChange(value === true)}
        >
          <CheckboxButton className="items-start gap-3 rounded-lg border p-3 text-sm">
            <span className="font-medium">Product updates</span>
          </CheckboxButton>
        </CheckboxField>
      </div>
    </div>
  );
}
