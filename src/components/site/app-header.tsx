"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Search } from "lucide-react";

import { ThemeCustomizer } from "@/components/site/theme-customizer";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { UserAvatar, UserMenu } from "@/components/site/user-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV_DATA, type NavItem } from "@/data/nav";
import { currentUser } from "@/data/user";
import { useIsMac } from "@/hooks/use-platform";
import { getBreadcrumbItems } from "@/lib/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const breadcrumbs = getBreadcrumbItems(pathname);
  const isMac = useIsMac();
  const [open, setOpen] = React.useState(false);

  const go = React.useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router],
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) return;

      event.preventDefault();
      setOpen((currentOpen) => !currentOpen);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="bg-background [html[data-navbar-style=sticky]_&]:bg-background/80 flex h-16 shrink-0 items-center gap-2 border-b ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 motion-safe:transition-[width,height] [html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-20 [html[data-navbar-style=sticky]_&]:backdrop-blur-md">
      <div className="mx-auto flex w-full items-center gap-1 px-3 md:px-4 lg:gap-2 [html[data-content-layout=centered]_&]:max-w-screen-2xl">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList className="min-w-0 flex-nowrap overflow-hidden">
            {breadcrumbs.map((breadcrumb, index) => {
              const isCurrent = index === breadcrumbs.length - 1;

              return (
                <React.Fragment key={`${breadcrumb.label}-${breadcrumb.href ?? "current"}`}>
                  <BreadcrumbItem className="min-w-0">
                    {breadcrumb.href && !isCurrent ? (
                      <BreadcrumbLink asChild className="max-w-24 truncate sm:max-w-40">
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                      </BreadcrumbLink>
                    ) : isCurrent ? (
                      <BreadcrumbPage className="max-w-40 truncate font-medium sm:max-w-64">
                        {breadcrumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <span className="text-muted-foreground max-w-32 truncate px-1.5 py-1 sm:max-w-48">
                        {breadcrumb.label}
                      </span>
                    )}
                  </BreadcrumbItem>
                  {!isCurrent && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Search pages"
                aria-haspopup="dialog"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <Search aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search pages ({isMac ? "⌘" : "Ctrl"}+K)</TooltipContent>
          </Tooltip>
          <ThemeCustomizer />
          <ThemeToggle />
          <UserMenu user={currentUser} contentClassName="w-56">
            <button
              type="button"
              aria-label="Open user menu"
              className="focus-visible:ring-ring rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <UserAvatar user={currentUser} className="size-7" />
            </button>
          </UserMenu>
          <CommandDialog
            open={open}
            onOpenChange={setOpen}
            title="Search pages"
            description="Search pages and components"
          >
            <CommandInput placeholder="Type to search pages..." />
            <CommandList>
              <CommandEmpty>No pages found.</CommandEmpty>
              {NAV_DATA.map((section) => (
                <CommandGroup key={section.label} heading={section.label}>
                  {section.items.flatMap((item: NavItem) => {
                    const ItemIcon = item.icon;

                    if (item.items?.length) {
                      return item.items.map((subItem) => (
                        <CommandItem
                          key={`${section.label}-${subItem.url}`}
                          value={`${item.title} ${subItem.title}`}
                          onSelect={() => go(subItem.url)}
                        >
                          {ItemIcon ? <ItemIcon className="size-4" aria-hidden="true" /> : null}
                          <span className="min-w-0 truncate">{subItem.title}</span>
                        </CommandItem>
                      ));
                    }

                    if (!("url" in item) || !item.url) return [];

                    const itemUrl = item.url;

                    return [
                      <CommandItem key={`${section.label}-${itemUrl}`} value={item.title} onSelect={() => go(itemUrl)}>
                        {ItemIcon ? <ItemIcon className="size-4" aria-hidden="true" /> : null}
                        <span className="min-w-0 truncate">{item.title}</span>
                      </CommandItem>,
                    ];
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </CommandDialog>
        </div>
      </div>
    </header>
  );
}
