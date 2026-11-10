import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkProps = ComponentProps<typeof Link>;

export function ArrowLinkButton({
  href,
  children,
  className,
  variant = "outline",
  size,
  onClick,
  onNavigate,
  target,
  rel,
  prefetch,
  replace,
  scroll,
  "aria-label": ariaLabel,
}: {
  href: LinkProps["href"];
  children: ReactNode;
} & Pick<LinkProps, "onClick" | "onNavigate" | "target" | "rel" | "prefetch" | "replace" | "scroll">
  & Pick<ComponentProps<typeof Button>, "className" | "variant" | "size" | "aria-label">) {
  return (
    <Button asChild variant={variant} size={size} className={cn("group/slide relative overflow-hidden rounded-full px-6", className)}>
      <Link
        href={href}
        onClick={onClick}
        onNavigate={onNavigate}
        target={target}
        rel={rel}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        aria-label={ariaLabel}
      >
        <span className="group-hover/slide:-translate-x-2 group-focus-visible/slide:-translate-x-2 motion-safe:transition-transform">{children}</span>
        <IconArrowRight aria-hidden className="absolute right-2.5 translate-x-8 opacity-0 group-hover/slide:translate-x-0 group-hover/slide:opacity-100 group-focus-visible/slide:translate-x-0 group-focus-visible/slide:opacity-100 motion-safe:transition-[transform,opacity]" />
      </Link>
    </Button>
  );
}
