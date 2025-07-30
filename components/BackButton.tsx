import React from "react";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.back()}>
      <ChevronLeft width={20} height={20} />
    </Pressable>
  );
}
