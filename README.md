# RoseUI

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?logo=next.js&logoColor=FFFFFF)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=FFFFFF)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.5-06B6D4?logo=tailwindcss&logoColor=FFFFFF)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-2.6.6-60A5FA?logo=biome&logoColor=FFFFFF)](https://biomejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-000000)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/zhijunio/roseui?style=flat)](https://github.com/zhijunio/roseui)

A Next.js component showcase with reusable primitives, composite components, and page blocks.

The template keeps route entries in `src/app`, component demos in `src/components/examples`, and block implementations in `src/app/pre-blocks`. Shared application chrome stays in `src/components/docs`, and reusable UI primitives stay in `src/components/ui`.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form and Zod
- Recharts
- Biome

## Project goal

This repository is a starter template, not a finished business application. It gives you a working foundation for building a modular Next.js product with TypeScript and the App Router.

The example application includes:

- An overview page at `/`.
- Component demos under `/docs/components/*`.
- Page blocks under `/docs/blocks/*`.
- An application shell with a sidebar, header, theme controls, and user menu.
- Static data that you can replace with a database or API.

The demos use local state and static data. They do not connect to an authentication provider or backend.

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

| Command             | Purpose                               |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the development server.         |
| `npm run build`     | Create a production build.            |
| `npm run start`     | Start the production server.          |
| `npm run check`     | Run Biome formatting and lint checks. |
| `npm run check:fix` | Apply Biome fixes.                    |

## Routes

| URL                              | Route entry                                             | Demo source                             |
| -------------------------------- | ------------------------------------------------------- | --------------------------------------- |
| `/`                              | `src/app/(home)/page.tsx`                               | Application overview                    |
| `/docs/components/<name>`        | `src/app/(docs)/docs/components/<name>/page.tsx`        | `src/components/examples/<name>/`       |
| `/docs/blocks/<category>/<name>` | `src/app/(docs)/docs/blocks/<category>/<name>/page.tsx` | `src/app/pre-blocks/<category>/<name>/` |
| `/pre-blocks/<category>/<name>`  | `src/app/pre-blocks/<category>/<name>/page.tsx`         | Full-screen block preview               |

Route groups such as `(docs)` and `(home)` organize the source tree without changing the URL.

## Project structure

```text
src/
├── app/
│   ├── (docs)/docs/              # Component documentation routes
│   ├── (docs)/docs/blocks/       # Page block routes
│   ├── (home)/page.tsx           # Overview route entry
│   ├── pre-blocks/               # Full-screen block preview routes and implementations
│   ├── globals.css
│   └── layout.tsx                # Root layout and providers
├── components/
│   ├── examples/                 # Component demos
│   ├── docs/                     # Documentation shell and showcase helpers
│   └── ui/                       # Reusable UI primitives
├── data/
│   ├── nav.ts                    # Sidebar menu data
│   ├── site.ts                   # Project metadata
│   └── theme.ts                  # Theme colors and layout preferences
├── hooks/                        # Shared React hooks
└── lib/                          # Shared utilities and navigation helpers
```

## Structure rules

Keep component documentation pages under `src/app/(docs)/docs/components/<name>/page.tsx`. Each page may contain its complete page composition, route-specific UI, documentation content, and local data. Use `src/components/examples/<name>/` for demo modules shared by the page and other consumers. Use `src/app/pre-blocks/<category>/<name>/page.tsx` for a block's full-screen preview route and export its named example from that module when the docs page also embeds it.

Keep component documentation routes explicit instead of introducing a dynamic `[slug]` route or thin wrapper. Do not create a private `_components` folder solely to hide page-specific code. Put code shared by several routes in `src/components/docs`, `src/components/ui`, `src/data`, or `src/lib` only when it is genuinely shared.

Application pages share the shell in `src/components/docs/app-layout.tsx`. Keep navigation and user records in `src/data`.

Use `"use client"` only at the interactive leaf. Interactive demos use client components when they manage browser state or events. Keep route entries server components when they do not need client behavior.

## Customize the theme

The theme system keeps the complete light and dark token sets for each color option in `src/data/theme.ts`. The theme customizer presents color swatches, and selecting one applies the corresponding surfaces, status colors, borders, charts, sidebar tokens, and shadows together with the primary color.

Use hex values for color tokens. Provide light and dark values for every color option.

### Change preferences at runtime

Open the theme button in the application header. The preference panel supports:

- Theme color swatches
- Light, dark, or system mode
- Centered or full-width content
- Sticky or scrolling navbar behavior
- Sidebar, inset, or floating sidebar style
- Icon or offcanvas sidebar collapse behavior

The root layout reads these values from cookies on the server. The preferences provider applies changes in the browser and writes the same values back to cookies.

### Add a theme color

1. Add the color label and swatch to `THEME_COLOR_OPTIONS` in `src/data/theme.ts`.
2. Provide complete light and dark token overrides, including surfaces, status colors, borders, charts, sidebar tokens, and shadows.
3. Provide readable foreground colors for both modes and validate the swatch against both backgrounds.

`ThemePreferencesProvider` applies every entry in the selected token set to the document root. Keep the fallback token sets in `src/app/globals.css` aligned with the default blue theme.

## Extending the template

To add a component documentation page, create an explicit `page.tsx` under `src/app/(docs)/docs/components/<name>/`. The page can own its complete presentation and local data; extract reusable demo modules to `src/components/examples/<name>/` when they are genuinely shared. For a page block, create its docs route under `src/app/(docs)/docs/blocks/<category>/<name>/` and its full-screen preview implementation under `src/app/pre-blocks/<category>/<name>/page.tsx`.

Replace the example data in `src/data` and the route-local data files with your application data source. Add authentication and persistence when you connect the template to a real backend.
