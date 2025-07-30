import { FavoritesScreen } from "@/features/events/FavoritesScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavoritesPage() {
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1 }}
    >
      <FavoritesScreen />
    </SafeAreaView>
  );
}
