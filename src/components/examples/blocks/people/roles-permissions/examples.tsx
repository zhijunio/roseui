"use client";

import * as React from "react";

import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconCopy,
  IconLock,
  IconMinus,
  IconUsersGroup,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = {
  id: string;
  label: string;
  count: number;
  initials: string;
  color: string;
  locked?: boolean;
};
type Permission = { id: string; label: string };
type PermissionGroup = { id: string; label: string; permissions: Permission[] };

const initialRoles: Role[] = [
  {
    id: "owner",
    label: "Owner",
    count: 1,
    initials: "EC",
    color: "bg-primary/15 text-primary",
    locked: true,
  },
  {
    id: "admin",
    label: "Admin",
    count: 3,
    initials: "AM",
    color: "bg-success/15 text-success",
  },
  {
    id: "editor",
    label: "Editor",
    count: 8,
    initials: "JL",
    color: "bg-info/15 text-info",
  },
  {
    id: "viewer",
    label: "Viewer",
    count: 14,
    initials: "SR",
    color: "bg-warning/15 text-warning",
  },
  {
    id: "billing",
    label: "Billing",
    count: 2,
    initials: "MK",
    color: "bg-muted text-muted-foreground",
  },
];

const permissionGroups: PermissionGroup[] = [
  {
    id: "projects",
    label: "Projects",
    permissions: [
      { id: "view-projects", label: "View projects" },
      { id: "create-projects", label: "Create projects" },
      { id: "edit-projects", label: "Edit project settings" },
      { id: "delete-projects", label: "Delete projects" },
    ],
  },
  {
    id: "members",
    label: "Members",
    permissions: [
      { id: "invite-members", label: "Invite members" },
      { id: "change-roles", label: "Change member roles" },
      { id: "remove-members", label: "Remove members" },
    ],
  },
  {
    id: "billing",
    label: "Billing",
    permissions: [
      { id: "view-invoices", label: "View invoices" },
      { id: "manage-plan", label: "Manage plan" },
      { id: "manage-payment", label: "Manage payment method" },
    ],
  },
];

const allPermissions = permissionGroups.flatMap((group) => group.permissions);
const allPermissionIds = allPermissions.map((permission) => permission.id);
const initialGrants: Record<string, Record<string, boolean>> = {
  owner: Object.fromEntries(allPermissionIds.map((id) => [id, true])),
  admin: Object.fromEntries(allPermissionIds.map((id) => [id, !["delete-projects", "manage-payment"].includes(id)])),
  editor: Object.fromEntries(
    allPermissionIds.map((id) => [
      id,
      ["view-projects", "create-projects", "edit-projects", "invite-members"].includes(id),
    ]),
  ),
  viewer: Object.fromEntries(allPermissionIds.map((id) => [id, id === "view-projects"])),
  billing: Object.fromEntries(
    allPermissionIds.map((id) => [id, ["view-invoices", "manage-plan", "manage-payment"].includes(id)]),
  ),
};

function cloneGrants(grants: Record<string, Record<string, boolean>>) {
  return Object.fromEntries(Object.entries(grants).map(([roleId, permissions]) => [roleId, { ...permissions }]));
}

function groupStatus(grants: Record<string, boolean> | undefined, permissions: Permission[]) {
  const selected = permissions.filter((permission) => grants?.[permission.id]).length;
  return selected === 0 ? "none" : selected === permissions.length ? "all" : "mixed";
}

