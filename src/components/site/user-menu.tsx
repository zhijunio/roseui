"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import type { User } from "@/data/user";
import { userMenuItems } from "@/data/user-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

export function UserAvatar({ user, className }: { user: User; className?: string }) {
  return (
    <Avatar className={cn("rounded-lg", className)}>
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
    </Avatar>
  );
}

export function UserMenu({
  user,
  children,
  side = "bottom",
  contentClassName,
}: {
  user: User;
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  contentClassName?: string;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);
  const [signOutFailed, setSignOutFailed] = React.useState(false);
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const themeLabel = nextTheme === "dark" ? "Switch to dark theme" : "Switch to light theme";
  const ThemeIcon = nextTheme === "dark" ? Moon : Sun;

  const handleSignOut = async () => {
    setSigningOut(true);
    setSignOutFailed(false);

    try {
      router.push("/components/accordion");
      setOpen(false);
    } catch {
      setSignOutFailed(true);
    } finally {
      setSigningOut(false);
    }
  };

  const identity = (
    <div className="flex min-w-0 items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserAvatar user={user} />
      <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="text-muted-foreground truncate text-xs">{user.email}</span>
      </div>
    </div>
  );

  const accountMenu = (mobile: boolean) =>
    userMenuItems.map(({ label, icon: Icon }) =>
      mobile ? (
        <button
          key={label}
          type="button"
          className="hover:bg-accent focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm outline-none focus-visible:ring-2"
        >
          <Icon className="size-4" />
          <span>{label}</span>
        </button>
      ) : (
        <DropdownMenuItem key={label}>
          <Icon />
          {label}
        </DropdownMenuItem>
      ),
    );

  const themeAction = (mobile: boolean) => {
    const content = (
      <>
        <ThemeIcon className="size-4" />
        <span>{themeLabel}</span>
      </>
    );

    return mobile ? (
      <button
        type="button"
        className="hover:bg-accent focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm outline-none focus-visible:ring-2"
        onClick={() => setTheme(nextTheme)}
      >
        {content}
      </button>
    ) : (
      <DropdownMenuItem onSelect={() => setTheme(nextTheme)}>{content}</DropdownMenuItem>
    );
  };

  const signOutAction = (mobile: boolean) => {
    const content = (
      <>
        {signingOut ? <Spinner className="size-4" /> : <LogOut className="size-4" />}
        <span>{signingOut ? "Signing out..." : "Sign out"}</span>
      </>
    );

    return mobile ? (
      <button
        type="button"
        className="text-destructive hover:bg-destructive/10 focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        onClick={() => void handleSignOut()}
        disabled={signingOut}
        aria-busy={signingOut}
      >
        {content}
      </button>
    ) : (
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

  const failureMessage = signOutFailed ? (
    <p role="status" className="text-destructive px-3 py-2 text-xs">
      Could not sign out. Try again.
    </p>
  ) : null;

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side="bottom" className="gap-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <SheetHeader className="p-0 pb-4">
            <SheetTitle>Profile</SheetTitle>
          </SheetHeader>
          <div className="border-b pb-4">{identity}</div>
          <div className="grid gap-1 py-3">{accountMenu(true)}</div>
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
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn("min-w-56 rounded-lg", contentClassName)}
        side={side}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">{identity}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>{accountMenu(false)}</DropdownMenuGroup>
        <DropdownMenuSeparator />
        {themeAction(false)}
        {failureMessage}
        {signOutAction(false)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
