"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { currentUser } from "@/data/user";
import { getBreadcrumbItems } from "@/lib/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbItems(pathname);

  return (
    <header className="[html[data-navbar-style=sticky]_&]:bg-background/80 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 [html[data-navbar-style=sticky]_&]:sticky [html[data-navbar-style=sticky]_&]:top-0 [html[data-navbar-style=sticky]_&]:z-20 [html[data-navbar-style=sticky]_&]:backdrop-blur-md">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
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
        <div className="ml-auto hidden w-40 shrink-0 sm:block lg:w-56">
          <InputGroup className="border-input/50 bg-muted/30 h-8 rounded-lg shadow-none">
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput aria-label="Search" placeholder="Search" />
          </InputGroup>
        </div>
        <div className="flex shrink-0 items-center gap-1">
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
        </div>
      </div>
    </header>
  );
}
