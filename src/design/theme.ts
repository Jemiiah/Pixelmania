import { colors, pixelPalette } from './tokens.ts';
import type { PixelColor } from './tokens.ts';

/**
 * Get a pixel palette color by its index (0-23).
 */
export function getPaletteColor(index: number): PixelColor | undefined {
  return pixelPalette[index];
}

/**
 * Get the hex value of a pixel palette color by index.
 */
export function getPaletteHex(index: number): string {
  return pixelPalette[index]?.hex ?? '#000000';
}

/**
 * Get a primary color shade. Pass a shade key like '500' or 'glow'.
 */
export function getPrimaryShade(shade: keyof typeof colors.primary): string {
  return colors.primary[shade];
}

/**
 * Get a secondary color shade.
 */
export function getSecondaryShade(shade: keyof typeof colors.secondary): string {
  return colors.secondary[shade];
}

/**
 * Get a tertiary color shade.
 */
export function getTertiaryShade(shade: keyof typeof colors.tertiary): string {
  return colors.tertiary[shade];
}

/**
 * Get a danger color shade.
 */
export function getDangerShade(shade: keyof typeof colors.danger): string {
  return colors.danger[shade];
}

/**
 * Build a CSS rgba string from a hex color and alpha value.
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Determine if a color is light (useful for choosing text color on pixel swatches).
 */
export function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

/**
 * Get the appropriate text color (black or white) for a given background hex.
 */
export function getContrastText(bgHex: string): string {
  return isLightColor(bgHex) ? colors.black : colors.white;
}
