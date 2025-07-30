import React from "react";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ImageBackground } from "@/components/ui/image-background";
import { Bookmark, BookmarkCheck, ChevronLeft } from "lucide-react-native";
import { Event } from "@/schema/events";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "expo-router";

interface EventDetailScreenProps {
  event: Event;
}

export const EventDetailScreen = ({ event }: EventDetailScreenProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFavoritePress = () => {
    toggleFavorite(event.id);
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <VStack className="px-4" space="md">
        {/* Image de l'événement */}
        <Box
          className="relative rounded-2xl overflow-hidden"
          style={{ height: 200 }}
        >
          <ImageBackground
            source={{ uri: event.image }}
            alt={event.title}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />
          {/* Bouton retour */}
          <Button
            onPress={handleBackPress}
            className="absolute top-4 left-4 p-3 rounded-full"
          >
            <Icon as={ChevronLeft} size="sm" color="black" />
          </Button>
          {/* Bouton favori */}
          <Button
            onPress={handleFavoritePress}
            className="absolute top-4 right-4 p-3 rounded-full"
            action="primary"
          >
            <Icon
              as={isFavorite(event.id) ? BookmarkCheck : Bookmark}
              size="sm"
              color="black"
            />
          </Button>
        </Box>

        {/* Titre, date et lieu */}
        <VStack space="sm">
          <Text className="text-2xl font-bold">{event.title}</Text>
          <Text className="text-lg font-medium">
            {formatDate(event.date)} de {formatTime(event.date)} à 7h
          </Text>
          <Text className="text-base">
            {event.location || "Lieu à confirmer"} • À 13 min à pied
          </Text>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