export function RolesPermissionsExample() {
  const [roles, setRoles] = React.useState(initialRoles);
  const [grants, setGrants] = React.useState(() => cloneGrants(initialGrants));
  const [savedGrants, setSavedGrants] = React.useState(() => cloneGrants(initialGrants));
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({
    projects: true,
    members: true,
    billing: true,
  });
  const [status, setStatus] = React.useState("");
  const matrixRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const dirty = JSON.stringify(grants) !== JSON.stringify(savedGrants);

  function updatePermission(roleId: string, permissionId: string, value: boolean) {
    setGrants((current) => ({
      ...current,
      [roleId]: { ...current[roleId], [permissionId]: value },
    }));
    setStatus(
      `${permissionId} ${value ? "enabled" : "disabled"} for ${roles.find((role) => role.id === roleId)?.label ?? "role"}`,
    );
  }

  function toggleGroup(role: Role, group: PermissionGroup) {
    if (role.locked) return;
    const currentStatus = groupStatus(grants[role.id], group.permissions);
    const nextValue = currentStatus !== "all";
    setGrants((current) => ({
      ...current,
      [role.id]: {
        ...current[role.id],
        ...Object.fromEntries(group.permissions.map((permission) => [permission.id, nextValue])),
      },
    }));
    setStatus(`${group.label} permissions ${nextValue ? "enabled" : "disabled"} for ${role.label}`);
  }

  function duplicateRole(role: Role) {
    const copyId = `${role.id}-copy-${roles.length}`;
    setRoles((current) => [
      ...current,
      {
        ...role,
        id: copyId,
        label: `${role.label} copy`,
        count: 0,
        initials: "NR",
        locked: false,
      },
    ]);
    setGrants((current) => ({ ...current, [copyId]: { ...current[role.id] } }));
    setStatus(`${role.label} duplicated`);
  }

  function moveMatrixFocus(event: React.KeyboardEvent<HTMLButtonElement>) {
    const cells = Array.from(matrixRef.current?.querySelectorAll<HTMLButtonElement>("[data-permission-cell]") ?? []);
    const currentIndex = cells.indexOf(event.currentTarget);
    if (currentIndex < 0) return;
    const columns = roles.length;
    const row = Math.floor(currentIndex / columns);
    const column = currentIndex % columns;
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = row * columns + Math.min(column + 1, columns - 1);
    if (event.key === "ArrowLeft") nextIndex = row * columns + Math.max(column - 1, 0);
    if (event.key === "ArrowDown") nextIndex = Math.min(currentIndex + columns, cells.length - 1);
    if (event.key === "ArrowUp") nextIndex = Math.max(currentIndex - columns, 0);
    if (event.key === "Home") nextIndex = row * columns;
    if (event.key === "End") nextIndex = row * columns + columns - 1;
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = cells.length - 1;
    }
    if (nextIndex !== currentIndex) {
      event.preventDefault();
      cells[nextIndex]?.focus();
    }
  }

  const save = React.useCallback(() => {
    setSavedGrants(cloneGrants(grants));
    setStatus("Permission changes saved");
  }, [grants]);

  function discard() {
    setGrants(cloneGrants(savedGrants));
    setStatus("Permission changes discarded");
  }

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s" && dirty) {
        event.preventDefault();
        save();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dirty, save]);

  return (
    <div className="grid min-w-0 gap-5">
      <section className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b p-5 sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="bg-primary/10 text-primary grid size-10 shrink-0 place-items-center rounded-lg">
              <IconUsersGroup className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Roles and permissions</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Northwind Analytics · 28 members across {roles.length} roles
              </p>
            </div>
          </div>
          <div className="flex -space-x-2">
            <span className="border-card bg-primary/15 text-primary grid size-8 place-items-center rounded-full border-2 text-[10px] font-semibold">
              EC
            </span>
            <span className="border-card bg-info/15 text-info grid size-8 place-items-center rounded-full border-2 text-[10px] font-semibold">
              AM
            </span>
            <span className="border-card bg-success/15 text-success grid size-8 place-items-center rounded-full border-2 text-[10px] font-semibold">
              JL
            </span>
            <span className="border-card bg-muted grid size-8 place-items-center rounded-full border-2 text-xs font-medium">
              +24
            </span>
          </div>
        </header>
        <section ref={matrixRef} aria-label="Workspace permissions matrix" className="min-w-0 overflow-x-auto">
          <div
            className="bg-background grid min-w-[48rem] border-b"
            style={{
              gridTemplateColumns: `minmax(12rem, 1.35fr) repeat(${roles.length}, minmax(5.5rem, 1fr))`,
            }}
          >
            <div className="bg-background text-muted-foreground sticky left-0 z-10 flex items-end px-4 py-4 text-sm sm:px-6">
              Permission
            </div>
            {roles.map((role) => (
              <div key={role.id} className="group/role relative grid justify-items-center gap-1 px-2 py-3 text-center">
                <div className="flex items-center gap-1 text-sm font-medium">
                  {role.locked && <IconLock className="text-muted-foreground size-4" aria-label="Locked role" />}
                  {role.label}
                  {!role.locked && (
                    <button
                      type="button"
                      className="text-muted-foreground hover:bg-muted rounded p-0.5 opacity-0 transition-opacity group-hover/role:opacity-100 focus-visible:opacity-100"
                      aria-label={`Duplicate ${role.label} role`}
                      onClick={() => duplicateRole(role)}
                    >
                      <IconCopy className="size-3.5" />
                    </button>
                  )}
                </div>
                <span className="text-muted-foreground text-xs">
                  {role.count} {role.count === 1 ? "person" : "people"}
                </span>
              </div>
            ))}
          </div>
          {permissionGroups.map((group) => (
            <React.Fragment key={group.id}>
              <div
                className="bg-muted/20 grid min-w-[48rem] border-b"
                style={{
                  gridTemplateColumns: `minmax(12rem, 1.35fr) repeat(${roles.length}, minmax(5.5rem, 1fr))`,
                }}
              >
                <button
                  type="button"
                  className="bg-muted/20 sticky left-0 z-10 flex items-center gap-2 px-4 py-3 text-left sm:px-6"
                  aria-expanded={openGroups[group.id]}
                  onClick={() =>
                    setOpenGroups((current) => ({
                      ...current,
                      [group.id]: !current[group.id],
                    }))
                  }
                >
                  <span className="text-muted-foreground">
                    {openGroups[group.id] ? (
                      <IconChevronDown className="size-4" />
                    ) : (
                      <IconChevronRight className="size-4" />
                    )}
                  </span>
                  <span className="text-sm font-medium">{group.label}</span>
                  <span className="text-muted-foreground text-xs">{group.permissions.length}</span>
                </button>
                {roles.map((role) => {
                  const state = groupStatus(grants[role.id], group.permissions);
                  return (
                    <button
                      key={role.id}
                      type="button"
                      aria-label={`${group.label} permissions for ${role.label}`}
                      aria-pressed={state === "all" ? true : state === "none" ? false : "mixed"}
                      disabled={role.locked}
                      onClick={() => toggleGroup(role, group)}
                      className="focus-visible:ring-ring grid place-items-center p-3 outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-90"
                    >
                      <span
                        className={cn(
                          "grid size-7 place-items-center rounded-md border transition-colors",
                          state === "all" && "border-primary bg-primary text-primary-foreground",
                          state === "mixed" && "border-primary text-primary",
                          state === "none" && "bg-background",
                        )}
                      >
                        {state === "all" ? (
                          <IconCheck className="size-4" />
                        ) : state === "mixed" ? (
                          <IconMinus className="size-4" />
                        ) : null}
                      </span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence initial={false}>
                {openGroups[group.id] &&
                  group.permissions.map((permission, rowIndex) => (
                    <motion.div
                      key={permission.id}
                      initial={{
                        opacity: reduced ? 1 : 0,
                        height: reduced ? "auto" : 0,
                      }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{
                        opacity: reduced ? 0 : 0,
                        height: reduced ? "auto" : 0,
                      }}
                      transition={{ duration: reduced ? 0 : 0.14 }}
                      className="grid min-w-[48rem] border-b last:border-b-0"
                      style={{
                        gridTemplateColumns: `minmax(12rem, 1.35fr) repeat(${roles.length}, minmax(5.5rem, 1fr))`,
                      }}
                    >
                      <div className="bg-card sticky left-0 z-10 flex items-center px-4 py-3 pl-11 text-sm sm:px-6 sm:pl-14">
                        {permission.label}
                      </div>
                      {roles.map((role) => {
                        const checked = grants[role.id]?.[permission.id] ?? false;
                        const cellIndex =
                          permissionGroups
                            .slice(
                              0,
                              permissionGroups.findIndex((item) => item.id === group.id),
                            )
                            .reduce((total, item) => total + item.permissions.length, 0) +
                          rowIndex * roles.length +
                          roles.findIndex((item) => item.id === role.id);
                        return (
                          <button
                            key={role.id}
                            data-permission-cell
                            type="button"
                            aria-label={`${permission.label} for ${role.label}`}
                            aria-pressed={checked}
                            disabled={role.locked}
                            tabIndex={cellIndex === 0 ? 0 : -1}
                            onClick={() => updatePermission(role.id, permission.id, !checked)}
                            onKeyDown={moveMatrixFocus}
                            className="focus-visible:ring-ring grid place-items-center p-3 outline-none focus-visible:ring-2 focus-visible:ring-inset disabled:cursor-not-allowed"
                          >
                            <motion.span
                              initial={false}
                              animate={{ scale: checked ? 1 : 0.94 }}
                              className={cn(
                                "grid size-7 place-items-center rounded-md border transition-colors",
                                checked ? "border-primary bg-primary text-primary-foreground" : "bg-background",
                              )}
                            >
                              {checked && <IconCheck className="size-4" />}
                            </motion.span>
                          </button>
                        );
                      })}
                    </motion.div>
                  ))}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </section>
      </section>
      <AnimatePresence initial={false}>
        {dirty && (
          <motion.div
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduced ? 0 : 0, y: reduced ? 0 : 12 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            className="border-border bg-card/95 sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-sm sm:px-4"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-primary size-2 rounded-full" aria-hidden="true" />
              <span>
                <strong>Unsaved permission changes</strong>
                <span className="text-muted-foreground ml-2 hidden sm:inline">Use ⌘/Ctrl + S to save</span>
              </span>
            </div>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="ghost" onClick={discard}>
                Discard
              </Button>
              <Button type="button" size="sm" onClick={save}>
                <IconCheck />
                Save changes
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
