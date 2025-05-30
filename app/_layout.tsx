import { Stack } from "expo-router";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ResourceProvider } from "@/context/ResourcesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as PaperProvider } from "react-native-paper";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // handle initial supabase authentication
  //Right now, your app is using a test user. So, instead of showing a login form, you sign them in automatically when the app opens.
  // This useEffect runs once when the app starts. Supabase stores the session (because you set it up with AsyncStorage in supabase.ts)
  useEffect(() => {
    async function autoSignin() {
      if (isAuthenticated) {
        console.log("User is already authenticated, skipping sign-in.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: "test@example.com",
        password: "12345678aA!",
      });

      if (error) {
        console.error("Error signing in: ", error.message);
      } else {
        setIsAuthenticated(true);
        console.log("Signed in user: ", data);
      }
    }

    autoSignin();
  }, [isAuthenticated]);

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider mode="light">
          <ResourceProvider>
            <FavoritesProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </FavoritesProvider>
          </ResourceProvider>
        </GluestackUIProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
