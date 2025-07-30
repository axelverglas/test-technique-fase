import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="choice" />
      <Stack.Screen
        name="sign-in"
        options={{ headerShown: true, headerLeft: () => <BackButton /> }}
      />
      <Stack.Screen
        name="sign-up"
        options={{ headerShown: true, headerLeft: () => <BackButton /> }}
      />
    </Stack>
  );
}
