import React from "react";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EventCard } from "./components/EventCard";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/schema/events";

export const EventsScreen = () => {
  const { events, isLoading, error } = useEvents();

  const renderEventCard = ({ item }: { item: Event }) => (
    <EventCard
      event={item}
      onPress={() => {
        console.log("Navigation vers l'événement:", item.id);
      }}
    />
  );

  if (error) {
    return (
      <VStack className="flex-1 justify-center items-center p-5">
        <Text size="lg" className="color-red-500 mb-5">
          Erreur lors du chargement des événements
        </Text>
        <Text>Error: {error.message}</Text>
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Text>Chargement des événements...</Text>
      </VStack>
    );
  }

  return (
    <VStack className="flex-1 px-4">
      {events.length === 0 ? (
        <VStack className="flex-1 justify-center items-center">
          <Text>Aucun événement trouvé</Text>
        </VStack>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, gap: 12 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
};
