import React from "react";
import { ScrollView, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { ImageBackground } from "@/components/ui/image-background";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Bookmark, BookmarkCheck } from "lucide-react-native";
import { Event } from "@/schema/events";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";

interface SimilarEventsSectionProps {
  currentEventId: string;
  events: Event[];
}

export const SimilarEventsSection = ({
  currentEventId,
  events,
}: SimilarEventsSectionProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  // Filtrer les événements pour exclure l'événement actuel et limiter à 5
  const similarEvents = events
    .filter((event) => event.id !== currentEventId)
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  const handleEventPress = (eventId: string) => {
    router.push(`/(tabs)/events/${eventId}`);
  };

  const handleFavoritePress = (eventId: string) => {
    toggleFavorite(eventId);
  };

  if (similarEvents.length === 0) {
    return null;
  }

  return (
    <VStack space="lg">
      <Text className="text-lg font-semibold">Événements similaires</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <HStack space="md">
          {similarEvents.map((event) => (
            <Pressable
              key={event.id}
              onPress={() => handleEventPress(event.id)}
            >
              <Box className="w-72 shadow-sm">
                {/* Image avec overlay pour favoris */}
                <Box
                  className="relative overflow-hidden rounded-sm"
                  style={{ height: 250 }}
                >
                  <ImageBackground
                    source={{ uri: event.image }}
                    alt={event.title}
                    style={{ width: "100%", height: 250 }}
                  />

                  {/* Bouton favori */}
                  <Button
                    onPress={() => handleFavoritePress(event.id)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white"
                    action="secondary"
                  >
                    <Icon
                      as={isFavorite(event.id) ? BookmarkCheck : Bookmark}
                      size="sm"
                    />
                  </Button>
                </Box>

                {/* Contenu */}
                <VStack className="p-4" space="xs">
                  <Text className="text-base font-semibold" numberOfLines={2}>
                    {event.title}
                  </Text>
                  <Text className="text-sm text-gray-600" numberOfLines={1}>
                    {event.location || "Lieu à confirmer"}
                  </Text>
                  <Text className="text-sm font-medium">
                    {formatDate(event.date)} • Dès 10€
                  </Text>
                </VStack>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </VStack>
  );
};
