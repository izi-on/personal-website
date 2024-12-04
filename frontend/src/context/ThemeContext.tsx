// components/theme-provider.tsx
"use client";

import Cookies from "js-cookie";
import { createContext, useCallback, useEffect, useState } from "react";
import { over } from "lodash";

export type Theme = "dark" | "light" | "system";

const COOKIE_NAME_KEY = "theme";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

const cookieThemeSetter = (theme: Theme) => {
  Cookies.set("theme", theme, { expires: 365 });
  return theme;
};

const windowThemeSetter = (theme: Theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  return theme;
};

const applyTheme: (arg0: Theme) => void = over(
  cookieThemeSetter,
  windowThemeSetter,
);

const themeInit = (theme: Theme) => {
  // Check if the theme is saved in the cookie
  const cookieTheme = Cookies.get(COOKIE_NAME_KEY) as Theme | undefined;
  if (cookieTheme) {
    return cookieTheme;
  }

  // Use the system theme
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return systemTheme;
  }

  // Otherwise, the theme passed is valid
  return theme;
};

const notInContext = () => {
  throw new Error("Not in context");
};

export const ThemeProviderContext = createContext<{
  theme: Theme;
  isDark: () => boolean;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  isDark: notInContext,
  setTheme: notInContext,
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(themeInit(defaultTheme));

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const isDark = useCallback(() => theme === "dark", [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
