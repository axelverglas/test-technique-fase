import SignInScreen from "@/features/auth/signin-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1">
      <SignInScreen />
    </SafeAreaView>
  );
}
