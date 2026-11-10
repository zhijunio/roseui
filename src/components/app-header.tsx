"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconBell,
  IconBrandGithub,
  IconSearch,
  IconCreditCard,
  IconSettings,
  IconShieldCheck,
} from "@tabler/icons-react";

import { navGroups } from "@/data/nav";
import { currentUser, getPersonAvatar } from "@/data/avatar-data";
import { getBreadcrumbLabels } from "@/lib/navigation";
import { useIsMac } from "@/hooks/use-platform";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CustomizerButton,
  useThemeConfig,
} from "@/components/theme-customizer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/composite/user-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/composite/command";

const currentWorkspace = { type: "Free" };

const userMenuItems = [
  { kind: "internal", label: "Profile", href: "/blocks/settings/settings-page", icon: <IconSettings /> },
  { kind: "internal", label: "Security", href: "/blocks/settings/security-settings", icon: <IconShieldCheck /> },
  { kind: "internal", label: "Billing", href: "/blocks/settings/billing-overview", icon: <IconCreditCard /> },
  {
    kind: "external",
    label: "Project source",
    href: "https://github.com/zhijunio/roseui",
    icon: <IconBrandGithub />,
  },
] satisfies React.ComponentProps<typeof UserMenu>["items"];

const recentActivity = [
  { id: "a1", user: "Emma Carter", avatar: getPersonAvatar("Emma Carter"), action: "created a new order", target: "#ORD-7241", time: "2 min ago" },
  { id: "a2", user: "Liam Nguyen", avatar: getPersonAvatar("Liam Nguyen"), action: "upgraded to", target: "Enterprise plan", time: "18 min ago" },
  { id: "a3", user: "Olivia Patel", avatar: getPersonAvatar("Olivia Patel"), action: "left a review on", target: "Pulse Watch", time: "1 hour ago" },
  { id: "a4", user: "Noah Kim", avatar: getPersonAvatar("Noah Kim"), action: "requested a refund for", target: "#ORD-7188", time: "3 hours ago" },
];

function useBreadcrumb() {
  const pathname = usePathname();
  return getBreadcrumbLabels(pathname);
}

export function AppHeader() {
  const crumbs = useBreadcrumb();
  const router = useRouter();
  const isMac = useIsMac();
  const { isMobile } = useSidebar();
  const { config } = useThemeConfig();
  const [open, setOpen] = React.useState(false);

  const go = React.useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
      {(config.sidebarCollapsible !== "none" || isMobile) && (
        <SidebarTrigger className="-ml-1" />
      )}
      <Breadcrumb className="hidden sm:block">
        <BreadcrumbList>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={
                    i < crumbs.length - 1 ? "text-muted-foreground" : ""
                  }
                >
                  {c}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {i < crumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          className="hidden h-9 w-56 justify-start gap-2 bg-muted/50 px-3 text-muted-foreground hover:bg-muted md:flex"
          onClick={() => setOpen(true)}
        >
          <IconSearch className="size-4" />
          <span className="text-sm">Search…</span>
          <KbdGroup className="ml-auto">
            <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
            <span className="text-[11px] font-medium text-muted-foreground">+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <IconSearch className="size-5" />
        </Button>

        <NotificationsMenu />
        <ThemeToggle />
        <CustomizerButton />
        <UserMenu
          user={currentUser}
          workspaceType={currentWorkspace.type}
          items={userMenuItems}
          renderTrigger={({ open: menuOpen, mobile }) => (
            <Button
              variant="ghost"
              className="h-9 gap-2 bg-card/80 px-1.5 shadow-resting hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
              aria-label={`Open account menu for ${currentUser.name}`}
              aria-haspopup={mobile ? "dialog" : "menu"}
              aria-expanded={menuOpen}
              data-state={menuOpen ? "open" : "closed"}
            >
              <Avatar className="size-8 rounded-md after:border-0">
                <AvatarImage src={currentUser.avatar} alt="" />
                <AvatarFallback className="rounded-md">AM</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium lg:inline">
                {currentUser.name}
              </span>
            </Button>
          )}
          onSignOut={async () => {
            toast.success("Signed out", { description: "Your session has ended." });
            router.push("/blocks/auth/sign-in");
          }}
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {navGroups.map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.flatMap((item) => {
                if (item.items?.length) {
                  return item.items.map((sub) => (
                    <CommandItem
                      key={sub.title}
                      value={`${item.title} ${sub.title}`}
                      onSelect={() => go(sub.url)}
                    >
                      {item.icon && <item.icon className="size-4" />}
                      <span className="min-w-0 flex-1 truncate">{sub.title}</span>
                      {sub.badge && <span className="text-[10px] font-medium text-muted-foreground">{sub.badge}</span>}
                    </CommandItem>
                  ));
                }
                return (
                  <CommandItem
                    key={item.title}
                    value={item.title}
                    onSelect={() => go(item.url ?? "#")}
                  >
                    {item.icon && <item.icon className="size-4" />}
                    <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </header>
  );
}

function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <IconBell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[calc(100vw-1rem)] sm:w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <div>
            <DropdownMenuLabel className="p-0">Example activity</DropdownMenuLabel>
            <p className="text-xs text-muted-foreground">Preview data for the workspace shell</p>
          </div>
          <Badge variant="secondary">3 examples</Badge>
        </div>
        <DropdownMenuSeparator />
        {recentActivity.slice(0, 4).map((a) => (
          <DropdownMenuItem key={a.id} className="items-start gap-3 py-2.5">
            <Avatar className="size-8">
              <AvatarImage src={a.avatar} alt={a.user} />
              <AvatarFallback>{a.user.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 gap-0.5">
              <p className="line-clamp-2 whitespace-normal text-sm leading-snug">
                <span className="font-medium">{a.user}</span> {a.action}{" "}
                <span className="font-medium">{a.target}</span>
              </p>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center text-sm font-medium">
          <Link href="/blocks/app-layout/workspace">View workspace</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
