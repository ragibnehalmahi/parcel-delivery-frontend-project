<<<<<<< HEAD
 
import { ThemeProviderContext } from "@/context/theme.context";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
=======
 
import { ThemeProviderContext } from "@/context/theme.context";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
>>>>>>> 83f810d1e4f52bcfb5248d889b25b62f8f7b5a8b
};