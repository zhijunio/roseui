"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ChevronRight, Search } from "lucide-react";
import { Focusable } from "react-aria-components/Focusable";

import { ThemeCustomizer } from "@/components/docs/theme-customizer";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { UserAvatar, UserMenu } from "@/components/docs/user-menu";
import { Button } from "@/components/ui/button";
import {
  CommandMenu,
  CommandMenuItem,
  CommandMenuLabel,
  CommandMenuList,
  CommandMenuSearch,
  CommandMenuSection,
} from "@/components/ui/command-menu";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV_DATA, type NavItem } from "@/data/nav";
import { currentUser } from "@/data/user";
import { useIsMac } from "@/hooks/use-platform";
import { getBreadcrumbItems } from "@/lib/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen: setSidebarOpen } = useSidebar();
  const breadcrumbs = getBreadcrumbItems(pathname);
  const isMac = useIsMac();
  const [open, setOpen] = React.useState(false);

  const go = React.useCallback(
    (url: string) => {
      setOpen(false);
      setSidebarOpen(true);
      router.push(url);
    },
    [router, setSidebarOpen],
  );

  return (
    <header className="bg-background [html[data-navbar-style=sticky]_&]:bg-background/80 flex h-16 shrink-0 items-center gap-2 border-b ease-linear group-has-data-[collapsible=dock]/sidebar-wrapper:h-16 motion-safe:transition-[width,height] [html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-20 [html[data-navbar-style=sticky]_&]:backdrop-blur-md">
      <div className="mx-auto flex w-full items-center gap-1 px-3 md:px-4 lg:gap-2 [html[data-content-layout=centered]_&]:max-w-screen-2xl">
        <SidebarTrigger className="-ml-1" />
        <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
          <ol className="flex min-w-0 flex-nowrap overflow-hidden">
            {breadcrumbs.map((breadcrumb, index) => {
              const isCurrent = index === breadcrumbs.length - 1;

              return (
                <li
                  key={`${breadcrumb.label}-${breadcrumb.href ?? "current"}`}
                  className="flex min-w-0 items-center gap-2 text-sm"
                >
                  {breadcrumb.href && !isCurrent ? (
                    <Link href={breadcrumb.href} className="max-w-24 truncate sm:max-w-40">
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isCurrent ? "page" : undefined}
                      className={`${isCurrent ? "max-w-40 font-medium sm:max-w-64" : "text-muted-foreground max-w-32 sm:max-w-48"} truncate px-1.5 py-1`}
                    >
                      {breadcrumb.label}
                    </span>
                  )}
                  {!isCurrent && (
                    <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <TooltipTrigger delay={0}>
            <Focusable>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Search pages"
                aria-haspopup="dialog"
                aria-expanded={open}
                onPress={() => setOpen(true)}
              >
                <Search aria-hidden="true" />
              </Button>
            </Focusable>
            <Tooltip>Search pages ({isMac ? "⌘" : "Ctrl"}+K)</Tooltip>
          </TooltipTrigger>
          <ThemeCustomizer />
          <ThemeToggle />
          <UserMenu user={currentUser} contentClassName="w-56">
            <Button variant="ghost" size="icon-sm" aria-label="Open user menu" className="rounded-full">
              <UserAvatar user={currentUser} className="size-7" />
            </Button>
          </UserMenu>
          <CommandMenu isOpen={open} onOpenChange={setOpen} shortcut="k" aria-label="Search pages">
            <CommandMenuSearch placeholder="Type to search pages..." />
            <CommandMenuList aria-label="Pages">
              {NAV_DATA.map((section) => (
                <CommandMenuSection key={section.label} label={section.label}>
                  {section.items.flatMap((item: NavItem) => {
                    const ItemIcon = item.icon;

                    if (item.items?.length) {
                      return item.items.map((subItem) => (
                        <CommandMenuItem
                          key={`${section.label}-${subItem.url}`}
                          textValue={`${item.title} ${subItem.title}`}
                          onAction={() => go(subItem.url)}
                        >
                          {ItemIcon ? <ItemIcon className="size-4" aria-hidden="true" /> : null}
                          <CommandMenuLabel>{subItem.title}</CommandMenuLabel>
                        </CommandMenuItem>
                      ));
                    }

                    if (!("url" in item) || !item.url) return [];

                    const itemUrl = item.url;
                    return [
                      <CommandMenuItem
                        key={`${section.label}-${itemUrl}`}
                        textValue={item.title}
                        onAction={() => go(itemUrl)}
                      >
                        {ItemIcon ? <ItemIcon className="size-4" aria-hidden="true" /> : null}
                        <CommandMenuLabel>{item.title}</CommandMenuLabel>
                      </CommandMenuItem>,
                    ];
                  })}
                </CommandMenuSection>
              ))}
            </CommandMenuList>
          </CommandMenu>
        </div>
      </div>
    </header>
  );
}
