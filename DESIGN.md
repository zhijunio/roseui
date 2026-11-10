---
version: alpha
name: RoseUI
description: A quiet, dense admin interface for inspecting and adapting reusable UI patterns.
colors:
  primary: "oklch(0.626 0.205 254.947)"
  background-light: "oklch(0.985 0.001 286.376)"
  background-dark: "oklch(0.209 0.004 264.477)"
  surface-light: "oklch(1 0 0)"
  surface-dark: "oklch(0.26 0.006 271.191)"
  foreground-light: "oklch(0.247 0.006 258.361)"
  foreground-dark: "oklch(0.964 0.002 247.839)"
  on-primary: "oklch(0.12 0.02 260)"
  primary-dark: "oklch(0.68 0.173 253.301)"
  muted-light: "oklch(0.961 0.002 247.84)"
  muted-dark: "oklch(0.231 0.004 264.487)"
  border-light: "oklch(0.946 0.003 264.542)"
  border-dark: "oklch(0.308 0.006 258.354)"
  destructive-light: "oklch(0.621 0.192 23.042)"
  destructive-dark: "oklch(0.666 0.18 21.433)"
  chart-green: "oklch(0.64 0.17 151)"
  chart-amber: "oklch(0.73 0.18 78)"
  chart-orange: "oklch(0.64 0.21 25)"
  chart-violet: "oklch(0.65 0.2 305)"
typography:
  display:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  body:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  label:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 32px
  page-mobile: 16px
  page-desktop: 32px
rounded:
  control: 6px
  panel: 8px
  surface: 10px
  pill: 999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: 36px
  button-primary-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
  input:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.control}"
    height: 36px
  input-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.control}"
  card:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.panel}"
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.panel}"
  badge:
    rounded: "{rounded.pill}"
  muted-light:
    backgroundColor: "{colors.muted-light}"
    textColor: "{colors.foreground-light}"
  muted-dark:
    backgroundColor: "{colors.muted-dark}"
    textColor: "{colors.foreground-dark}"
  border-light:
    backgroundColor: "{colors.border-light}"
  border-dark:
    backgroundColor: "{colors.border-dark}"
  destructive-light:
    backgroundColor: "{colors.destructive-light}"
    textColor: "{colors.on-primary}"
  destructive-dark:
    backgroundColor: "{colors.destructive-dark}"
    textColor: "{colors.on-primary}"
  chart-primary:
    backgroundColor: "{colors.primary}"
  chart-green:
    backgroundColor: "{colors.chart-green}"
  chart-amber:
    backgroundColor: "{colors.chart-amber}"
  chart-orange:
    backgroundColor: "{colors.chart-orange}"
  chart-violet:
    backgroundColor: "{colors.chart-violet}"
---

# RoseUI

## Overview

RoseUI is a quiet operational interface for developers and product teams who
need to inspect UI patterns, compare states, and move working examples into a
dashboard. It should feel like a well-maintained application workspace rather
than a marketing page.

The visual language is compact, neutral, and precise. White or charcoal
surfaces carry the work. Blue marks the current action and active state. Green,
amber, orange, and violet belong to data series and status meaning. The design
uses small differences in weight, tint, border, and spacing to create hierarchy.

The theme customizer can change the accent, radius, font, sidebar style, and
content width. Those options change the same visual system. They do not change
the product's visual character.

## Colors

RoseUI uses a mode-aware neutral foundation with one active accent. The light
theme is near-white with white raised surfaces. The dark theme is charcoal with
slightly lighter cards. Neither mode uses pure black for text or a large
decorative gradient.

Use semantic tokens such as `background`, `card`, `foreground`, `muted`,
`border`, `primary`, and `destructive`. Use the accent selected by the theme
customizer for primary actions and selected states. Do not use a hard-coded
blue when the component should respond to the selected accent.

Charts may use green, amber, orange, and violet as distinct series. Status
colors carry meaning and need a text or icon label in addition to color.

## Typography

Geist is the default typeface for every role. It gives headings, controls, and
data the same compact voice. Use weight and spacing to distinguish roles rather
than introducing a second display face.

Page titles may use the display role. Component titles, navigation labels, and
control labels use the label role or a small semibold size. Metadata, helper
text, timestamps, and badges use the caption role. Keep body text readable and
do not use uppercase tracking as a substitute for hierarchy.

