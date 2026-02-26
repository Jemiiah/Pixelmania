# Pixelmania Design System

Pixelmania is a collaborative pixel art canvas on Celo (like Reddit r/place). The visual language blends retro pixel art aesthetics with a clean, modern dark UI — cyberpunk neon meets polished dashboard.

---

## 1. Color System

### Background & Surface

All backgrounds use deep blue-gray tones — never pure black — to maintain depth.

| Token            | Hex       | Usage                              |
| ---------------- | --------- | ---------------------------------- |
| `bg-base`        | `#0a0e1a` | Page/app background                |
| `bg-surface`     | `#111827` | Cards, panels, sidebar             |
| `bg-elevated`    | `#1a2236` | Elevated panels, dropdowns, modals |
| `bg-overlay`     | `rgba(10,14,26,0.85)` | Modal backdrop             |

### Border

| Token            | Value                        | Usage          |
| ---------------- | ---------------------------- | -------------- |
| `border-subtle`  | `rgba(255,255,255, 0.06)`    | Dividers       |
| `border-default` | `rgba(255,255,255, 0.10)`    | Card borders   |
| `border-strong`  | `rgba(255,255,255, 0.18)`    | Active borders |

### Text

| Token           | Hex       | Usage             |
| --------------- | --------- | ----------------- |
| `text-primary`  | `#f0f2f5` | Headings, body    |
| `text-secondary`| `#8b95a8` | Labels, captions  |
| `text-tertiary` | `#5a6478` | Placeholders      |
| `text-inverse`  | `#0a0e1a` | On bright fills   |

### Accent Colors

Each accent has a 10-step scale (50-900) plus a `glow` variant.

#### Primary — Neon Green (`#00e676`)

Represents G$/GoodDollar, growth, and blockchain activity. Used for primary CTAs, success states, active indicators, and pixel placement feedback.

#### Secondary — Electric Blue (`#0066ff`)

Represents the canvas and creativity. Used for links, selections, canvas tools, and informational states.

#### Tertiary — Warm Amber/Gold (`#ffb300`)

Represents prizes, achievements, and season rewards. Used for badges, rank icons, reward callouts.

#### Danger — Coral Red (`#ff5739`)

Used for errors, destructive actions, warnings, and low-time countdown states.

### Pixel Art Palette (24 Colors)

A separate palette for the canvas — not used in UI chrome. Classic pixel art colors:

| Index | Hex       | Name         | Index | Hex       | Name         |
| ----- | --------- | ------------ | ----- | --------- | ------------ |
| 0     | `#000000` | Black        | 12    | `#00ffff` | Cyan         |
| 1     | `#ffffff` | White        | 13    | `#7fffff` | Light Cyan   |
| 2     | `#7f7f7f` | Gray         | 14    | `#0000ff` | Blue         |
| 3     | `#c3c3c3` | Light Gray   | 15    | `#7f7fff` | Light Blue   |
| 4     | `#ff0000` | Red          | 16    | `#7f00ff` | Purple       |
| 5     | `#ff7f7f` | Light Red    | 17    | `#bf7fff` | Light Purple |
| 6     | `#ff7f00` | Orange       | 18    | `#ff00ff` | Magenta      |
| 7     | `#ffbf7f` | Light Orange | 19    | `#ff7fff` | Pink         |
| 8     | `#ffff00` | Yellow       | 20    | `#7f3f00` | Brown        |
| 9     | `#ffffbf` | Light Yellow | 21    | `#bf7f3f` | Light Brown  |
| 10    | `#00ff00` | Green        | 22    | `#ffcba4` | Skin Light   |
| 11    | `#7fff7f` | Light Green  | 23    | `#c68642` | Skin Dark    |

---

## 2. Typography

### Font Families

| Token   | Family                              | Usage                                |
| ------- | ----------------------------------- | ------------------------------------ |
| `sans`  | Inter (variable weight)             | All UI text                          |
| `mono`  | JetBrains Mono                      | Coordinates, addresses, data values  |

Both loaded from Google Fonts.

### Type Scale

Uses Tailwind's default scale. Key pairings:

| Level         | Size     | Weight   | Usage                           |
| ------------- | -------- | -------- | ------------------------------- |
| Page heading  | `2xl-4xl`| Bold     | Season title, main headings     |
| Section head  | `xl`     | Semibold | Card titles, panel headers      |
| Body          | `base`   | Normal   | General content                 |
| Label         | `sm`     | Medium   | Form labels, button text        |
| Caption       | `xs`     | Normal   | Timestamps, metadata, coords    |

---

## 3. Spacing & Layout

### Grid

All spacing follows an **8px base grid**. Use multiples: 4, 8, 12, 16, 24, 32, 48, 64.

### Layout Constants

| Token          | Value  | Usage                |
| -------------- | ------ | -------------------- |
| `sidebarWidth` | 320px  | Desktop sidebar      |
| `headerHeight` | 56px   | Top navigation bar   |

### Layout Philosophy

