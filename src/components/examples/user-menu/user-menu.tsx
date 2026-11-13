"use client";

import { type ReactNode, useState } from "react";

import {
  CreditCard,
  ChevronDown as IconChevronDown,
  EllipsisVertical as IconDotsVertical,
  MessageSquareDot,
  UserCircle,
} from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/ui/user-menu";
import { demoAvatarUrl, getInitials } from "@/lib/utils";

const currentUser = {
  name: "Alex Morgan",
  email: "alex.morgan@roseui.com",
  avatar: demoAvatarUrl("Alex Morgan"),
};
const currentWorkspace = { type: "Free" };

type DemoUserMenuItem =
  | { kind: "internal"; label: string; href: string; icon: ReactNode }
  | { kind: "external"; label: string; href: string; icon: ReactNode };

const userMenuDemoItems = [
  {
    kind: "internal",
    label: "Profile",
    href: "/docs/components/layouts/user-menu",
    icon: <UserCircle aria-hidden="true" />,
  },
  {
    kind: "internal",
    label: "Billing",
    href: "/docs/components/forms/payment-field",
    icon: <CreditCard aria-hidden="true" />,
  },
  {
    kind: "external",
    label: "Project source",
    href: "https://github.com/zhijunio/roseui",
    icon: <MessageSquareDot aria-hidden="true" />,
  },
] satisfies DemoUserMenuItem[];

function AccountMenuDemo({ placement }: { placement: "topbar" | "sidebar" }) {
  const [feedback, setFeedback] = useState("Choose an account action to see its result.");

  return (
    <div className="space-y-3">
      <UserMenu
        user={currentUser}
        workspaceType={currentWorkspace.type}
        items={userMenuDemoItems}
        desktopSide={placement === "sidebar" ? "right" : "bottom"}
        renderTrigger={({ open, mobile }) =>
          placement === "sidebar" ? (
            <Button
              variant="ghost"
              className="border-border/70 bg-card/80 shadow-resting hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground h-auto w-full justify-start gap-3 border px-2 py-2"
              aria-label={`Open account menu for ${currentUser.name}`}
              aria-haspopup={mobile ? "dialog" : "menu"}
              aria-expanded={open}
              data-state={open ? "open" : "closed"}
            >
              <Avatar className="ring-border/70 ring-1">
                <AvatarImage src={currentUser.avatar} alt="" />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <span className="grid min-w-0 flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium">{currentUser.name}</span>
                <span className="text-muted-foreground truncate text-xs">{currentUser.email}</span>
              </span>
              <IconDotsVertical className="text-muted-foreground size-4 shrink-0" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="border-border/70 bg-card/80 shadow-resting hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground h-10 gap-2 border px-2"
              aria-label={`Open account menu for ${currentUser.name}`}
              aria-haspopup={mobile ? "dialog" : "menu"}
              aria-expanded={open}
              data-state={open ? "open" : "closed"}
            >
              <Avatar className="ring-border/70 ring-1">
                <AvatarImage src={currentUser.avatar} alt="" />
                <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">{currentUser.name}</span>
              <IconChevronDown className="text-muted-foreground size-4" />
            </Button>
          )
        }
        onSignOut={async () => {
          await new Promise<void>((resolve) => setTimeout(resolve, 700));
          setFeedback("Sign out finished. The menu can be opened again.");
        }}
      />
      <p role="status" className="text-muted-foreground text-xs">
        {feedback}
      </p>
    </div>
  );
}

export function UserMenuExamples() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Top-bar Trigger">
        <AccountMenuDemo placement="topbar" />
      </ComponentPreview>
      <ComponentPreview title="Sidebar Trigger">
        <AccountMenuDemo placement="sidebar" />
      </ComponentPreview>
    </div>
  );
}
