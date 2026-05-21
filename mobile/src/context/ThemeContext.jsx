import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  colors: {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#007AFF",
    surface: "#F2F2F7",
    border: "#C6C6C8",
  },
});

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  const toggleTheme = () => setIsDark(!isDark);

  const colors = isDark
    ? {
        background: "#000000",
        text: "#FFFFFF",
        primary: "#0A84FF",
        surface: "#1C1C1E",
        border: "#38383A",
      }
    : {
        background: "#FFFFFF",
        text: "#000000",
        primary: "#007AFF",
        surface: "#F2F2F7",
        border: "#C6C6C8",
      };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
