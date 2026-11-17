import type * as React from "react";

import { Link } from "@/components/roseui/link";
import { cn } from "@/lib/utils";

function Text({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="text" className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />;
}

function TextLink({ className, ...props }: React.ComponentProps<typeof Link>) {
  return <Link data-text-link="" className={cn("underline-offset-4 hover:underline", className)} {...props} />;
}

function Strong({ className, ...props }: React.ComponentProps<"strong">) {
  return <strong data-slot="strong" className={cn("font-semibold text-foreground", className)} {...props} />;
}

function Code({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      data-slot="code"
      className={cn("rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.8125rem] text-foreground", className)}
      {...props}
    />
  );
}

export { Code, Strong, Text, TextLink };
