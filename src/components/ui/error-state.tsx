import type { ReactNode } from "react";

export type ErrorStateProps = {
  /** The HTTP status code shown as the large faded hero number. */
  code: string;
  /** Bold headline under the code. */
  title: string;
  /** Muted supporting copy. */
  description: string;
  /** Optional icon that identifies the error state. */
  icon?: ReactNode;
  /** Optional actions supplied by the consuming application. */
  actions?: ReactNode;
};

export function ErrorState({
  code,
  title,
  description,
  icon,
  actions,
}: ErrorStateProps) {
  return (
    <section className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg text-center">
        {icon ? <div className="text-muted-foreground mx-auto flex size-10 items-center justify-center">{icon}</div> : null}
        <p className="text-muted-foreground mt-6 text-6xl leading-none font-semibold tracking-tight tabular-nums select-none sm:text-7xl">
          {code}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md leading-6 text-balance">{description}</p>
        {actions ? <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </section>
  );
}
