# Agent instructions

## Work rules

- Keep route entries thin. Put route-specific UI, form logic, and data under the matching directory in `src/components/examples`.
- Keep `src/components/site` limited to shared application-shell UI and its interaction logic. Keep user records, navigation definitions, menu items, and other business data under `src/data`.
- Keep `src/components/ui` limited to reusable UI primitives. Do not place route or product data there.
- Define shell menu data in `src/data/nav.ts` as `NAV_DATA` with `label` and nested `items`, then pass it to `NavMain` through typed props. Put user records in `src/data/user.ts` and user-menu configuration in `src/data/user-menu.ts`.
- Use existing dependencies before adding a new one. Do not add a dependency for a single icon or a thin wrapper.
- Use `lucide-react` for interface icons. Use the existing `simple-icons` and `SimpleIcon` adapter for brand icons that Lucide does not provide.
- Write CSS colors as hex values. Do not add `oklch`, `hsl`, `rgb`, or other color-function values.
- Add `"use client"` only to the smallest module that needs browser state, effects, event handlers, or client-only hooks.
- Preserve existing behavior when changing names or moving files. Update every caller in the same change and remove stale files or imports.
- Preserve unrelated working-tree changes. Inspect overlapping files before editing them.

## Source layout

- `src/app` contains Next.js route entries, layouts, and global CSS imports.
- `src/components/examples` contains route-specific pages and business UI.
- `src/components/site` contains `AppLayout`, `AppHeader`, `AppSidebar`, navigation presentation, theme controls, and user-menu presentation.
- `src/components/ui` contains generated or reusable shadcn-style primitives.
- `src/data` contains typed static configuration and data used by multiple modules.
- `src/lib` contains shared framework helpers such as route matching and class merging.
- `src/styles/presets` contains complete light and dark theme token sets.

## Naming and boundaries

- Use `AppLayout`, `AppHeader`, and `AppSidebar` for the application shell.
- Keep `NavMain` as the main navigation module name.
- Keep data names descriptive. Use names such as `NAV_DATA`, `currentUser`, and `userMenuItems`.
- Pass data into site components through typed props or imports from `src/data`. Keep the official shadcn shell menu shape in `AppSidebar` and define reusable records in `src/data`.
- Model variants with discriminated unions when variants exist and validate external values at the boundary. Prefer `satisfies` over type assertions.
- Keep one source of truth for a setting or menu definition. Do not duplicate the same configuration in a component and a data file.

## Verification

After a change, run the narrowest relevant Biome check, `npx tsc --noEmit`, and `git diff --check`. Run `npm run build` for changes that affect routes, providers, shared UI, or imports. Report any pre-existing failure with its command and file path.
