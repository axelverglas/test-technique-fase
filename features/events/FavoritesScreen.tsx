import React from "react";
import { FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { RefreshControl } from "@/components/ui/refresh-control";
import { EventCard } from "./components/EventCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Event } from "@/schema/events";

export const FavoritesScreen = () => {
  const { favorites, isLoading, error, refetch, toggleFavorite } =
    useFavorites();

  const handleToggleFavorite = async (eventId: string) => {
    try {
      await toggleFavorite(eventId);
    } catch (error) {
      console.error("Erreur lors du toggle du favori:", error);
    }
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <Box className="mb-4">
      <EventCard
        event={{ ...item, isFavorite: true }}
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
              Erreur lors du chargement des favoris
            </Text>
            <Text className="text-sm text-typography-500">
              Vérifiez votre connexion et réessayez
            </Text>
          </VStack>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom"]}>
      <Box className="flex-1 bg-background-0">
        <VStack space="lg" className="flex-1">
          <Box className="p-6">
            <Text className="text-2xl font-bold">Mes Favoris</Text>
            <Text className="text-sm text-typography-500 mt-1">
              {favorites.length} événement{favorites.length > 1 ? "s" : ""} en
              favori
            </Text>
          </Box>

          <FlatList
            data={favorites}
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
                    ? "Chargement des favoris..."
                    : "Aucun favori pour le moment"}
                </Text>
                <Text className="text-sm text-typography-400 text-center mt-2">
                  Ajoutez des événements en favoris pour les retrouver ici
                </Text>
              </Box>
            }
          />
        </VStack>
      </Box>
    </SafeAreaView>
  );
};
