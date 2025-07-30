import React, { useState } from "react";
import { FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "@/components/ui/refresh-control";
import { EventCard } from "./components/EventCard";
import { CreateEventForm } from "./components/CreateEventForm";
import { useEvents } from "@/hooks/useEvents";
import { useFavorites } from "@/hooks/useFavorites";
import { EventWithFavorite } from "@/schema/events";

export const EventsScreen = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    eventsWithFavorites,
    isLoading,
    error,
    refetch,
    createEvent,
    isCreatingEvent,
  } = useEvents();
  const { toggleFavorite, isTogglingFavorite } = useFavorites();

  const handleToggleFavorite = async (eventId: string) => {
    try {
      await toggleFavorite(eventId);
    } catch (error) {
      console.error("Erreur lors du toggle du favori:", error);
    }
  };

  const handleCreateEvent = async (eventData: any) => {
    try {
      await createEvent(eventData);
      setShowCreateForm(false);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
    }
  };

  const renderEventCard = ({ item }: { item: EventWithFavorite }) => (
    <Box className="mb-4">
      <EventCard
        event={item}
        onToggleFavorite={handleToggleFavorite}
        onPress={() => {
          // Navigation vers le détail de l'événement
          console.log("Navigation vers l'événement:", item.id);
        }}
      />
    </Box>
  );

  if (error) {
    return (
      <SafeAreaView edges={["top", "bottom"]}>
        <Box className="flex-1 bg-background-0 p-6">
          <VStack space="lg" className="flex-1 justify-center items-center">
            <Text className="text-lg text-error-600">
              Erreur lors du chargement des événements
            </Text>
            <Button onPress={refetch}>
              <ButtonText>Réessayer</ButtonText>
            </Button>
          </VStack>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <Box className="flex-1 bg-background-0">
        <VStack space="lg" className="flex-1">
          <HStack className="justify-between items-center p-6">
            <Text className="text-2xl font-bold">Fase - Événements</Text>
            <Button
              onPress={() => setShowCreateForm(!showCreateForm)}
              variant="outline"
            >
              <ButtonText>
                {showCreateForm ? "Annuler" : "Créer un événement"}
              </ButtonText>
            </Button>
          </HStack>

          {showCreateForm && (
            <Box className="px-6">
              <CreateEventForm
                onSubmit={handleCreateEvent}
                isLoading={isCreatingEvent}
              />
            </Box>
          )}

          <FlatList
            data={eventsWithFavorites}
            renderItem={renderEventCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 24 }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            ListEmptyComponent={
              <Box className="flex-1 justify-center items-center py-12">
                <Text className="text-lg text-typography-500 text-center">
                  {isLoading
                    ? "Chargement des événements..."
                    : "Aucun événement trouvé"}
                </Text>
              </Box>
            }
          />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
