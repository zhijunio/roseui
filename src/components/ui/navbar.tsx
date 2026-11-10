"use client";

import Link from "next/link";
import * as React from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavbarPosition = "sticky" | "static" | "floating";
type NavbarSize = "sm" | "md" | "lg";
type NavbarContextValue = { menuOpen: boolean; setMenuOpen: (open: boolean) => void; menuId: string; size: NavbarSize; maxWidth: NonNullable<NavbarProps["maxWidth"]> };
const NavbarContext = React.createContext<NavbarContextValue | null>(null);

type NavbarProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  position?: NavbarPosition;
  size?: NavbarSize;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  hideOnScroll?: boolean;
  parentRef?: React.RefObject<HTMLElement | null>;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
};
type NavbarMaxWidth = NonNullable<NavbarProps["maxWidth"]>;
const navbarMaxWidthClasses: Record<NavbarMaxWidth, string> = {
  sm: "max-w-screen-sm", md: "max-w-screen-md", lg: "max-w-screen-lg", xl: "max-w-screen-xl", "2xl": "max-w-screen-2xl", full: "max-w-none",
};

function Navbar({ position = "sticky", size = "md", maxWidth = "lg", hideOnScroll = false, parentRef, menuOpen: controlledMenuOpen, defaultMenuOpen = false, onMenuOpenChange, className, children, ...props }: NavbarProps) {
  const [uncontrolledMenuOpen, setUncontrolledMenuOpen] = React.useState(defaultMenuOpen);
  const [isHidden, setIsHidden] = React.useState(false);
  const menuOpen = controlledMenuOpen ?? uncontrolledMenuOpen;
  const menuId = React.useId();
  const setMenuOpen = React.useCallback((open: boolean) => {
    if (controlledMenuOpen === undefined) setUncontrolledMenuOpen(open);
    onMenuOpenChange?.(open);
  }, [controlledMenuOpen, onMenuOpenChange]);
  React.useEffect(() => {
    if (!hideOnScroll || position === "static") return;
    const scrollContainer = parentRef?.current;
    const scrollTarget = scrollContainer ?? window;
    let previousY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
    const handleScroll = () => {
      const currentY = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
      setIsHidden(currentY > 80 && currentY > previousY);
      previousY = currentY;
    };
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, [hideOnScroll, parentRef, position]);
  const positionClass: Record<NavbarPosition, string> = {
    sticky: "sticky top-0 z-40 bg-background",
    static: "relative bg-background",
    floating: cn("sticky top-2 z-40 mx-auto w-[calc(100%-1rem)] rounded-xl border bg-background/90 shadow-sm backdrop-blur", navbarMaxWidthClasses[maxWidth]),
  };
  const shouldHide = hideOnScroll && position !== "static" && isHidden && !menuOpen;
  return (
    <NavbarContext.Provider value={{ menuOpen, setMenuOpen, menuId, size, maxWidth }}>
      <nav data-slot="navbar" data-position={position} data-hidden={shouldHide || undefined} data-menu-open={menuOpen || undefined} className={cn(positionClass[position], "transition-transform duration-300 motion-reduce:transition-none data-[hidden=true]:-translate-y-full", className)} {...props}>{children}</nav>
    </NavbarContext.Provider>
  );
}

function useNavbarContext() {
  const context = React.useContext(NavbarContext);
  if (!context) throw new Error("Navbar parts must be used inside Navbar.");
  return context;
}

function NavbarBrand({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navbar-brand" className={cn("flex shrink-0 items-center gap-2 font-semibold tracking-tight", className)} {...props} />;
}

function NavbarHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { size, maxWidth } = useNavbarContext();
  return <div data-slot="navbar-header" className={cn("mx-auto flex min-h-16 w-full items-center gap-4 px-4 sm:px-6", navbarMaxWidthClasses[maxWidth], size === "sm" && "min-h-12 px-3 sm:px-3", size === "lg" && "min-h-20 px-6", className)} {...props} />;
}

function NavbarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="navbar-content" className={cn("flex min-w-0 items-center gap-1", className)} {...props} />;
}

