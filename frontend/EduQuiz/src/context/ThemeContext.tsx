import React, { createContext, useContext, useState, useMemo } from 'react';

export interface ThemeColors {
  isDark: boolean;
  bg: string;
  bgSubtle: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  headerBg: string;
  headerBorder: string;
  navBg: string;
  navBorder: string;
  inputBg: string;
  inputBorder: string;
  chipBg: string;
  tagBg: string;
  danger: string;
  success: string;
  warning: string;
}

const lightColors: ThemeColors = {
  isDark: false,
  bg: '#ffffff',
  bgSubtle: '#f8fafc',
  card: '#ffffff',
  cardBorder: '#e2e8f0',
  text: '#0f172a',
  textSecondary: '#334155',
  textMuted: '#64748b',
  primary: '#2563eb',
  primaryLight: '#eff6ff',
  headerBg: '#ffffff',
  headerBorder: '#e2e8f0',
  navBg: '#ffffff',
  navBorder: '#e2e8f0',
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  chipBg: '#f1f5f9',
  tagBg: '#f8fafc',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};

const darkColors: ThemeColors = {
  isDark: true,
  bg: '#0f172a',
  bgSubtle: '#0b1120',
  card: '#1e293b',
  cardBorder: '#334155',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  primary: '#3b82f6',
  primaryLight: '#1e3a8a',
  headerBg: '#0f172a',
  headerBorder: '#1e293b',
  navBg: '#0f172a',
  navBorder: '#1e293b',
  inputBg: '#1e293b',
  inputBorder: '#334155',
  chipBg: '#334155',
  tagBg: '#1e293b',
  danger: '#f87171',
  success: '#34d399',
  warning: '#fbbf24',
};

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const colors = useMemo(() => (isDark ? darkColors : lightColors), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
