# RoseUI

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?logo=next.js&logoColor=FFFFFF)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=FFFFFF)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.5-06B6D4?logo=tailwindcss&logoColor=FFFFFF)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-2.6.6-60A5FA?logo=biome&logoColor=FFFFFF)](https://biomejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-000000)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/zhijunio/roseui?style=flat)](https://github.com/zhijunio/roseui)

A shadcn/ui-compatible component library and Next.js showcase with reusable primitives, composite components, and page blocks.

The template keeps route entries in `src/app` and demo UI in `src/examples`. Shared application chrome stays in `src/components/site`, and reusable shadcn/ui primitives stay in `src/components/ui`.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form and Zod
- Recharts
- Biome

## Project goal

This repository is a starter template, not a finished business application. It gives you a working foundation for building a modular Next.js product with TypeScript, Shadcn UI, and the App Router.

The example application includes:

- An overview page at `/`.
- Component demos under `/components/*`.
- Page and form blocks under `/blocks/*`.
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

| Command                  | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | Start the development server.            |
| `npm run build`          | Create a production build.               |
| `npm run start`          | Start the production server.             |
| `npm run check`          | Run Biome formatting and lint checks.    |
| `npm run check:fix`      | Apply Biome fixes.                       |
| `npm run registry:build` | Generate `registry.json` and `public/r`. |

## Routes

| URL                         | Route entry                                       | Demo source                              |
| --------------------------- | ------------------------------------------------- | ---------------------------------------- |
| `/`                         | `src/app/(external)/page.tsx`                     | Application overview                     |
| `/components/<name>`        | `src/app/(app)/components/<name>/page.tsx`        | `src/examples/components/<name>/`        |
| `/blocks/<category>/<name>` | `src/app/(app)/blocks/<category>/<name>/page.tsx` | `src/examples/blocks/<category>/<name>/` |

Route groups such as `(app)` and `(external)` organize the source tree without changing the URL.

## Project structure

```text
src/
├── app/
│   ├── (app)/                    # Component and block route entries
│   ├── (external)/page.tsx       # Overview route entry
│   ├── globals.css
│   └── layout.tsx                # Root layout and providers
├── examples/                     # Demo UI and local demo data
│   ├── blocks/                    # Page and form block demos
│   └── components/                # Component demos
├── components/
│   ├── site/                     # App shell, navigation, branding, and theme
│   └── ui/                       # Reusable Shadcn UI primitives
├── data/
│   ├── nav.ts                    # Sidebar menu data
│   ├── site.ts                   # Project metadata
│   └── theme.ts                  # Theme colors and layout preferences
├── hooks/                        # Shared React hooks
└── lib/                          # Shared utilities and navigation helpers
```

## Structure rules

Keep route-specific demo code and local demo data under `src/examples`. Use `src/examples/components/<name>/` for component demos and `src/examples/blocks/<category>/<name>/` for block demos.

Keep route entries in `src/app` thin. Do not put route business code in a private `_components` folder. Put code shared by several routes in `src/components/site` or `src/components/ui` only when it is genuinely shared.

Application pages share the shell in `src/components/site/app-layout.tsx`. Keep navigation and user records in `src/data`.

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

## Build the shadcn registry

`src/components/ui` is the source directory for installable registry items. `src/examples` contains demos and is not part of the registry.

`components.json` defines the shadcn/ui aliases and points the CLI to `src/app/globals.css`. The registry generator scans the `.tsx` files in `src/components/ui`, detects dependencies on other registered UI components, and writes `registry.json`. The `shadcn build` step then writes the generated registry files to `public/r`.

To add an installable component:

1. Add its source file under `src/components/ui`.
2. Add any supporting files to `scripts/generate-registry.mjs` when the component needs them.
3. Add the file to `compositeSourceFiles` when it should use the `registry:component` type.
4. Run `npm run registry:build`.

Keep demo-only imports such as `@/examples/component-preview` out of installable registry components. The generator only records UI, hook, and utility dependencies that it can resolve from the registry source directories.

## Extending the template

To add a demo feature, create a thin `page.tsx` under the appropriate route group and put its UI and local data under the matching directory in `src/examples`. Do not create a `_components` folder for route business code. Move code to `src/components/site`, `src/components/ui`, `src/data`, or `src/lib` only when it is genuinely shared.

Replace the example data in `src/data` and the route-local data files with your application data source. Add authentication and persistence when you connect the template to a real backend.
