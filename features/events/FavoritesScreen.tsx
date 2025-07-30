import React from "react";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EventCard } from "./components/EventCard";
import { useFavorites } from "@/hooks/useFavorites";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/schema/events";

export const FavoritesScreen = () => {
  const { favorites, isLoading: isLoadingFavorites } = useFavorites();
  const { events, isLoading: isLoadingEvents } = useEvents();

  // Filtrer les événements pour ne garder que les favoris
  const favoriteEvents = events.filter((event) =>
    favorites.some((fav) => fav.event_id === event.id)
  );

  const renderEventCard = ({ item }: { item: Event }) => (
    <EventCard
      event={item}
      onPress={() => {
        console.log("Navigation vers l'événement:", item.id);
      }}
    />
  );

  if (isLoadingFavorites || isLoadingEvents) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Text>Chargement des favoris...</Text>
      </VStack>
    );
  }

  return (
    <VStack className="flex-1 px-4">
      <Text size="xl">Mes Favoris ({favoriteEvents.length})</Text>

      {favoriteEvents.length === 0 ? (
        <VStack className="flex-1 justify-center items-center">
          <Text>Aucun événement en favori</Text>
        </VStack>
      ) : (
        <FlatList
          data={favoriteEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 10, gap: 12 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
};
