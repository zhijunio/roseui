"use client";

import * as React from "react";

import { LayoutGroup, motion } from "motion/react";
import { Menu } from "lucide-react";
import { Link as LinkPrimitive, type LinkProps as LinkPrimitiveProps, type LinkRenderProps } from "react-aria-components/Link";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export type NavbarContextProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleNavbar: () => void;
};

const NavbarContext = React.createContext<NavbarContextProps | null>(null);

function useNavbar() {
  const context = React.useContext(NavbarContext);
  if (!context) throw new Error("Navbar parts must be used inside NavbarProvider.");
  return context;
}

export type NavbarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function NavbarProvider({ defaultOpen = false, isOpen: openProp, onOpenChange, className, children, ...props }: NavbarProviderProps) {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const open = openProp ?? internalOpen;
  const setOpen = React.useCallback(
    (value: boolean | ((open: boolean) => boolean)) => {
      const nextOpen = typeof value === "function" ? value(open) : value;
      if (openProp === undefined) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, openProp],
  );
  const toggleNavbar = React.useCallback(() => setOpen(!open), [open, setOpen]);
  const value = React.useMemo(() => ({ open, setOpen, isMobile, toggleNavbar }), [open, setOpen, isMobile, toggleNavbar]);

  return (
    <NavbarContext.Provider value={value}>
      <div
        data-slot="navbar-provider"
        className={cn(
          "group/navbar relative isolate z-10 flex w-full flex-col",
          "has-data-navbar-inset:min-h-svh has-data-navbar-inset:bg-navbar dark:has-data-navbar-inset:bg-background",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </NavbarContext.Provider>
  );
}

export type NavbarVariant = "default" | "float" | "inset";
export type NavbarPlacement = "top" | "bottom";
export type NavbarSide = "left" | "right";

type NavbarCommonProps = React.ComponentProps<"div"> & {
  variant?: NavbarVariant;
  side?: NavbarSide;
};

export type NavbarProps = NavbarCommonProps &
  (
    | { isSticky: true; placement?: NavbarPlacement }
    | { isSticky?: false; placement?: never }
  );

function Navbar({ children, isSticky = false, placement = "top", variant = "default", side = "left", className, ...props }: NavbarProps) {
  const { isMobile, open, setOpen } = useNavbar();

  if (isMobile) {
    return (
      <>
        <span className="sr-only" aria-hidden="true" data-navbar={variant} data-navbar-sticky={isSticky} data-placement={placement} />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side={side}
            aria-label="Mobile navigation"
            showCloseButton={false}
            className="w-[min(100vw,24rem)] p-4"
          >
            {children}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <div
      data-navbar={variant}
      data-placement={placement}
      data-navbar-sticky={isSticky || undefined}
      className={cn(
        "group/navbar-variant relative isolate",
        isSticky && "sticky top-0 z-40",
        placement === "top" && variant === "float" && "md:pt-8",
        placement === "bottom" && variant === "float" && "bottom-0 md:pb-8",
        variant === "float" && "mx-auto w-full max-w-7xl px-4 xl:max-w-(--breakpoint-xl)",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative isolate hidden py-(--navbar-gutter) [--navbar-gutter:--spacing(2.5)] md:block",
          variant === "float" &&
            "rounded-xl bg-background py-0 *:data-[navbar=content]:max-w-7xl *:data-[navbar=content]:rounded-xl *:data-[navbar=content]:border *:data-[navbar=content]:bg-navbar *:data-[navbar=content]:px-4 *:data-[navbar=content]:py-(--navbar-gutter) *:data-[navbar=content]:shadow-xs",
          (variant === "default" || variant === "inset") && "px-4",
          variant === "default" && "border-b bg-navbar",
        )}
      >
        <div data-navbar="content" className="mx-auto w-full max-w-(--breakpoint-2xl) items-center md:flex">
          {children}
        </div>
      </div>
    </div>
  );
}

function NavbarSection({ className, children, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();
  return (
    <LayoutGroup id={id}>
      <div
        data-slot="navbar-section"
        className={cn(
          "col-span-full grid grid-cols-[auto_1fr] flex-col gap-3 gap-y-0.5 md:flex md:flex-none md:flex-row md:items-center md:gap-2.5",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </LayoutGroup>
  );
}

export interface NavbarItemProps extends Omit<LinkPrimitiveProps, "children"> {
  isCurrent?: boolean;
  children?: React.ReactNode | ((values: LinkRenderProps & { defaultChildren: React.ReactNode }) => React.ReactNode);
}

function NavbarItem({ className, children, isCurrent, ...props }: NavbarItemProps) {
  return (
    <LinkPrimitive
      data-slot="navbar-item"
      aria-current={isCurrent ? "page" : undefined}
      className={composeRenderProps(className, (resolvedClassName, values) =>
        cn(
          "group/navbar-item relative col-span-full grid min-w-0 grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center gap-x-3 rounded-lg p-2 text-start text-sm font-medium text-foreground outline-hidden transition-colors hover:bg-secondary hover:text-secondary-foreground md:grid-cols-none md:gap-x-(--navbar-gutter) md:px-(--navbar-gutter) md:py-[calc(var(--navbar-gutter)-0.125rem)]",
          "[&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-muted-foreground md:[&>svg]:size-4",
          "focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-default disabled:opacity-50",
          values.isFocusVisible && "ring-2 ring-ring/50",
          values.isPressed && "bg-secondary text-secondary-foreground",
          (isCurrent || values.isCurrent) && "text-foreground",
          resolvedClassName,
        ),
      )}
      {...props}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          {(isCurrent || values.isCurrent) && (
            <motion.span
              data-slot="current-indicator"
              layoutId="current-indicator"
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="bg-foreground absolute rounded-full [--gutter:--spacing(0.5)] inset-y-[calc(var(--navbar-gutter)-0.125rem)] -start-4 w-(--gutter) md:inset-y-auto md:inset-x-2 md:-bottom-[calc(var(--navbar-gutter)+1px)] md:h-(--gutter) md:w-auto"
            />
          )}
        </>
      )}
    </LinkPrimitive>
  );
}

function NavbarSpacer({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden="true" className={cn("-ms-4 flex-1", className)} {...props} />;
}

function NavbarStart({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navbar-start" className={cn("relative p-2 py-4 md:p-0.5", className)} {...props} />;
}

function NavbarGap({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden="true" className={cn("mx-2", className)} {...props} />;
}

function NavbarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator orientation="vertical" className={cn("h-5", className)} {...props} />;
}

function NavbarMobile({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="navbar-mobile"
      className={cn(
        "group/navbar-mobile flex items-center gap-x-3 px-4 py-2.5 md:hidden",
        "group-has-data-navbar-sticky/navbar:sticky group-has-data-navbar-sticky/navbar:bg-navbar",
        "group-has-data-navbar-sticky/navbar:group-has-data-[placement=top]/navbar:top-0 group-has-data-navbar-sticky/navbar:group-has-data-[placement=top]/navbar:border-b",
        "group-has-data-navbar-sticky/navbar:group-has-data-[placement=bottom]/navbar:bottom-0 group-has-data-navbar-sticky/navbar:group-has-data-[placement=bottom]/navbar:border-t",
        className,
      )}
      {...props}
    />
  );
}

function NavbarInset({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-navbar-inset="true" className={cn("flex flex-1 flex-col bg-navbar pb-2 md:px-2 dark:bg-background", className)} {...props}>
      <div className="grow bg-background p-6 md:rounded-lg md:p-16 md:shadow-xs md:ring-1 md:ring-foreground/15 dark:md:bg-navbar dark:md:ring-border dark:md:group-has-data-navbar-inset/navbar:bg-muted">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
}

function NavbarTrigger({ className, onPress, ...props }: ButtonProps) {
  const { toggleNavbar } = useNavbar();
  return (
    <Button
      data-slot="navbar-trigger"
      variant="ghost"
      size="icon-sm"
      aria-label={props["aria-label"] ?? "Toggle navigation"}
      className={cn("-ms-2 lg:hidden", className)}
      onPress={(event) => {
        onPress?.(event);
        toggleNavbar();
      }}
      {...props}
    >
      <Menu aria-hidden="true" />
      <span className="sr-only">Toggle navigation</span>
    </Button>
  );
}

function NavbarLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="navbar-label" className={cn("col-start-2 row-start-1 truncate", className)} {...props} />;
}

export {
  Navbar,
  NavbarGap,
  NavbarInset,
  NavbarItem,
  NavbarLabel,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSeparator,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
  useNavbar,
};