## Layout

RoseUI follows a full-width application shell with a persistent sidebar, a
sticky header, and a flexible content inset. Pages use 16px horizontal padding
on small screens and 32px padding from the medium breakpoint upward. The theme
customizer can switch the content area between full width and an 80rem centered
measure.

Use a 4px base rhythm with 8px, 12px, 16px, 20px, and 32px groupings. Keep
related controls close together. Give separate sections enough space to scan.
Prefer dense two-column layouts for comparable examples and a single column for
forms, reading flows, and full application blocks.

The sidebar, header, and content area must remain usable at mobile width. Wide
tables and charts may scroll within their own container. Do not let a long
label resize a toolbar or force unrelated content outside the viewport.

## Elevation & Depth

RoseUI uses borders and tonal surfaces before shadows. A card is usually a
white or dark surface against the page background with a subtle border. Shadows
separate floating menus, dialogs, and elevated controls from the content below.

Use resting depth for controls and ordinary cards, raised depth for menus and
active panels, and floating depth for dialogs or surfaces that cover content.
Do not stack shadows on nested cards. Do not use blur, glass, or glow as a
default surface treatment.

## Shapes

The shape language is restrained and responsive to the theme radius. Controls
use a small radius. Cards and preview panels use a slightly larger radius.
Avatars, status dots, and compact status badges may be circular.

Use `--radius-control` for inputs and buttons, `--radius-panel` for cards and
preview frames, and `--radius-pill` only for tags, badges, and status marks.
Do not mix arbitrary radii in one component. The theme customizer can vary the
base radius, so component shapes must use the semantic radius variables.

## Components

### Buttons

Primary buttons use the selected accent with readable foreground text.
Secondary and outline buttons use a neutral surface and a visible border.
Ghost buttons use no resting border and gain an accent background on hover or
keyboard focus. Icon-only buttons need an accessible name and a tooltip or
title when their meaning is not obvious.

### Inputs and fields

Inputs are compact, border-based controls with a transparent or background
surface. Labels sit above the control. Helper text uses muted foreground.
Invalid fields use the destructive token and an adjacent error message. Keep
text-entry controls at least 16px on touch devices to prevent browser zoom.

### Cards and panels

Cards group related information with a border, a semantic surface color, and
consistent padding. Use a card for a repeated item, a framed tool, or a
preview. Do not put a page section inside a decorative card when an unframed
layout communicates the relationship better.

### Navigation

The sidebar is a dense workspace index. It uses muted icons, compact labels,
active accent feedback, nested disclosure, and a visible workspace switcher.
The header provides breadcrumbs, global search, notifications, theme controls,
and account actions. Keep navigation labels short enough to fit collapsed and
mobile states.

### Data display

Tables, charts, stat cards, timelines, and activity lists favor alignment and
comparison over decoration. Use tabular numerals for metrics. Use chart colors
as a small semantic palette, not as page-wide decoration. Keep empty, loading,
error, and disabled states visually distinct.

### Motion and focus

Use the existing standard easing and short durations for disclosure, hover,
and layout feedback. Respect `prefers-reduced-motion` and remove non-essential
transitions. Focus feedback uses an accent or ring treatment that remains
visible against the current surface. Never rely on color alone for focus or
selection.

## Do's and Don'ts

- **Do** make the first viewport useful. Show the working dashboard, block, or
  component example instead of a marketing hero.
- **Do** use semantic theme tokens so light mode, dark mode, and the theme
  customizer produce coherent results.
- **Do** use borders, spacing, and tonal surfaces to establish hierarchy before
  adding a shadow.
- **Do** keep examples dense enough for comparison and readable enough for
  repeated use.
- **Do** provide explicit labels, accessible names, and visible states for
  controls.
- **Don't** use gradients, glows, bokeh, or decorative blobs as the default
  background treatment.
- **Don't** use a large hero, oversized marketing copy, or a split landing-page
  composition for an application example.
- **Don't** create a new color or radius when an existing semantic token fits.
- **Don't** put cards inside cards without a real interaction boundary.
- **Don't** use color as the only signal for status, selection, focus, or error.
- **Don't** let charts, tables, labels, or controls overflow their container at
  mobile widths.
