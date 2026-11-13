# Agent instructions

## Work rules

- Keep component documentation routes explicit under `src/app/(docs)/docs/components/<name>/page.tsx`. Each page may own its complete page composition, route-specific UI, documentation content, and local data; do not introduce a dynamic `[slug]` route or thin wrapper just to avoid an explicit page.
- Keep reusable component demos under `src/components/examples/<name>`. Keep each block's full-screen preview and named implementation in `src/app/pre-blocks/<category>/<name>/page.tsx`; share it with the corresponding docs route instead of adding a thin wrapper.
- Keep `src/components/docs` limited to documentation-shell UI, showcase helpers, and their interaction logic. Keep user records, navigation definitions, menu items, and other business data under `src/data`.
- Keep `src/components/ui` limited to reusable UI primitives. Do not place route or product data there.
- Keep reusable components under `src/components/ui`, component demos under `src/components/examples`, full-screen block routes under `src/app/pre-blocks`, and shared documentation helpers under `src/components/docs`. Components are maintained in this repository; do not add a component registry or install generated primitives from one.
- Define shell menu data in `src/data/nav.ts` as `NAV_DATA` with `label` and nested `items`, then pass it to `NavMain` through typed props. Put user records in `src/data/user.ts` and user-menu configuration in `src/data/user-menu.ts`.
- Use existing dependencies before adding a new one. Do not add a dependency for a single icon or a thin wrapper.
- Use `lucide-react` for interface icons. Use the existing `simple-icons` and `SimpleIcon` adapter for brand icons that Lucide does not provide.
- Write CSS colors as hex values. Do not add `oklch`, `hsl`, `rgb`, or other color-function values.
- Add `"use client"` only to the smallest module that needs browser state, effects, event handlers, or client-only hooks.
- Preserve existing behavior when changing names or moving files. Update every caller in the same change and remove stale files or imports.
- Preserve unrelated working-tree changes. Inspect overlapping files before editing them.

## Source layout

- `src/app` contains Next.js route entries, layouts, and global CSS imports.
- `src/app/(docs)/docs` contains component documentation routes and their shared layout.
- `src/app/(docs)/docs/blocks` contains page block routes.
- `src/components/examples` contains reusable component demos.
- `src/app/pre-blocks` contains full-screen page block routes and their implementations.
- `src/components/docs` contains `AppLayout`, `AppHeader`, `AppSidebar`, navigation presentation, theme controls, user-menu presentation, and `ComponentPreview`.
- `src/components/ui` contains reusable UI primitives maintained in this repository.
- `src/data` contains typed static configuration and data used by multiple modules.
- `src/lib` contains shared framework helpers such as route matching and class merging.
- `src/data/theme.ts` contains complete light and dark theme token sets for each color option.

## Naming and boundaries

- Use `AppLayout`, `AppHeader`, and `AppSidebar` for the application shell.
- Keep `NavMain` as the main navigation module name.
- Keep data names descriptive. Use names such as `NAV_DATA`, `currentUser`, and `userMenuItems`.
- Pass data into site components through typed props or imports from `src/data`. Keep the shell menu shape in `AppSidebar` and define reusable records in `src/data`.
- Model variants with discriminated unions when variants exist and validate external values at the boundary. Prefer `satisfies` over type assertions.
- Keep one source of truth for a setting or menu definition. Do not duplicate the same configuration in a component and a data file.

## Verification

After a change, run the narrowest relevant Biome check, `npx tsc --noEmit`, and `git diff --check`. Run `npm run build` for changes that affect routes, providers, shared UI, or imports. Report any pre-existing failure with its command and file path.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
