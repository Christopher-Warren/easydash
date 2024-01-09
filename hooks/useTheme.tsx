import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext<any>(null);

export const ThemeContextProvider = ({ children }: any) => {
  return (
    <ThemeContext.Provider value={useState(null)}>
      {children}
    </ThemeContext.Provider>
  );
};

// at useTheme (webpack-internal:///./hooks/useTheme.tsx:24:31)
// at DashboardHome (webpack-internal:///./pages/dashboard/index.tsx:23:80)

const useTheme = () => {
  const [theme, setTheme] =
    useContext<[null | "light" | "dark", any]>(ThemeContext);
  useEffect(() => {
    if (theme === null) {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }
    }
    if (theme === "dark") document.documentElement.classList.add("dark");

    if (theme === "light") document.documentElement.classList.remove("dark");
  }, [setTheme, theme]);

  return [theme, setTheme];
};
export default useTheme;
