import React from "react";
import { useLocalSearchParams } from "expo-router";
import { EventDetailScreen } from "@/features/events/EventDetailScreen";
import { useEvents } from "@/hooks/useEvents";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Spinner } from "@/components/ui/spinner";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Spinner size="large" />
        <Text className="mt-4">Chargement de l'événement...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">
          Erreur lors du chargement de l'événement
        </Text>
        <Text className="text-gray-600 text-center mt-2">{error.message}</Text>
      </VStack>
    );
  }

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <VStack className="flex-1 justify-center items-center p-4">
        <Text className="text-gray-600 text-center">Événement non trouvé</Text>
      </VStack>
    );
  }

  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1 }}
    >
      <EventDetailScreen event={event} />
    </SafeAreaView>
  );
}
