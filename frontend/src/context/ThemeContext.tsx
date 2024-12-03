// components/theme-provider.tsx
"use client";

import { createContext, useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

const setThemeFromWindow = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
    return systemTheme;
  }

  root.classList.add(theme);
  return theme;
};

const notInContext = () => {
  throw new Error("Not in context");
};

export const ThemeProviderContext = createContext<{
  theme: Theme;
  isDark: () => boolean;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}>({
  theme: "system",
  isDark: notInContext,
  setTheme: notInContext,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(setThemeFromWindow(defaultTheme));

  const isDark = useCallback(() => theme === "dark", [theme]);

  useEffect(() => {
    setThemeFromWindow(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
