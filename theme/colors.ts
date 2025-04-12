export const COLORS = {
  // Light theme colors
  light: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(240 3% 16%)",
    cardForeground: "hsl(240 10% 3.9%)",
    popover: "hsl(0 0% 100%)",
    popoverForeground: "hsl(240 10% 3.9%)",
    primary: "hsl(231 73% 51%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(267 100% 62%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 6% 10%)",
    mutedForeground: "hsl(240 5% 47.3%)",
    accent: "hsl(240 8% 26%)",
    accentForeground: "hsl(240 5.9% 10%)",
    destructive: "hsl(0 84% 60%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(0 0% 98%)",
    input: "hsl(240 3% 16%)",
    ring: "hsl(240 5.9% 10%)",
  },

  // Dark theme colors
  dark: {
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(0 0% 98%)",
    card: "hsl(240 3% 16%)",
    cardForeground: "hsl(0 0% 98%)",
    popover: "hsl(240 10% 3.9%)",
    popoverForeground: "hsl(0 0% 98%)",
    primary: "hsl(231 73% 51%)",
    primaryForeground: "hsl(0 0% 98%)",
    secondary: "hsl(267 100% 62%)",
    secondaryForeground: "hsl(0 0% 98%)",
    muted: "hsl(240 6% 10%)",
    mutedForeground: "hsl(240 5% 47.3%)",
    accent: "hsl(240 8% 26%)",
    accentForeground: "hsl(0 0% 98%)",
    destructive: "hsl(0 84% 60%)",
    destructiveForeground: "hsl(0 0% 98%)",
    border: "hsl(0 0% 98%)",
    input: "hsl(240 3% 16%)",
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
