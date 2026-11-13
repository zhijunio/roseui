import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-10 px-6 py-16 sm:px-10">
      <div className="space-y-5">
        <p className="text-muted-foreground text-sm font-medium">RoseUI · React components and page blocks</p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Build thoughtful interfaces with RoseUI.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Explore reusable components, interactive examples, and full page blocks built for Next.js and React.
        </p>
      </div>

      <nav aria-label="Explore RoseUI" className="flex flex-wrap gap-3">
        <Link
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
          href="/docs/components/navigation/accordion"
        >
          Browse components
        </Link>
        <Link
          className="border-border hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium"
          href="/docs/blocks/auth/sign-in"
        >
          Explore page blocks
        </Link>
      </nav>
    </main>
  );
}
