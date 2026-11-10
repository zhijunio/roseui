# Project rules

## Before changing code

- Check `git status --short --branch`. Preserve existing edits and untracked files. Stage or commit only files required for the task.
- Before changing Next.js routes, layouts, metadata, or framework APIs, read the matching guide under `node_modules/next/dist/docs/`.
- Check `package.json` and nearby components before adding code. Ask before adding a dependency.
- Keep the existing `src/app/` route groups, layouts, and navigation. Adapt outside code to this structure.

## Project structure

- `src/app/(app)/` contains pages under the application sidebar and header.
- `src/app/(auth)/` contains the authentication layout. The navigated authentication examples live under `src/app/(app)/blocks/auth/`.
- `src/app/(app)/components/<name>/` contains component example pages and their page-specific code.
- `src/components/ui/` contains primitive UI components. `src/components/composite/` contains reusable composed components. Other files under `src/components/` contain shared application components.
- `src/data/nav.ts` defines the application sidebar. Add an entry when a new page belongs in that navigation.
- `src/app/globals.css` defines global styles and theme tokens.

## Pages and examples

- Reuse existing UI components and check their APIs before changing them.
- Follow nearby example pages. Use `PageHeader` and `ComponentPreview` for component examples.
- Put component pages and their page-specific examples under `src/app/(app)/components/<name>/`.
- Give every `ComponentPreview` a unique, stable `previewId` that uses the page path and a two-digit sequence, such as `data-grid-01`.
- Run `npm run preview:generate` after adding or renaming a preview. Treat `src/app/preview/preview-loaders.tsx` as generated output and do not edit it by hand.
- Keep interaction state in the page or example that owns it. Add a client directive only when a file needs hooks, event handlers, or browser APIs.
- Use the existing theme tokens and `cn` helper. Check light mode, dark mode, and the theme customizer when changing colors.
- Check the source and license of outside code, icons, fonts, and images before migrating them. Skip items with unclear licenses and report them.

## Checks

- Use the existing scripts in `package.json`, such as `npm run lint` and `npm run build`. Do not add tools or dependencies for a one-time check.
- Run `npm run preview:generate` when a change adds or renames a `ComponentPreview`.
- Report the commands you ran and their results. Identify checks you did not run.

## Commit messages

- Use Conventional Commits: `<type>(<scope>): <subject>`; scope is optional.
- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, and `revert`.
- Write a concise, imperative subject that describes the user-visible change. Do not end it with a period.
- Follow the language used by recent commit subjects in this repository.
- Examples: `feat(examples): add tabs component page`, `fix(navigation): redirect root to analytics`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
