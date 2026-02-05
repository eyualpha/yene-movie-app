import { Stack } from "expo-router";
import FavoritesProvider from "@/context/favorites-context";
import "../global.css";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </FavoritesProvider>
  );
}
