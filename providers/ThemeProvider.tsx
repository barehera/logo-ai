import React, { useLayoutEffect } from "react";
import {
  Theme,
  ThemeProvider as NavigationThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "@/lib/useColorScheme";
import { StatusBar } from "expo-status-bar";
import { NAV_THEME } from "@/theme/colors";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <NavigationThemeProvider
      value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}
    >
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      {children}
    </NavigationThemeProvider>
  );
};
