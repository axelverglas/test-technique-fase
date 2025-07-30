import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { EventsScreen } from "@/features/events/EventsScreen";
import { FavoritesScreen } from "@/features/events/FavoritesScreen";

export default function Home() {
  const { user, profile, avatarUrl } = useUser();
  const { signOut } = useAuth();
  const [currentTab, setCurrentTab] = useState<"events" | "favorites">(
    "events"
  );

  console.log("user", user);
  console.log("profile", profile);
  console.log("avatarUrl", avatarUrl);

  const renderContent = () => {
    switch (currentTab) {
      case "events":
        return <EventsScreen />;
      case "favorites":
        return <FavoritesScreen />;
      default:
        return <EventsScreen />;
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <Box className="flex-1 bg-background-0">
        <VStack space="lg" className="flex-1">
          <HStack className="justify-between items-center p-6">
            <Text className="text-2xl font-bold">Fase</Text>
            <Button onPress={signOut} variant="outline" size="sm">
              <ButtonText>Déconnexion</ButtonText>
            </Button>
          </HStack>

          <HStack className="px-6">
            <Button
              onPress={() => setCurrentTab("events")}
              variant={currentTab === "events" ? "solid" : "outline"}
              className="flex-1 mr-2"
            >
              <ButtonText>Événements</ButtonText>
            </Button>
            <Button
              onPress={() => setCurrentTab("favorites")}
              variant={currentTab === "favorites" ? "solid" : "outline"}
              className="flex-1 ml-2"
            >
              <ButtonText>Favoris</ButtonText>
            </Button>
          </HStack>

          <Box className="flex-1">{renderContent()}</Box>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}
