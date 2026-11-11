"use client";

import { type ComponentProps, useState } from "react";

import {
  IconBrandGithub,
  IconChevronDown,
  IconCreditCard,
  IconDotsVertical,
  IconSettings,
  IconShieldCheck,
} from "@tabler/icons-react";

import { UserMenu } from "@/components/composite/user-menu";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/user";
import { getInitials } from "@/lib/utils";

const currentWorkspace = { type: "Free" };

const userMenuItems = [
  { kind: "internal", label: "Profile", href: "/blocks/settings/settings-page", icon: <IconSettings /> },
  { kind: "internal", label: "Security", href: "/blocks/settings/security-settings", icon: <IconShieldCheck /> },
  { kind: "internal", label: "Billing", href: "/blocks/settings/billing-overview", icon: <IconCreditCard /> },
  { kind: "external", label: "Project source", href: "https://github.com", icon: <IconBrandGithub /> },
] satisfies ComponentProps<typeof UserMenu>["items"];

function AccountMenuDemo({ placement }: { placement: "topbar" | "sidebar" }) {
  const [feedback, setFeedback] = useState("Choose an account action to see its result.");

  return (
    <div className="space-y-3">
      <UserMenu
        user={currentUser}
        workspaceType={currentWorkspace.type}
        items={userMenuItems}
        desktopSide={placement === "sidebar" ? "right" : "bottom"}
        renderTrigger={({ open, mobile }) =>
          placement === "sidebar" ? (
            <Button
              variant="ghost"
              className="h-auto w-full justify-start gap-3 border border-border/70 bg-card/80 px-2 py-2 shadow-resting hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
              aria-label={`Open account menu for ${currentUser.name}`}
              aria-haspopup={mobile ? "dialog" : "menu"}
              aria-expanded={open}
              data-state={open ? "open" : "closed"}
            >
              <Avatar className="ring-1 ring-border/70">
                <AvatarImage src={currentUser.avatar} alt="" />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <span className="grid min-w-0 flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="truncate text-xs text-muted-foreground">{currentUser.email}</span>
              </span>
              <IconDotsVertical className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-10 gap-2 border border-border/70 bg-card/80 px-2 shadow-resting hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
              aria-label={`Open account menu for ${currentUser.name}`}
              aria-haspopup={mobile ? "dialog" : "menu"}
              aria-expanded={open}
              data-state={open ? "open" : "closed"}
            >
              <Avatar className="ring-1 ring-border/70">
                <AvatarImage src={currentUser.avatar} alt="" />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">{currentUser.name}</span>
              <IconChevronDown className="size-4 text-muted-foreground" />
            </Button>
          )
        }
        onSignOut={async () => {
          await new Promise<void>((resolve) => setTimeout(resolve, 700));
          setFeedback("Sign out finished. The menu can be opened again.");
        }}
      />
      <p role="status" className="text-xs text-muted-foreground">
        {feedback}
      </p>
    </div>
  );
}

export function UserMenuExamples() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Top bar account menu">
        <AccountMenuDemo placement="topbar" />
      </ComponentPreview>
      <ComponentPreview title="Sidebar account menu">
        <AccountMenuDemo placement="sidebar" />
      </ComponentPreview>
    </div>
  );
}
