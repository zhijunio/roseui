"use client";

import { createContext, type ReactNode, use } from "react";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Link } from "./link";

export type BreadcrumbSeparatorType = "chevron" | "slash" | false;
const BreadcrumbContext = createContext<BreadcrumbSeparatorType>("chevron");

type BreadcrumbItem = { id?: string; href?: string; textValue?: string; [key: string]: unknown };
export type BreadcrumbsProps<T extends BreadcrumbItem = BreadcrumbItem> = Omit<
  React.ComponentProps<"ol">,
  "children"
> & {
  items?: T[];
  children?: ReactNode | ((item: T) => ReactNode);
  separator?: BreadcrumbSeparatorType;
};

export function Breadcrumbs<T extends BreadcrumbItem>({
  className,
  separator = "chevron",
  items,
  children,
  ...props
}: BreadcrumbsProps<T>) {
  const content: ReactNode =
    typeof children === "function"
      ? items?.map((item, index) => (
          <BreadcrumbContext.Provider key={item.id ?? index} value={index === items.length - 1 ? false : separator}>
            {children(item)}
          </BreadcrumbContext.Provider>
        ))
      : children;
  return (
    <BreadcrumbContext.Provider value={separator}>
      <ol
        aria-label={props["aria-label"] ?? "Breadcrumb"}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {content}
      </ol>
    </BreadcrumbContext.Provider>
  );
}

export type BreadcrumbProps = React.ComponentProps<"li"> & {
  id?: string;
  href?: string;
  children: ReactNode;
  separator?: BreadcrumbSeparatorType;
  textValue?: string;
};

export function Breadcrumb({ children, className, separator, href, textValue: _textValue, ...props }: BreadcrumbProps) {
  const inheritedSeparator = use(BreadcrumbContext);
  const currentSeparator = separator ?? inheritedSeparator;
  return (
    <li className={cn("flex items-center gap-2 text-sm", className)} {...props}>
      {href ? (
        <Link
          href={href}
          className="has-data-[slot=icon]:inline-flex has-data-[slot=icon]:items-center has-data-[slot=icon]:gap-x-2 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:size-4 *:data-[slot=icon]:text-muted-foreground hover:*:data-[slot=icon]:text-foreground"
        >
          {children}
        </Link>
      ) : (
        <span aria-current="page">{children}</span>
      )}
      {currentSeparator && <Separator separator={currentSeparator} />}
    </li>
  );
}

function Separator({ separator }: { separator: Exclude<BreadcrumbSeparatorType, false> }) {
  return (
    <span aria-hidden="true" className="*:shrink-0 *:text-muted-foreground *:data-[slot=icon]:size-3.5">
      {separator === "chevron" ? <ChevronRight className="size-3.5" /> : <span>/</span>}
    </span>
  );
}

export type { BreadcrumbsProps as BreadcrumbsPropsGeneric };
