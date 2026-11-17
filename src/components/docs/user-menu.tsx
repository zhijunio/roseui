"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { CreditCard, LogOut, type LucideIcon, MessageSquareDot, Moon, Sun, UserCircle } from "lucide-react";
import { useTheme } from "next-themes";

import { Menu, MenuHeader, MenuItem, MenuSection, MenuSeparator, MenuTrigger } from "@/components/roseui/menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export type AccountUser = {
  name: string;
  email: string;
  avatar: string;
};

type UserMenuItem = {
  label: string;
  icon: LucideIcon;
};

const userMenuItems = [
  { label: "Profile", icon: UserCircle },
  { label: "Billing", icon: CreditCard },
  { label: "Notifications", icon: MessageSquareDot },
] satisfies readonly UserMenuItem[];

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

export function UserAvatar({ user, className }: { user: AccountUser; className?: string }) {
  return (
    <Avatar className={cn("rounded-lg", className)}>
      <AvatarImage src={user.avatar} alt={user.name} className="z-10" />
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
  user: AccountUser;
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  contentClassName?: string;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const themeLabel = nextTheme === "dark" ? "Switch to dark theme" : "Switch to light theme";
  const ThemeIcon = nextTheme === "dark" ? Moon : Sun;

  const handleSignOut = () => {
    setOpen(false);
    router.push("/pre-blocks/auth/sign-in");
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
        <MenuItem key={label}>
          <Icon />
          {label}
        </MenuItem>
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
      <MenuItem onSelect={() => setTheme(nextTheme)}>{content}</MenuItem>
    );
  };

  const signOutAction = (mobile: boolean) => {
    const content = (
      <>
        <LogOut className="size-4" />
        <span>Sign out</span>
      </>
    );

    return mobile ? (
      <button
        type="button"
        className="text-destructive hover:bg-destructive/10 focus-visible:ring-ring flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm outline-none focus-visible:ring-2"
        onClick={handleSignOut}
      >
        {content}
      </button>
    ) : (
      <MenuItem intent="danger" onSelect={handleSignOut}>
        {content}
      </MenuItem>
    );
  };

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
            {signOutAction(true)}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <MenuTrigger open={open} onOpenChange={setOpen}>
      {children}
      <Menu className={cn("min-w-56 rounded-lg", contentClassName)} side={side} align="end" sideOffset={4}>
        <MenuHeader className="p-0 font-normal">{identity}</MenuHeader>
        <MenuSeparator />
        <MenuSection>{accountMenu(false)}</MenuSection>
        <MenuSeparator />
        {themeAction(false)}
        {signOutAction(false)}
      </Menu>
    </MenuTrigger>
  );
}
