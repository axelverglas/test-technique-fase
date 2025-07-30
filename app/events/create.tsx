import { CreateEventScreen } from "@/features/events/CreateEventScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateEventPage() {
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1 }}
    >
      <CreateEventScreen />
    </SafeAreaView>
  );
}