- The **canvas takes maximum available space** — it is the hero.
- Sidebar and header are fixed and should not compete for attention.
- Cards use generous padding (`16-24px`).
- Panels maintain `12-16px` internal spacing.

---

## 4. Border Radius

| Token   | Value    | Usage                                |
| ------- | -------- | ------------------------------------ |
| `sm`    | `4px`    | Badges, color swatches, small chips  |
| `md`    | `8px`    | Buttons, inputs, small cards         |
| `lg`    | `12px`   | Cards, panels, dialogs               |
| `xl`    | `16px`   | Large feature cards                  |
| `full`  | `9999px` | Avatars, circular buttons, pills     |

---

## 5. Shadows

### Elevation

| Token | Value                          | Usage                     |
| ----- | ------------------------------ | ------------------------- |
| `sm`  | `0 1px 2px rgba(0,0,0,0.3)`   | Buttons, badges           |
| `md`  | `0 4px 16px rgba(0,0,0,0.4)`  | Cards, dropdowns          |
| `lg`  | `0 8px 32px rgba(0,0,0,0.5)`  | Modals, popovers          |

### Glow

Each accent color has a glow shadow for emphasis and active states:

- `glow-primary`: `0 0 20px rgba(0, 230, 118, 0.3)`
- `glow-secondary`: `0 0 20px rgba(0, 102, 255, 0.3)`
- `glow-tertiary`: `0 0 20px rgba(255, 179, 0, 0.3)`
- `glow-danger`: `0 0 20px rgba(255, 87, 57, 0.3)`

### Pixel Shadow

`0 0 8px rgba(0,230,118,0.5), 0 0 2px rgba(0,230,118,0.8)` — used for the pixel placement glow effect.

---

## 6. Z-Index Scale

| Token      | Value | Usage                |
| ---------- | ----- | -------------------- |
| `canvas`   | 0     | Canvas layer         |
| `sidebar`  | 10    | Side panel           |
| `header`   | 20    | Top bar              |
| `dropdown` | 30    | Dropdowns, popovers  |
| `modal`    | 40    | Modal dialogs        |
| `toast`    | 50    | Toast notifications  |
| `tooltip`  | 60    | Tooltips             |

---

## 7. Animation & Motion

### Durations

| Token    | Value  | Usage                    |
| -------- | ------ | ------------------------ |
| `fast`   | 150ms  | Hover states, toggles    |
| `normal` | 200ms  | General transitions      |
| `slow`   | 300ms  | Page transitions, modals |

### Easings

| Token     | Value                               | Usage            |
| --------- | ----------------------------------- | ---------------- |
| `default` | `cubic-bezier(0.4, 0, 0.2, 1)`     | General motion   |
| `in`      | `cubic-bezier(0.4, 0, 1, 1)`       | Exit animations  |
| `out`     | `cubic-bezier(0, 0, 0.2, 1)`       | Enter animations |
| `bounce`  | `cubic-bezier(0.34, 1.56, 0.64, 1)`| Playful emphasis |

### Key Animations

| Name             | Description                                  | Duration |
| ---------------- | -------------------------------------------- | -------- |
| `fadeIn`         | Opacity 0 to 1                               | 200ms    |
| `slideUp`        | Fade + translate up 8px                      | 300ms    |
| `slideDown`      | Fade + translate down 8px                    | 300ms    |
| `scaleIn`        | Fade + scale from 95% (modals)               | 200ms    |
| `pixelPlace`     | Scale bounce + green glow burst              | 400ms    |
| `pulse`          | Opacity pulse (skeleton loading)             | 2s loop  |
| `shimmer`        | Horizontal gradient sweep (skeleton)         | 1.5s loop|
| `countdownTick`  | Scale bounce for timer seconds               | 300ms    |
| `glowPulse`      | Pulsing green glow (active elements)         | 2s loop  |
| `spin`           | 360deg rotation (loading spinner)            | 1s loop  |

### Hover Behavior

- Interactive elements: subtle lift via `translateY(-1px)` + glow shadow
- Buttons: background color shift + glow on primary variant
- Color swatches: scale `1.1` + ring

---

## 8. Component Patterns

### Cards / Panels

```
background: bg-surface
border: 1px solid border-default
border-radius: lg (12px)
padding: 16-24px
shadow: md on hover
```

### Buttons

```
Primary:   bg primary-500, text inverse, radius md, glow on hover
Secondary: bg transparent, border border-default, text primary, radius md
Ghost:     bg transparent, text secondary, hover: bg-elevated
Danger:    bg danger-500, text white, radius md
```

### Glass Surface

```
background: rgba(17, 24, 39, 0.7)
backdrop-filter: blur(12px)
border: 1px solid border-subtle
```

---

## 9. File Map

| File                      | Content                                   |
| ------------------------- | ----------------------------------------- |
| `src/design/tokens.ts`    | All design tokens as TS constants         |
| `src/design/animations.ts`| Keyframes and transition presets           |
| `src/design/theme.ts`     | Utility functions (palette lookup, etc.)   |
| `src/index.css`           | Tailwind v4 config, custom properties, base styles |
