// ─── Color Tokens ────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  bg: {
    base: '#0a0e1a',
    surface: '#111827',
    elevated: '#1a2236',
    overlay: 'rgba(10, 14, 26, 0.85)',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    default: 'rgba(255, 255, 255, 0.10)',
    strong: 'rgba(255, 255, 255, 0.18)',
  },

  // Text
  text: {
    primary: '#f0f2f5',
    secondary: '#8b95a8',
    tertiary: '#5a6478',
    inverse: '#0a0e1a',
  },

  // Primary — neon green (GoodDollar / growth / blockchain)
  primary: {
    50: '#e6fff2',
    100: '#b3ffd9',
    200: '#80ffc0',
    300: '#4dffa7',
    400: '#1aff8e',
    500: '#00e676',
    600: '#00cc68',
    700: '#00995e',
    800: '#006644',
    900: '#00332a',
    DEFAULT: '#00e676',
    glow: 'rgba(0, 230, 118, 0.35)',
  },

  // Secondary — electric blue (canvas / creativity)
  secondary: {
    50: '#e6f0ff',
    100: '#b3d4ff',
    200: '#80b8ff',
    300: '#4d9cff',
    400: '#1a80ff',
    500: '#0066ff',
    600: '#0052cc',
    700: '#003d99',
    800: '#002966',
    900: '#001433',
    DEFAULT: '#0066ff',
    glow: 'rgba(0, 102, 255, 0.35)',
  },

  // Tertiary — warm amber/gold (prizes / achievements)
  tertiary: {
    50: '#fff8e6',
    100: '#ffebb3',
    200: '#ffdd80',
    300: '#ffd04d',
    400: '#ffc31a',
    500: '#ffb300',
    600: '#cc8f00',
    700: '#996b00',
    800: '#664800',
    900: '#332400',
    DEFAULT: '#ffb300',
    glow: 'rgba(255, 179, 0, 0.35)',
  },

  // Danger — coral red
  danger: {
    50: '#fff0ed',
    100: '#ffd1c9',
    200: '#ffb3a5',
    300: '#ff9481',
    400: '#ff755d',
    500: '#ff5739',
    600: '#cc4630',
    700: '#993427',
    800: '#66231e',
    900: '#331115',
    DEFAULT: '#ff5739',
    glow: 'rgba(255, 87, 57, 0.35)',
  },

  // Success (alias primary for semantic usage)
  success: '#00e676',

  // White & black
  white: '#ffffff',
  black: '#000000',
} as const;

// ─── Pixel Art Palette (24 colors) ──────────────────────────────────────────

export const pixelPalette = [
  { index: 0,  hex: '#000000', name: 'Black' },
  { index: 1,  hex: '#ffffff', name: 'White' },
  { index: 2,  hex: '#7f7f7f', name: 'Gray' },
  { index: 3,  hex: '#c3c3c3', name: 'Light Gray' },
  { index: 4,  hex: '#ff0000', name: 'Red' },
  { index: 5,  hex: '#ff7f7f', name: 'Light Red' },
  { index: 6,  hex: '#ff7f00', name: 'Orange' },
  { index: 7,  hex: '#ffbf7f', name: 'Light Orange' },
  { index: 8,  hex: '#ffff00', name: 'Yellow' },
  { index: 9,  hex: '#ffffbf', name: 'Light Yellow' },
  { index: 10, hex: '#00ff00', name: 'Green' },
  { index: 11, hex: '#7fff7f', name: 'Light Green' },
  { index: 12, hex: '#00ffff', name: 'Cyan' },
  { index: 13, hex: '#7fffff', name: 'Light Cyan' },
  { index: 14, hex: '#0000ff', name: 'Blue' },
  { index: 15, hex: '#7f7fff', name: 'Light Blue' },
  { index: 16, hex: '#7f00ff', name: 'Purple' },
  { index: 17, hex: '#bf7fff', name: 'Light Purple' },
  { index: 18, hex: '#ff00ff', name: 'Magenta' },
  { index: 19, hex: '#ff7fff', name: 'Pink' },
  { index: 20, hex: '#7f3f00', name: 'Brown' },
  { index: 21, hex: '#bf7f3f', name: 'Light Brown' },
  { index: 22, hex: '#ffcba4', name: 'Skin Light' },
  { index: 23, hex: '#c68642', name: 'Skin Dark' },
] as const;

export type PixelColor = (typeof pixelPalette)[number];

// ─── Typography ─────────────────────────────────────────────────────────────

export const fonts = {
  sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
} as const;

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
} as const;

export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// ─── Spacing (8px grid) ────────────────────────────────────────────────────

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  3: '0.75rem',    // 12px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  8: '2rem',       // 32px
  10: '2.5rem',    // 40px
  12: '3rem',      // 48px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
} as const;

// ─── Border Radius ──────────────────────────────────────────────────────────

export const radii = {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

// ─── Shadows ────────────────────────────────────────────────────────────────

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 2px 8px rgba(0, 0, 0, 0.4)',
  md: '0 4px 16px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.5)',
  glow: {
    primary: '0 0 20px rgba(0, 230, 118, 0.3)',
    secondary: '0 0 20px rgba(0, 102, 255, 0.3)',
    tertiary: '0 0 20px rgba(255, 179, 0, 0.3)',
    danger: '0 0 20px rgba(255, 87, 57, 0.3)',
  },
  pixel: '0 0 8px rgba(0, 230, 118, 0.5), 0 0 2px rgba(0, 230, 118, 0.8)',
} as const;

// ─── Z-Index ────────────────────────────────────────────────────────────────

export const zIndex = {
  canvas: 0,
  sidebar: 10,
  header: 20,
  dropdown: 30,
  modal: 40,
  toast: 50,
  tooltip: 60,
} as const;

// ─── Transitions ────────────────────────────────────────────────────────────

export const durations = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

export const easings = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ─── Layout ─────────────────────────────────────────────────────────────────

export const layout = {
  sidebarWidth: '320px',
  headerHeight: '56px',
  maxCanvasSize: 1000,
  pixelSize: 1,
} as const;
