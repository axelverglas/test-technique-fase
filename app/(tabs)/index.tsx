import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventsScreen } from "@/features/events/EventsScreen";

export default function Home() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
      <VStack space="lg" className="flex-1">
        <EventsScreen />
      </VStack>
    </SafeAreaView>
  );
}
