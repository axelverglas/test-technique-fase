import ChoiceScreen from "@/features/auth/choice-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Choice() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1">
      <ChoiceScreen />
    </SafeAreaView>
  );
}
