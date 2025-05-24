import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wfyjcsupxfjbwywjpunm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeWpjc3VweGZqYnd5d2pwdW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5OTM4NjUsImV4cCI6MjA2MjU2OTg2NX0.7vc-W0kD5BYLinFqMPk4I3JH8h2_kt9-4ccFGzR3JpE",

  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
