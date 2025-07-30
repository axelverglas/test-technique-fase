import { createClient } from "@supabase/supabase-js";
import { MMKV } from "react-native-mmkv";

import { replaceLocalhost } from "./get-localhost";

// Créer une instance MMKV pour Supabase
const storage = new MMKV({
  id: "supabase-storage",
  encryptionKey: "your-encryption-key-here", // Optionnel: pour chiffrer les données
});

if (!process.env.EXPO_PUBLIC_SUPABASE_URL) {
  throw new Error(
    `EXPO_PUBLIC_SUPABASE_URL is not set. Please update the root .env.local and restart the server.`
  );
}

if (!process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    `EXPO_PUBLIC_SUPABASE_ANON_KEY is not set. Please update the root .env.local and restart the server.`
  );
}

const supabaseUrl = replaceLocalhost(process.env.EXPO_PUBLIC_SUPABASE_URL);

const MMKVAdapter = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const supabase = createClient(
  supabaseUrl,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: MMKVAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
