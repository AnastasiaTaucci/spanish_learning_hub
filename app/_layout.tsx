import { Stack } from "expo-router";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ResourceProvider } from "@/context/ResourcesContext";


import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <FavoritesProvider>
        <ResourceProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            <Stack.Screen name="details" options={{ headerShown: false}} />
            <Stack.Screen name="addResource" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found"  />
          </Stack>
        </ResourceProvider>
      </FavoritesProvider>
    </GluestackUIProvider>
  );
}
