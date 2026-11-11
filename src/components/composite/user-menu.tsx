"use client";

import * as React from "react";

import Link from "next/link";

import { IconLogout, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn, getInitials } from "@/lib/utils";

type AccountUser = {
  name: string;
  email: string;
  avatar?: string;
};

type UserMenuItem =
  | {
      kind: "internal";
      label: string;
      href: string;
      icon: React.ReactNode;
    }
  | {
      kind: "external";
      label: string;
      href: string;
      icon: React.ReactNode;
    };

type UserMenuProps = {
  user: AccountUser;
  items: UserMenuItem[];
  workspaceType?: string;
  desktopSide?: "top" | "right" | "bottom" | "left";
  renderTrigger: (state: { open: boolean; mobile: boolean }) => React.ReactElement;
  onSignOut: () => Promise<void>;
  className?: string;
};

export function UserMenu({
  user,
  items,
  workspaceType,
  desktopSide = "bottom",
  renderTrigger,
  onSignOut,
  className,
}: UserMenuProps) {
  const isMobile = useIsMobile();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);
  const [signOutFailed, setSignOutFailed] = React.useState(false);
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const themeLabel = nextTheme === "dark" ? "Switch to dark theme" : "Switch to light theme";
  const ThemeIcon = nextTheme === "dark" ? IconMoon : IconSun;

  const handleSignOut = async () => {
    setSigningOut(true);
    setSignOutFailed(false);
    try {
      await onSignOut();
      setOpen(false);
    } catch {
      setSignOutFailed(true);
    } finally {
      setSigningOut(false);
    }
  };

  const identity = (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="size-10 shrink-0 rounded-lg">
        {user.avatar && <AvatarImage src={user.avatar} alt="" />}
        <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="grid min-w-0 flex-1 leading-tight">
        <span className="truncate text-sm font-medium">{user.name}</span>
        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
      </div>
      {workspaceType && (
        <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-[10px] font-medium">
          {workspaceType}
        </span>
      )}
    </div>
  );

  const accountLinks = (mobile: boolean) =>
    items.map((item) => {
      const content = (
        <>
          {item.icon}
          <span>{item.label}</span>
        </>
      );
      const linkClassName = mobile
        ? "flex min-h-11 items-center gap-3 rounded-md px-3 text-sm outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        : undefined;

      if (item.kind === "external") {
        return mobile ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={linkClassName}
            onClick={() => setOpen(false)}
          >
            {content}
          </a>
        ) : (
          <DropdownMenuItem key={item.label} asChild>
            <a href={item.href} target="_blank" rel="noreferrer">
              {content}
            </a>
          </DropdownMenuItem>
        );
      }

      return mobile ? (
        <Link key={item.label} href={item.href} className={linkClassName} onClick={() => setOpen(false)}>
          {content}
        </Link>
      ) : (
        <DropdownMenuItem key={item.label} asChild>
          <Link href={item.href}>{content}</Link>
        </DropdownMenuItem>
      );
    });

  const themeAction = (mobile: boolean) => {
    const content = (
      <>
        <ThemeIcon className="size-4" />
        <span>{themeLabel}</span>
      </>
    );
    if (mobile) {
      return (
        <button
          type="button"
          className="hover:bg-accent focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm outline-none focus-visible:ring-2"
          onClick={() => setTheme(nextTheme)}
        >
          {content}
        </button>
      );
    }
    return <DropdownMenuItem onSelect={() => setTheme(nextTheme)}>{content}</DropdownMenuItem>;
  };

  const signOutAction = (mobile: boolean) => {
    const content = (
      <>
        {signingOut ? <Spinner className="size-4" label="Signing out" /> : <IconLogout className="size-4" />}
        <span>{signingOut ? "Signing out…" : "Sign out"}</span>
      </>
    );
    if (mobile) {
      return (
        <button
          type="button"
          className="text-destructive hover:bg-destructive/10 focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
          onClick={handleSignOut}
          disabled={signingOut}
          aria-busy={signingOut}
        >
          {content}
        </button>
      );
    }
    return (
      <DropdownMenuItem
        variant="destructive"
        onSelect={(event) => {
          event.preventDefault();
          void handleSignOut();
        }}
        disabled={signingOut}
        aria-busy={signingOut}
      >
        {content}
      </DropdownMenuItem>
    );
  };

  const failureMessage = signOutFailed && (
    <p role="status" className="text-destructive px-3 py-2 text-xs">
      Could not sign out. Try again.
    </p>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{renderTrigger({ open, mobile: true })}</SheetTrigger>
        <SheetContent
          side="bottom"
          detached
          swipeDirection="down"
          className={cn("gap-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]", className)}
        >
          <SheetHeader className="p-0 pb-4">
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <div className="border-b pb-4">{identity}</div>
          <div className="grid gap-1 py-3">{accountLinks(true)}</div>
          <div className="grid gap-1 border-t pt-3">
            {themeAction(true)}
            {failureMessage}
            {signOutAction(true)}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>{renderTrigger({ open, mobile: false })}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={desktopSide}
        align="end"
        className={cn("!bg-card w-64 !border-0 !p-0 !shadow-none !ring-0", className)}
      >
        <DropdownMenuLabel className="p-2 font-normal">{identity}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accountLinks(false)}
        <DropdownMenuSeparator />
        {themeAction(false)}
        {failureMessage}
        {signOutAction(false)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
