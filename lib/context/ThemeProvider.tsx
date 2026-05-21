/**
 * @file lib/context/ThemeProvider.tsx
 * @description Theme provider component for managing theme state
 */

import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export type ThemeType = 'light' | 'dark';

export interface ThemeContextType {
  theme: typeof theme.light;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

  const currentTheme = isDark ? theme.dark : theme.light;

  const value: ThemeContextType = {
    theme: currentTheme,
    isDark,
    setTheme: (newTheme: ThemeType) => {
      setIsDark(newTheme === 'dark');
    },
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
