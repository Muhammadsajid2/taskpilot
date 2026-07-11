"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { App, ConfigProvider, theme } from "antd";
import QueryProvider from "./QueryProvider";
import AuthGuard from "./AuthGuard";
import AntdGlobalProvider from "./AntdGlobalProvider";

const ThemeModeContext = createContext({
  themeMode: "dark",
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = "taskpilot-theme-mode";

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeMode(savedTheme);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [mounted, themeMode]);

  const toggleTheme = () => {
    setThemeMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  const themeConfig = useMemo(() => {
    const isDark = themeMode === "dark";

    return {
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: "#3b82f6",
        borderRadius: 8,
        colorBgContainer: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.75)",
        colorTextBase: isDark ? "#f8fafc" : "#0f172a",
        colorBgBase: isDark ? "#0f172a" : "#f8fafc",
      },
      components: {
        Input: {
          colorBgContainer: isDark
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(255, 255, 255, 0.9)",
          colorBorder: isDark
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(15, 23, 42, 0.12)",
        },
        Button: {
          colorPrimary: "#3b82f6",
          colorPrimaryHover: "#2563eb",
        },
      },
    };
  }, [themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>
        <App>
          <AntdGlobalProvider>
            <QueryProvider>
              <AuthGuard>{children}</AuthGuard>
            </QueryProvider>
          </AntdGlobalProvider>
        </App>
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;
