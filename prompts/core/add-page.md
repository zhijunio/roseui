# Add a page to RoseUI

Create a page within the existing RoseUI route and layout structure. Do not reorganize routes or copy another project's folder structure.

## Inputs

Use the task details for the page title, URL, purpose, and intended layout. If a required detail is missing and cannot be inferred from nearby pages, ask one concise question before implementing the dependent part.

## Steps

1. Check the working tree and preserve existing changes.
2. Read the installed Next.js version's relevant local guide in `node_modules/next/dist/docs/` before editing Next.js code.
3. Inspect nearby routes, `src/data/nav.ts`, and existing UI components. Choose `(app)` for pages using the application shell. Use `(auth)` only for standalone authentication layouts; put navigated authentication examples under `src/app/(app)/blocks/auth/`.
4. Add the route using the closest existing page pattern. Keep `page.tsx` server-rendered unless it needs client state, event handlers, or browser APIs. Set page metadata where the route pattern does so.
5. Add or update the `src/data/nav.ts` entry only when the page belongs in the application navigation. Match the existing group and naming conventions.
6. Reuse current components and tokens. Ask before adding a package. Keep the change focused on the requested page.
7. Run the applicable existing lint and build checks. Report changed files, checks, and any remaining decisions.