function NavbarSpacer({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden="true" data-slot="navbar-spacer" className={cn("min-w-4 flex-1", className)} {...props} />;
}

type NavbarItemCommonProps = { isCurrent?: boolean; closeMenuOnSelect?: boolean; className?: string; children?: React.ReactNode; id?: string; title?: string; "aria-label"?: string; onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void };
type NavbarLinkProps = NavbarItemCommonProps & { href: string; target?: React.HTMLAttributeAnchorTarget; rel?: string };
type NavbarButtonProps = NavbarItemCommonProps & { href?: undefined; disabled?: boolean };
type NavbarItemProps = NavbarLinkProps | NavbarButtonProps;

function NavbarItem(props: NavbarItemProps) {
  const context = React.useContext(NavbarContext);
  const size = context?.size ?? "md";
  if (props.href !== undefined) {
    const { href, isCurrent, closeMenuOnSelect, onClick, className, children, target, rel, id, title, "aria-label": ariaLabel } = props;
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => { onClick?.(event); if (!event.defaultPrevented && closeMenuOnSelect) context?.setMenuOpen(false); };
    const itemClass = navbarItemClass(size, className);
    return <Link href={href} target={target} rel={rel} id={id} title={title} aria-label={ariaLabel} aria-current={isCurrent ? "page" : undefined} data-current={isCurrent || undefined} data-slot="navbar-item" className={itemClass} onClick={handleClick}>{children}</Link>;
  }
  const { isCurrent, closeMenuOnSelect, onClick, className, children, disabled, id, title, "aria-label": ariaLabel } = props;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { onClick?.(event); if (!event.defaultPrevented && closeMenuOnSelect) context?.setMenuOpen(false); };
  return <button type="button" disabled={disabled} id={id} title={title} aria-label={ariaLabel} aria-current={isCurrent ? "page" : undefined} data-current={isCurrent || undefined} data-slot="navbar-item" className={navbarItemClass(size, className)} onClick={handleClick}>{children}</button>;
}

function navbarItemClass(size: NavbarSize, className?: string) {
  return cn("inline-flex min-h-9 items-center rounded-md px-3 text-sm text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-muted aria-[current=page]:text-foreground motion-reduce:transition-none", size === "sm" && "min-h-8 px-2.5 text-xs", size === "lg" && "min-h-11 px-3.5 text-base", className);
}

function NavbarToggle({ className, label = "Toggle navigation menu", ...props }: Omit<React.ComponentProps<typeof Button>, "onClick" | "aria-label"> & { label?: string }) {
  const { menuOpen, setMenuOpen, menuId } = useNavbarContext();
  return <Button type="button" variant="ghost" size="icon" aria-label={label} aria-expanded={menuOpen} aria-controls={menuId} data-navbar-toggle className={className} onClick={() => setMenuOpen(!menuOpen)} {...props}>{menuOpen ? <IconX /> : <IconMenu2 />}</Button>;
}

function NavbarMenu({ className, ...props }: React.ComponentProps<"div">) {
  const { menuOpen, menuId, maxWidth } = useNavbarContext();
  const { children, ...divProps } = props;
  return <div id={menuId} data-slot="navbar-menu" data-open={menuOpen || undefined} aria-hidden={!menuOpen} inert={!menuOpen} className={cn("grid overflow-hidden border-t transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none", menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] border-transparent opacity-0", className)} {...divProps}><div className="min-h-0 overflow-hidden"><div className={cn("mx-auto grid gap-1 px-4 py-2 sm:px-6", navbarMaxWidthClasses[maxWidth])}>{children}</div></div></div>;
}

function NavbarMenuItem({ href, className, children, isCurrent, onClick, target, rel, id, title, "aria-label": ariaLabel }: NavbarLinkProps) {
  return <NavbarItem href={href} closeMenuOnSelect className={cn("min-h-11 justify-start text-foreground", className)} isCurrent={isCurrent} onClick={onClick} target={target} rel={rel} id={id} title={title} aria-label={ariaLabel}>{children}</NavbarItem>;
}

export { Navbar, NavbarHeader, NavbarBrand, NavbarContent, NavbarSpacer, NavbarItem, NavbarToggle, NavbarMenu, NavbarMenuItem };
