// ─── Keyframe Definitions ───────────────────────────────────────────────────

export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,

  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,

  slideUp: `
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,

  slideDown: `
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,

  scaleIn: `
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `,

  pixelPlace: `
    @keyframes pixelPlace {
      0% { transform: scale(0.5); opacity: 0.5; box-shadow: 0 0 0 rgba(0, 230, 118, 0); }
      50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 16px rgba(0, 230, 118, 0.6); }
      100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 rgba(0, 230, 118, 0); }
    }
  `,

  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,

  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,

  countdownTick: `
    @keyframes countdownTick {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }
  `,

  glowPulse: `
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 8px rgba(0, 230, 118, 0.3); }
      50% { box-shadow: 0 0 20px rgba(0, 230, 118, 0.6); }
    }
  `,

  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
} as const;

// ─── Transition Presets ─────────────────────────────────────────────────────

export const transitions = {
  /** General-purpose fast transition for hover states */
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Default transition for most interactive elements */
  normal: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Slower transition for page-level or modal transitions */
  slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Color-only transition for buttons and links */
  color: 'color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Transform transition for hover lift effects */
  transform: 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',

  /** Opacity-only transition for fade effects */
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',

  /** Shadow transition for glow effects */
  shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ─── Animation Presets (for style attributes) ───────────────────────────────

export const animations = {
  fadeIn: 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
  fadeOut: 'fadeOut 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
  slideUp: 'slideUp 300ms cubic-bezier(0, 0, 0.2, 1) forwards',
  slideDown: 'slideDown 300ms cubic-bezier(0, 0, 0.2, 1) forwards',
  scaleIn: 'scaleIn 200ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  pixelPlace: 'pixelPlace 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  shimmer: 'shimmer 1.5s linear infinite',
  countdownTick: 'countdownTick 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  glowPulse: 'glowPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  spin: 'spin 1s linear infinite',
} as const;
