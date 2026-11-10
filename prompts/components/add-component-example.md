# Add a component example page

Add a usage page for an existing RoseUI component. Keep the route, page, demo code, and navigation consistent with the current component catalog.

## Steps

1. Check the working tree and preserve existing changes. Read the installed Next.js version's relevant local guide before editing Next.js code.
2. Inspect the component source, current examples, sibling example pages, and `src/data/nav.ts`. Identify useful states or interactions that are not already demonstrated.
3. Put `page.tsx` and the page-specific `examples.tsx` under `src/app/(app)/components/<name>/`. Follow the nearest component page pattern with `PageHeader` and `ComponentPreview`; give every preview a unique `previewId` that uses the page path and a two-digit sequence, and describe each preview by its demonstrated content or behavior.
4. Reuse the current component API, theme tokens, and installed dependencies. Keep interactive state in the demo that owns it. Avoid a parallel component implementation or an unnecessary `demos/` layer.
5. Ensure each example shows real behavior, has accessible labels and feedback, and works with the project's theme. Keep examples distinct rather than repeating the same state with cosmetic changes.
6. Add the page to the appropriate nested group under `Components` in `src/data/nav.ts` when the component belongs in the application navigation.
7. Run `npm run preview:generate` after adding or renaming a preview, then run the applicable existing lint and build checks. Do not edit `src/app/preview/preview-loaders.tsx` by hand. Report what was added, what was intentionally omitted, and any unresolved compatibility or license questions.
