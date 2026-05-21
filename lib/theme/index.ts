/**
 * @file theme/index.ts
 * @description Central theme export with all design tokens
 */

export * from './colors';
export * from './spacing';
export { useTheme } from './useTheme';

import { colors, lightTheme, darkTheme } from './colors';
import { spacing, borderRadius, shadows, typography, sizes, zIndex, durations, easing } from './spacing';

/**
 * Complete theme object
 */
export const theme = {
  light: {
    colors: lightTheme.colors,
    spacing,
    borderRadius,
    shadows,
    typography,
    sizes,
    zIndex,
    durations,
    easing,
  },
  
  dark: {
    colors: darkTheme.colors,
    spacing,
    borderRadius,
    shadows,
    typography,
    sizes,
    zIndex,
    durations,
    easing,
  },
};

export type Theme = typeof theme.light;
