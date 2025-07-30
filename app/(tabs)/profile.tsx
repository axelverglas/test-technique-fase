import { ProfileScreen } from "@/features/profile/ProfileScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1 }}
    >
      <ProfileScreen />
    </SafeAreaView>
  );
}
