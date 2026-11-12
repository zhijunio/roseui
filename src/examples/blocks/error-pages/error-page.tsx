import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { LogoMark } from "@/components/ui/logo-mark";

type ErrorPageProps = {
  code: string;
  title: string;
  description: string;
  icon?: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryIcon?: ReactNode;
};

export function ErrorPage({
  code,
  title,
  description,
  icon,
  secondaryHref,
  secondaryLabel,
  secondaryIcon,
}: ErrorPageProps) {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <header className="flex items-center px-6 py-5">
        <Link href="/components/accordion" className="flex items-center gap-2 font-semibold">
          <LogoMark size={32} iconSize={21} />
          <span className="tracking-tight">RoseUI</span>
        </Link>
      </header>
      <div className="flex flex-1">
        <ErrorState
          code={code}
          title={title}
          description={description}
          icon={icon}
          actions={
            <>
              <Button size="lg" className="h-11 gap-2 px-6 text-sm" asChild>
                <Link href="/components/accordion">
                  <ArrowLeft className="size-4" />
                  Back to components
                </Link>
              </Button>
              {secondaryHref && secondaryLabel ? (
                <Button size="lg" variant="outline" className="h-11 gap-2 px-6 text-sm" asChild>
                  <Link href={secondaryHref}>
                    {secondaryIcon}
                    {secondaryLabel}
                  </Link>
                </Button>
              ) : null}
            </>
          }
        />
      </div>
      <footer className="text-muted-foreground px-6 py-6 text-center text-sm">
        © {new Date().getFullYear()} RoseUI. All rights reserved.
      </footer>
    </div>
  );
}
