import {
  FontProvider,
  TanstackQueryProvider,
  ThemeProvider,
} from "@/providers";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <TanstackQueryProvider>
      <ThemeProvider>
        <FontProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="modals/outputModal"
              options={{
                presentation: "modal",
                headerShown: false,
                animation: "fade_from_bottom",
              }}
            />
          </Stack>
        </FontProvider>
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
