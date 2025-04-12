import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";

export const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded] = useFonts({
    Manrope: require("../assets/fonts/Manrope-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
