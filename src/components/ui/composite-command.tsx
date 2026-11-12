"use client";

import * as React from "react";

import { IconCheck as CheckIcon, IconSearch as SearchIcon, IconX as XIcon } from "@tabler/icons-react";

import { InputGroup, InputGroupAddon, InputGroupButton } from "@/components/ui/composite-input-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type CommandContextValue = {
  query: string;
  setQuery: (query: string) => void;
  activeValue: string | null;
  setActiveValue: (value: string | null) => void;
  filter: (text: string, query: string) => boolean;
  empty: boolean;
};

const CommandContext = React.createContext<CommandContextValue | null>(null);
const useCommand = () => React.useContext(CommandContext);

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

function fuzzyMatch(text: string, query: string) {
  const normalizedText = normalize(text);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  return terms.every((term) => {
    let textIndex = 0;
    for (const character of term) {
      textIndex = normalizedText.indexOf(character, textIndex);
      if (textIndex === -1) return false;
      textIndex += 1;
    }
    return true;
  });
}

function textFromChildren(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(children)) {
    return textFromChildren(children.props.children);
  }
  return "";
}

function countMatches(children: React.ReactNode, query: string, filter: CommandContextValue["filter"]): number {
  return React.Children.toArray(children).reduce<number>((count, child) => {
    if (!React.isValidElement<{ children?: React.ReactNode; value?: string; textValue?: string }>(child)) return count;
    if (child.type === CommandItem) {
      const text = child.props.textValue ?? child.props.value ?? textFromChildren(child.props.children);
      return count + (filter(text, query) ? 1 : 0);
    }
    return count + countMatches(child.props.children, query, filter);
  }, 0);
}

