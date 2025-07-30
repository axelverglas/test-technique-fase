import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateEventForm } from "./components/CreateEventForm";
import { useEvents } from "@/hooks/useEvents";
import { useRouter } from "expo-router";

export const CreateEventScreen = () => {
  const { createEvent, isCreatingEvent } = useEvents();
  const router = useRouter();

  const handleCreateEvent = async (eventData: any) => {
    try {
      await createEvent(eventData);
      // Rediriger vers la page d'accueil après création
      router.push("/(tabs)/");
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <Box className="flex-1 bg-background-0">
        <VStack space="lg" className="flex-1">
          <HStack className="justify-center items-center p-6">
            <Text className="text-2xl font-bold">Créer un événement</Text>
          </HStack>

          <Box className="flex-1 px-6">
            <CreateEventForm
              onSubmit={handleCreateEvent}
              isLoading={isCreatingEvent}
            />
          </Box>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
