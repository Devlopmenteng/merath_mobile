/**
 * @file colors.ts
 * @description Advanced color system following Material Design 3 principles
 * Supports light and dark modes with semantic colors
 */

export const colors = {
  // Primary Colors - Islamic Green (Professional & Trustworthy)
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main primary color
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Secondary Colors - Professional Blue (Trust & Stability)
  secondary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3', // Main secondary color
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },

  // Tertiary Colors - Warm Accent (Engagement)
  tertiary: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800', // Main tertiary color
    600: '#FB8C00',
    700: '#F57C00',
    800: '#E65100',
    900: '#BF360C',
  },

  // Error Colors
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336', // Main error color
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
  },

  // Warning Colors
  warning: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FBC02D', // Main warning color
    600: '#F9A825',
    700: '#F57F17',
    800: '#F57C00',
    900: '#E65100',
  },

  // Success Colors
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50', // Main success color
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
  },

  // Info Colors
  info: {
    50: '#E1F5FE',
    100: '#B3E5FC',
    200: '#81D4FA',
    300: '#4FC3F7',
    400: '#29B6F6',
    500: '#03A9F4', // Main info color
    600: '#039BE5',
    700: '#0288D1',
    800: '#0277BD',
    900: '#01579B',
  },

  // Neutral Colors - Grayscale
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Background Colors
  background: {
    light: '#FFFFFF',
    lightAlt: '#F5F5F5',
    dark: '#121212',
    darkAlt: '#1E1E1E',
  },

  // Surface Colors
  surface: {
    light: '#FFFFFF',
    lightElevated: '#F5F5F5',
    dark: '#1E1E1E',
    darkElevated: '#2C2C2C',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#666666',
    tertiary: '#999999',
    disabled: '#BDBDBD',
    hint: '#CCCCCC',
    inverse: '#FFFFFF',
  },

  // Border Colors
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
    dark: '#757575',
  },

  // Semantic Colors for States
  state: {
    hover: 'rgba(0, 0, 0, 0.04)',
    focus: 'rgba(0, 0, 0, 0.08)',
    active: 'rgba(0, 0, 0, 0.12)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },

  // Gradient Colors
  gradient: {
    primary: ['#4CAF50', '#2E7D32'],
    secondary: ['#2196F3', '#1565C0'],
    tertiary: ['#FF9800', '#E65100'],
    success: ['#4CAF50', '#1B5E20'],
    error: ['#F44336', '#B71C1C'],
    warning: ['#FBC02D', '#F57F17'],
  },
};

/**
 * Light Mode Theme
 */
export const lightTheme = {
  colors: {
    primary: colors.primary[500],
    primaryLight: colors.primary[100],
    primaryDark: colors.primary[700],
    
    secondary: colors.secondary[500],
    secondaryLight: colors.secondary[100],
    secondaryDark: colors.secondary[700],
    
    tertiary: colors.tertiary[500],
    tertiaryLight: colors.tertiary[100],
    tertiaryDark: colors.tertiary[700],
    
    background: colors.background.light,
    surface: colors.surface.light,
    surfaceElevated: colors.surface.lightElevated,
    
    text: colors.text.primary,
    textSecondary: colors.text.secondary,
    textTertiary: colors.text.tertiary,
    textDisabled: colors.text.disabled,
    
    border: colors.border.light,
    divider: colors.neutral[200],
    
    error: colors.error[500],
    errorLight: colors.error[100],
    errorDark: colors.error[700],
    
    warning: colors.warning[500],
    warningLight: colors.warning[100],
    warningDark: colors.warning[700],
    
    success: colors.success[500],
    successLight: colors.success[100],
    successDark: colors.success[700],
    
    info: colors.info[500],
    infoLight: colors.info[100],
    infoDark: colors.info[700],
  },
};

/**
 * Dark Mode Theme
 */
export const darkTheme = {
  colors: {
    primary: colors.primary[400],
    primaryLight: colors.primary[300],
    primaryDark: colors.primary[600],
    
    secondary: colors.secondary[400],
    secondaryLight: colors.secondary[300],
    secondaryDark: colors.secondary[600],
    
    tertiary: colors.tertiary[400],
    tertiaryLight: colors.tertiary[300],
    tertiaryDark: colors.tertiary[600],
    
    background: colors.background.dark,
    surface: colors.surface.dark,
    surfaceElevated: colors.surface.darkElevated,
    
    text: colors.text.inverse,
    textSecondary: colors.neutral[400],
    textTertiary: colors.neutral[500],
    textDisabled: colors.neutral[600],
    
    border: colors.border.dark,
    divider: colors.neutral[700],
    
    error: colors.error[400],
    errorLight: colors.error[900],
    errorDark: colors.error[200],
    
    warning: colors.warning[400],
    warningLight: colors.warning[900],
    warningDark: colors.warning[200],
    
    success: colors.success[400],
    successLight: colors.success[900],
    successDark: colors.success[200],
    
    info: colors.info[400],
    infoLight: colors.info[900],
    infoDark: colors.info[200],
  },
};