function Command({
  className,
  children,
  query: controlledQuery,
  defaultQuery = "",
  onQueryChange,
  filter = fuzzyMatch,
}: {
  className?: string;
  children?: React.ReactNode;
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  filter?: (text: string, query: string) => boolean;
}) {
  const [uncontrolledQuery, setUncontrolledQuery] = React.useState(defaultQuery);
  const query = controlledQuery ?? uncontrolledQuery;
  const setQuery = React.useCallback(
    (nextQuery: string) => {
      if (controlledQuery === undefined) setUncontrolledQuery(nextQuery);
      onQueryChange?.(nextQuery);
    },
    [controlledQuery, onQueryChange],
  );
  const [activeValue, setActiveValue] = React.useState<string | null>(null);
  const empty = countMatches(children, query, filter) === 0;

  return (
    <CommandContext.Provider value={{ query, setQuery, activeValue, setActiveValue, filter, empty }}>
      <div
        data-slot="command"
        className={cn(
          "flex size-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground",
          className,
        )}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  size = "md",
  backdrop = "blur",
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg";
  backdrop?: "opaque" | "blur" | "transparent";
}) {
  const sizeClasses = { sm: "sm:max-w-sm", md: "sm:max-w-lg", lg: "sm:max-w-xl" };
  const backdropClasses = {
    opaque: "bg-background/80 backdrop-blur-none supports-backdrop-filter:backdrop-blur-none",
    blur: "bg-background/65 backdrop-blur-sm supports-backdrop-filter:backdrop-blur-sm",
    transparent: "bg-transparent backdrop-blur-none supports-backdrop-filter:backdrop-blur-none",
  };
  return (
    <Dialog {...props}>
      <DialogContent
        size={size}
        overlayClassName={backdropClasses[backdrop]}
        className={cn(
          "top-[15vh] max-h-[min(80vh,36rem)] translate-y-0 overflow-hidden rounded-xl p-0",
          sizeClasses[size],
          className,
        )}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  onChange,
  onKeyDown,
  ...props
}: Omit<React.ComponentProps<"input">, "className" | "value" | "defaultValue"> & {
  className?: string;
}) {
  const context = useCommand();
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div data-slot="command-input-wrapper" className="border-b border-border px-3 py-2">
      <InputGroup className="h-9 rounded-lg border-0 bg-transparent shadow-none *:data-[slot=input-group-addon]:pl-0">
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        </InputGroupAddon>
        <input
          ref={inputRef}
          data-slot="command-input"
          aria-label={props["aria-label"] ?? props.placeholder ?? "Search commands"}
          className={cn(
            "w-full bg-transparent text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
          value={context?.query ?? ""}
          onChange={(event) => {
            context?.setQuery(event.currentTarget.value);
            context?.setActiveValue(null);
            onChange?.(event);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            const items = Array.from(
              event.currentTarget
                .closest("[data-slot=command]")
                ?.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled])') ?? [],
            );
            if (event.key === "ArrowDown" && items.length) {
              event.preventDefault();
              items[0].focus();
            } else if (event.key === "ArrowUp" && items.length) {
              event.preventDefault();
              items[items.length - 1]?.focus();
            }
          }}
        />
        {context?.query && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Clear search"
              size="icon-xs"
              onClick={() => {
                context.setQuery("");
                context.setActiveValue(null);
                inputRef.current?.focus();
              }}
            >
              <XIcon aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}

function CommandEmpty({ children }: { children: React.ReactNode }) {
  return useCommand()?.empty ? (
    <div role="status" aria-live="polite" className="px-3 py-8 text-center text-sm text-muted-foreground">
      {children}
    </div>
  ) : null;
}

function CommandList({
  className,
  children,
  "aria-label": ariaLabel = "Commands",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="listbox"
      aria-label={ariaLabel}
      data-slot="command-list"
      className={cn("no-scrollbar max-h-80 scroll-py-1 overflow-x-hidden overflow-y-auto p-1 outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CommandGroup({
  className,
  heading,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  heading?: React.ReactNode;
}) {
  const context = useCommand();
  const visible = countMatches(children, context?.query ?? "", context?.filter ?? (() => true)) > 0;
  if (!visible) return null;

  return (
    <div
      role="group"
      aria-label={typeof heading === "string" ? heading : undefined}
      className={cn("overflow-hidden py-1 not-first:border-t not-first:border-border", className)}
      {...props}
    >
      {heading && <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{heading}</div>}
      {children}
    </div>
  );
}

function CommandItem({
  className,
  children,
  value,
  onSelect,
  textValue,
  onClick,
  onFocus,
  onKeyDown,
  ...props
}: React.ComponentProps<"button"> & {
  value?: string;
  textValue?: string;
  onSelect?: () => void;
}) {
  const context = useCommand();
  const itemId = React.useId();
  const text = textValue ?? value ?? textFromChildren(children);
  const selected = context?.activeValue === itemId;
  if (context && !context.filter(text, context.query)) return null;

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      data-selected={selected ? "true" : undefined}
      data-slot="command-item"
      data-value={value ?? text}
      className={cn(
        "group/command-item relative flex w-full cursor-default items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none data-[selected=true]:bg-accent data-[selected=true]:text-secondary-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
      onFocus={(event) => {
        context?.setActiveValue(itemId);
        onFocus?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onSelect?.();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const command = event.currentTarget.closest<HTMLElement>('[data-slot="command"]');
        const options = Array.from(
          command?.querySelectorAll<HTMLButtonElement>('[role="option"]:not([disabled])') ?? [],
        );
        const index = options.indexOf(event.currentTarget);
        if ((event.key === "ArrowDown" || event.key === "ArrowUp") && options.length) {
          event.preventDefault();
          const step = event.key === "ArrowDown" ? 1 : -1;
          options[(index + step + options.length) % options.length]?.focus();
        } else if (event.key === "Home" && options.length) {
          event.preventDefault();
          options[0].focus();
        } else if (event.key === "End" && options.length) {
          event.preventDefault();
          options[options.length - 1]?.focus();
        }
      }}
    >
      {children}
      <CheckIcon
        aria-hidden="true"
        className="ml-auto size-4 opacity-0 group-data-[selected=true]/command-item:opacity-100"
      />
    </button>
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
}

function CommandFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="command-footer"
      className={cn(
        "flex items-center gap-3 border-t border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
};
