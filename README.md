# Next Structured Starter

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?logo=next.js&logoColor=FFFFFF)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=FFFFFF)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.5-06B6D4?logo=tailwindcss&logoColor=FFFFFF)](https://tailwindcss.com/)
[![Biome](https://img.shields.io/badge/Biome-2.6.6-60A5FA?logo=biome&logoColor=FFFFFF)](https://biomejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-000000)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/zhijunio/next-structured-starter?style=flat)](https://github.com/zhijunio/next-structured-starter)

A modular Next.js starter with thin route entries and a structured feature layout.

The template keeps route entries in `app` and route-specific business UI and data in `components/examples`. Shared site chrome stays in `components/site`, and reusable UI primitives stay in `components/ui`.

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

- An overview page that explains the structured feature approach.
- Login and registration pages with client-side form validation.
- An authenticated application shell with a sidebar, header, theme toggle, and user menu.
- A Dashboard example page.
- Static data that you can replace with a database or API.

The authentication forms currently display submitted values in a toast. They do not connect to an authentication provider or backend.

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

| URL              | Route entry                             | Business UI and data                     |
| ---------------- | --------------------------------------- | ---------------------------------------- |
| `/`              | `src/app/(external)/page.tsx`           | `src/components/examples/home/`          |
| `/auth/login`    | `src/app/(main)/auth/login/page.tsx`    | `src/components/examples/auth/login/`    |
| `/auth/register` | `src/app/(main)/auth/register/page.tsx` | `src/components/examples/auth/register/` |
| `/dashboard`     | `src/app/(app)/dashboard/page.tsx`      | `src/components/examples/dashboard/`     |

Route groups such as `(app)`, `(main)`, and `(external)` organize the source tree without changing the URL.

## Project structure

```text
src/
├── app/
│   ├── (app)/dashboard/page.tsx  # Thin route entry
│   ├── (external)/page.tsx       # Thin route entry
│   ├── (main)/auth/              # Next.js route layout and entries
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── globals.css
│   └── layout.tsx                # Root layout and providers
├── components/examples/          # Route-specific business UI and data
│   ├── auth/
│   │   ├── auth-layout.tsx
│   │   ├── gh-signin.tsx
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   └── home/
├── components/
│   ├── site/                     # App shell, navigation, branding, and theme
│   └── ui/                       # Reusable Shadcn UI primitives
├── data/
│   ├── nav.ts                    # Sidebar menu data
│   ├── site.ts                   # Project metadata
│   └── theme.ts                  # Theme preset and layout preferences
├── hooks/                        # Shared React hooks
├── lib/                          # Shared utilities and navigation helpers
└── styles/presets/               # Complete light/dark CSS token sets
```

## Structure rules

Keep route-specific business code and route-local data under `src/components/examples` using the URL path as the directory structure. For example, `/auth/login` has its thin entry at `src/app/(main)/auth/login/page.tsx` and its page component, form logic, and local UI in `src/components/examples/auth/login/login-page.tsx`.

Do not put route business code in `src/app` or a private `_components` folder. Keep the route entry in `app`, then import the page component from the matching directory in `components/examples`. Put components shared by several routes in `src/components/site` or `src/components/ui` only when they are genuinely shared.

Use a shared route layout when several pages need the same shell. The authentication route entry remains at `src/app/(main)/auth/layout.tsx`, while its implementation lives in `src/components/examples/auth/auth-layout.tsx`. Application pages share the shell in `src/components/site/app-layout.tsx`.

Use `"use client"` only at the interactive leaf. The login and registration forms use client components because they manage form state and events. Their route entries remain server components.

## Customize the theme

The theme system stores each preset in its own CSS file. The selected preset is applied through the `data-theme-preset` attribute on the root HTML element. Each file defines a complete light and dark token set, so switching presets changes the whole visual system instead of only the accent color.

The default preset uses the default token values from [tweakcn](https://tweakcn.com/). Use the tweakcn theme editor as a reference when creating or tuning a preset, then keep the final values in src/styles/presets/.

### Change preferences at runtime

Open the settings button in the application header. The preference panel supports:

- Theme preset
- Light, dark, or system mode
- Centered or full-width content
- Sticky or scrolling navbar behavior
- Sidebar, inset, or floating sidebar style
- Icon or offcanvas sidebar collapse behavior

The root layout reads these values from cookies on the server. The preferences provider applies changes in the browser and writes the same values back to cookies.

### Add a theme preset

1. Create a token file in `src/styles/presets/`, such as `aurora.css`.
2. Add the file to the imports in `src/app/globals.css`.
3. Define the full light and dark token values with the preset selector.
4. Add the preset label and preview colors to `THEME_PRESET_OPTIONS` in `src/data/theme.ts`.

The repository includes these presets:

- `default.css`
- `clean-slate.css`
- `twitter.css`
- `vtron.css`
- `roseui.css`

Use `src/styles/presets/vtron.css` as the example when a preset needs hex values:

```css
:root[data-theme-preset="aurora"] {
  --background: #fcfcfc;
  --foreground: #0e142b;
  --primary: #2e67ff;
  --primary-foreground: #ffffff;
}

.dark:root[data-theme-preset="aurora"] {
  --background: #000000;
  --foreground: #ffffff;
  --primary: #2b65ff;
  --primary-foreground: #ffffff;
}
```

Each preset defines `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--border`, `--input`, `--ring`, chart colors, sidebar colors, fonts, and shadows for both modes. Keep foreground tokens readable against their corresponding surfaces.

## Extending the template

To add a feature, create a thin `page.tsx` under the appropriate route group and put the route's business components, schemas, and local data under the matching `src/components/examples/<route>/` directory. Do not create a `_components` folder for route business code. Move code to `components/site`, `components/ui`, `data`, or `lib` only when it is genuinely shared.

Replace the example data in `src/data` and the route-local data files with your application data source. Add authentication and persistence when you connect the template to a real backend.
