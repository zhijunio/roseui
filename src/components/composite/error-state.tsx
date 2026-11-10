import Link from "next/link";
import {
  IconArrowLeft,
  type TablerIcon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";

export type ErrorStateProps = {
  /** The HTTP status code shown as the large faded hero number. */
  code: string;
  /** Bold headline under the code. */
  title: string;
  /** Muted supporting copy. */
  description: string;
  /** Optional icon that identifies the error state. */
  icon?: TablerIcon;
  /** Primary action link (defaults to the dashboard). */
  primaryHref?: string;
  primaryLabel?: string;
  /** Optional secondary action link. */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Optional icon for the secondary action. */
  secondaryIcon?: TablerIcon;
};

export function ErrorState({
  code,
  title,
  description,
  icon: Icon,
  primaryHref = "/blocks/app-layout/workspace",
  primaryLabel = "Back to dashboard",
  secondaryHref,
  secondaryLabel,
  secondaryIcon: SecondaryIcon,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="flex items-center px-6 py-5">
        <Link href="/blocks/app-layout/workspace" className="flex items-center gap-2 font-semibold">
          <LogoMark size={32} iconSize={21} />
          <span className="tracking-tight">RoseUI</span>
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg text-center">
          {Icon ? <div className="mx-auto flex size-10 items-center justify-center text-muted-foreground"><Icon className="size-6" /></div> : null}
          <p className="mt-6 select-none text-6xl leading-none font-semibold tracking-tight text-muted-foreground tabular-nums sm:text-7xl">{code}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
          <p className="mx-auto mt-3 max-w-md text-balance leading-6 text-muted-foreground">{description}</p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-11 gap-2 px-6 text-sm" asChild>
              <Link href={primaryHref}><IconArrowLeft className="size-4" />{primaryLabel}</Link>
            </Button>
            {secondaryHref && secondaryLabel ? (
              <Button size="lg" variant="outline" className="h-11 gap-2 px-6 text-sm" asChild>
                <Link href={secondaryHref}>{SecondaryIcon ? <SecondaryIcon className="size-4" /> : null}{secondaryLabel}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} RoseUI. All rights reserved.</footer>
    </div>
  );
}
