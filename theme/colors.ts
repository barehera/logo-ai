/**
 * Color definitions for light and dark themes
 *
 * This module provides a consistent color palette for the application following
 * the design system principles. Colors are defined using HSL values.
 *
 * The structure follows react-native-reusables theming approach for React Native applications,
 * making it compatible with their component library.
 *
 * NOTE: When changing colors here, don't forget to update corresponding values in global.css
 * to maintain consistency across the application.
 */
export const COLORS = {
  // Light theme colors
  light: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(260 10% 18%)",
    cardForeground: "hsl(240 10% 3.9%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(240 10% 3.9%)",
    primary: "hsl(231 73% 51%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(267 100% 62%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 6% 10%)",
    mutedForeground: "hsl(240 5% 47.3%)",
    accent: "hsl(240 4% 10%)",
    accentForeground: "hsl(240 5.9% 10%)",
    destructive: "hsl(0 84% 60%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(0 0% 98%)",
    input: "hsl(260 10% 18%)",
    ring: "hsl(240 5.9% 10%)",
  },

  // Dark theme colors
  dark: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(260 10% 18%)",
    cardForeground: "hsl(0 0% 98%)",
    popover: "hsl(240 10% 3.9%)",
    popoverForeground: "hsl(0 0% 98%)",
    primary: "hsl(231 73% 51%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(267 100% 62%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 6% 10%)",
    mutedForeground: "hsl(240 5% 47.3%)",
    accent: "hsl(240 4% 10%)",
    accentForeground: "hsl(0 0% 98%)",
    destructive: "hsl(0 84% 60%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(0 0% 98%)",
    input: "hsl(260 10% 18%)",
    ring: "hsl(240 4.9% 83.9%)",
  },
};

const createNavTheme = (theme: "light" | "dark") => ({
  background: COLORS[theme].background,
  border: COLORS[theme].border,
  card: COLORS[theme].card,
  notification: COLORS[theme].destructive,
  primary: COLORS[theme].primary,
  text: COLORS[theme].foreground,
});

export const NAV_THEME = {
  light: createNavTheme("light"),
  dark: createNavTheme("dark"),
};
