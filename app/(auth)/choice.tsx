import ChoiceScreen from "@/features/auth/ChoiceScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Choice() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1">
      <ChoiceScreen />
    </SafeAreaView>
  );
}
