import React from "react";
import { ScrollView } from "react-native";
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
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
    }
  };

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack className="px-4 py-4" space="lg">
        <CreateEventForm
          onSubmit={handleCreateEvent}
          isLoading={isCreatingEvent}
        />
      </VStack>
    </ScrollView>
  );
};
