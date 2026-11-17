"use client";

import { createContext, type ReactNode, use, useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { Spinner } from "@/components/roseui/spinner";
import { cn } from "@/lib/utils";

import { DropdownKeyboard } from "./dropdown";

export interface CommandMenuProviderProps {
  isPending?: boolean;
  escapeButton?: boolean;
}

type CommandMenuContextValue = CommandMenuProviderProps & { close: () => void };
const CommandMenuContext = createContext<CommandMenuContextValue | undefined>(undefined);

function useCommandMenu() {
  const context = use(CommandMenuContext);
  if (!context) throw new Error("Command menu parts must be used inside <CommandMenu />");
  return context;
}

const sizes = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
};

export interface CommandMenuProps
  extends Omit<React.ComponentProps<typeof Dialog.Root>, "children">,
    CommandMenuProviderProps {
  "aria-label"?: string;
  shortcut?: string;
  className?: string;
  size?: keyof typeof sizes;
  overlay?: { className?: string };
  children?: ReactNode;
  onInteractOutside?: React.ComponentProps<typeof Dialog.Content>["onInteractOutside"];
  onEscapeKeyDown?: React.ComponentProps<typeof Dialog.Content>["onEscapeKeyDown"];
}

export function CommandMenu({
  open,
  defaultOpen,
  onOpenChange,
  className,
  escapeButton = true,
  isPending,
  overlay,
  size = "lg",
  shortcut,
  children,
  onInteractOutside,
  onEscapeKeyDown,
  "aria-label": ariaLabel = "Command menu",
  ...rootProps
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const controlled = open !== undefined;
  const currentOpen = open ?? internalOpen;
  const setOpen = (nextOpen: boolean) => {
    if (!controlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  useEffect(() => {
    if (!shortcut) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === shortcut.toLowerCase() && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!currentOpen);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentOpen, onOpenChange, shortcut]);

  const context: CommandMenuContextValue = { isPending, escapeButton, close: () => setOpen(false) };

  return (
    <CommandMenuContext.Provider value={context}>
      <Dialog.Root {...rootProps} open={currentOpen} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/15 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              overlay?.className,
            )}
          />
          <Dialog.Content
            aria-label={ariaLabel}
            onInteractOutside={onInteractOutside}
            onEscapeKeyDown={onEscapeKeyDown}
            className={cn(
              "fixed left-1/2 top-[10%] z-50 flex max-h-[80vh] w-[calc(100%-2rem)] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              sizes[size],
              className,
            )}
          >
            <Dialog.Title className="sr-only">{ariaLabel}</Dialog.Title>
            <CommandPrimitive label={ariaLabel} className="flex min-h-0 flex-1 flex-col overflow-hidden">
              {children}
            </CommandPrimitive>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </CommandMenuContext.Provider>
  );
}

export interface CommandMenuSearchProps extends React.ComponentProps<typeof CommandPrimitive.Input> {
  className?: string;
}

export function CommandMenuSearch({ className, placeholder = "Search...", ...props }: CommandMenuSearchProps) {
  const { isPending, escapeButton, close } = useCommandMenu();
  return (
    <div className={cn("flex w-full items-center gap-2 px-3 py-2", className)}>
      {isPending ? (
        <Spinner mode="progress" className="size-4.5" variant="spin" label="Loading search results" />
      ) : (
        <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
      )}
      <CommandPrimitive.Input
        autoFocus
        aria-label="Quick search"
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent py-1.5 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
        {...props}
      />
      {escapeButton && (
        <button
          type="button"
          onClick={close}
          className="hidden cursor-default rounded border px-1.5 py-0.5 text-xs text-current/90 hover:bg-muted lg:inline"
        >
          Esc
        </button>
      )}
    </div>
  );
}

export interface CommandMenuListProps extends React.ComponentProps<typeof CommandPrimitive.List> {}
export function CommandMenuList({ className, children, ...props }: CommandMenuListProps) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-[min(28rem,65vh)] flex-1 overflow-y-auto border-t p-2", className)}
      {...props}
    >
      {children}
      <CommandPrimitive.Empty className="p-4 text-center text-sm text-muted-foreground">
        No results found.
      </CommandPrimitive.Empty>
    </CommandPrimitive.List>
  );
}

export interface CommandMenuSectionProps extends React.ComponentProps<typeof CommandPrimitive.Group> {
  label?: string;
}
export function CommandMenuSection({ className, label, children, ...props }: CommandMenuSectionProps) {
  return (
    <CommandPrimitive.Group heading={label} className={cn("mb-3 last:mb-0", className)} {...props}>
      {children}
    </CommandPrimitive.Group>
  );
}

export interface CommandMenuItemProps extends React.ComponentProps<typeof CommandPrimitive.Item> {
  textValue?: string;
}
export function CommandMenuItem({ className, textValue, value, children, ...props }: CommandMenuItemProps) {
  return (
    <CommandPrimitive.Item
      value={value ?? textValue ?? (typeof children === "string" ? children : undefined)}
      className={cn(
        "flex min-w-0 cursor-default items-center gap-2 rounded-md px-2.5 py-2 text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </CommandPrimitive.Item>
  );
}

export interface CommandMenuDescriptionProps extends React.ComponentProps<"span"> {}
export function CommandMenuDescription({ className, ...props }: CommandMenuDescriptionProps) {
  return <span className={cn("ms-auto truncate text-xs text-muted-foreground", className)} {...props} />;
}

export function CommandMenuSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator className={cn("-mx-2 my-2 h-px bg-border", className)} {...props} />;
}

export function CommandMenuFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border-t px-3 py-2 text-sm text-muted-foreground *:[kbd]:mx-1 *:[kbd]:inline-grid *:[kbd]:h-4 *:[kbd]:min-w-4 *:[kbd]:place-content-center *:[kbd]:rounded-xs *:[kbd]:bg-secondary",
        className,
      )}
      {...props}
    />
  );
}

export function CommandMenuLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("min-w-0 truncate", className)} {...props} />;
}

export function CommandMenuShortcut({ className, ...props }: React.ComponentProps<typeof DropdownKeyboard>) {
  return (
    <DropdownKeyboard
      className={cn(
        "gap-0.5 font-sans text-[10.5px] uppercase *:grid *:size-5.5 *:place-content-center *:rounded-xs *:bg-background *:inset-ring *:inset-ring-muted-foreground/20",
        className,
      )}
      {...props}
    />
  );
}
