"use client";

import * as React from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check as CheckIcon, ChevronRight as ChevronRightIcon } from "lucide-react";
import { tv } from "tailwind-variants";

import { Keyboard } from "@/components/roseui/keyboard";
import { cn } from "@/lib/utils";

type SubMenuContextValue = "trigger" | "content" | null;
const SubMenuContext = React.createContext<SubMenuContextValue>(null);

export const menuStyles = tv({
  base: "grid max-h-[inherit] grid-cols-[auto_1fr] gap-y-1 overflow-x-hidden overflow-y-auto overscroll-contain p-1 outline-hidden [&>[data-slot=menu-section]+[data-slot=menu-section]:not([class*='mt-']):not([class*='my-'])]:mt-3",
});

type MenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>;

function Menu({ className, side = "bottom", align = "center", sideOffset, children, ...props }: MenuProps) {
  const subMenu = React.useContext(SubMenuContext);
  const contentProps = { ...props, "data-slot": "menu-content", side, align, sideOffset };
  const subContentProps = { ...contentProps, align: align === "center" ? "start" : align };
  const contentClass = cn(
    "z-50 min-w-32 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
    menuStyles({ className }),
  );
  const content =
    subMenu === "content" ? (
      <DropdownMenuPrimitive.SubContent {...subContentProps} className={contentClass}>
        {children}
      </DropdownMenuPrimitive.SubContent>
    ) : (
      <DropdownMenuPrimitive.Content {...contentProps} className={contentClass}>
        {children}
      </DropdownMenuPrimitive.Content>
    );
  return <DropdownMenuPrimitive.Portal>{content}</DropdownMenuPrimitive.Portal>;
}

type MenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>;
function MenuTrigger({ children, ...props }: MenuTriggerProps) {
  const childNodes = React.Children.toArray(children);
  const trigger = childNodes[0];
  const content = childNodes.slice(1);
  return (
    <DropdownMenuPrimitive.Root {...props}>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      {content}
    </DropdownMenuPrimitive.Root>
  );
}

export const menuItemStyles = tv({
  base: "relative flex min-w-0 cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    intent: {
      danger: "text-destructive focus:bg-destructive/10 focus:text-destructive",
      warning: "text-warning-foreground focus:bg-warning/10 focus:text-warning-foreground",
    },
  },
});

type MenuItemProps = Omit<React.ComponentProps<typeof DropdownMenuPrimitive.Item>, "onSelect" | "asChild"> & {
  target?: string;
  rel?: string;
  download?: string | boolean;
  href?: string;
  id?: string;
  disabled?: boolean;
  intent?: "danger" | "warning";
  onSelect?: React.ComponentProps<typeof DropdownMenuPrimitive.Item>["onSelect"];
};

function MenuItem({ className, children, href, intent, disabled, onSelect, ...props }: MenuItemProps) {
  const subMenu = React.useContext(SubMenuContext);
  const itemContent = (
    <>
      {children}
      {subMenu === "trigger" && <ChevronRightIcon data-slot="chevron" className="ml-auto size-4" />}
    </>
  );
  const itemClassName = cn(menuItemStyles({ intent }), className);
  if (subMenu === "trigger")
    return (
      <DropdownMenuPrimitive.SubTrigger {...props} disabled={disabled} data-slot="menu-item" className={itemClassName}>
        {itemContent}
      </DropdownMenuPrimitive.SubTrigger>
    );
  if (href)
    return (
      <DropdownMenuPrimitive.Item asChild onSelect={onSelect} disabled={disabled}>
        <a href={href} target={props.target} rel={props.rel} download={props.download} className={itemClassName}>
          {itemContent}
        </a>
      </DropdownMenuPrimitive.Item>
    );
  return (
    <DropdownMenuPrimitive.Item
      {...props}
      disabled={disabled}
      onSelect={onSelect}
      data-slot="menu-item"
      className={itemClassName}
    >
      {itemContent}
    </DropdownMenuPrimitive.Item>
  );
}

type MenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>;
function MenuCheckboxItem({ className, children, ...props }: MenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cn(menuItemStyles(), "data-[state=checked]:text-foreground", className)}
      {...props}
    >
      <span aria-hidden="true" className="flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

type MenuRadioGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;
function MenuRadioGroup(props: MenuRadioGroupProps) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

type MenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;
function MenuRadioItem({ className, children, ...props }: MenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem data-slot="menu-radio-item" className={cn(menuItemStyles(), className)} {...props}>
      <span aria-hidden="true" className="flex size-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function MenuSubMenu({ children }: { children?: React.ReactNode }) {
  const childNodes = React.Children.toArray(children);
  return (
    <DropdownMenuPrimitive.Sub>
      <SubMenuContext.Provider value="trigger">{childNodes[0]}</SubMenuContext.Provider>
      <SubMenuContext.Provider value="content">{childNodes[1]}</SubMenuContext.Provider>
    </DropdownMenuPrimitive.Sub>
  );
}

type MenuHeaderProps = React.ComponentProps<"div"> & { separator?: boolean };
function MenuHeader({ className, separator = false, ...props }: MenuHeaderProps) {
  return (
    <div
      data-slot="menu-header"
      className={cn(
        "col-span-full px-2.5 py-2 font-medium text-base sm:text-sm",
        separator && "-mx-1 border-b sm:px-3 sm:pb-2.5",
        className,
      )}
      {...props}
    />
  );
}

export interface MenuSectionProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Group> {
  label?: React.ReactNode;
}
function MenuSection({ className, label, children, ...props }: MenuSectionProps) {
  return (
    <DropdownMenuPrimitive.Group
      data-slot="menu-section"
      className={cn("col-span-full grid grid-cols-[auto_1fr]", className)}
      {...props}
    >
      {label && (
        <MenuHeader className="col-span-full px-3 py-2 text-sm/6 text-muted-foreground sm:px-2.5 sm:py-1.5 sm:text-xs/3">
          {label}
        </MenuHeader>
      )}
      {children}
    </DropdownMenuPrimitive.Group>
  );
}

function MenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="menu-separator"
      className={cn("col-span-full -mx-1 my-1 h-px bg-foreground/10", className)}
      {...props}
    />
  );
}
function MenuLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="label" className={cn("col-start-2 [&:has(+svg)]:pe-6", className)} {...props} />;
}
function MenuDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="description"
      className={cn("col-start-2 font-normal text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
function MenuShortcut({ className, ...props }: React.ComponentProps<typeof Keyboard>) {
  return (
    <Keyboard
      className={cn(
        "absolute end-2 ps-2 group-hover:text-primary-foreground group-focus:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Menu,
  MenuCheckboxItem,
  MenuDescription,
  MenuHeader,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSection,
  MenuSeparator,
  MenuShortcut,
  MenuSubMenu,
  MenuTrigger,
};
