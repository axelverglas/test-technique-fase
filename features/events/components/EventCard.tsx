import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Bookmark, BookmarkCheck } from "lucide-react-native";
import { Event } from "@/schema/events";
import { ImageBackground } from "@/components/ui/image-background";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export const EventCard = ({ event, onPress }: EventCardProps) => {
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

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(event.id);
  };

  const handleCardPress = () => {
    router.push(`/(tabs)/events/${event.id}`);
  };

  return (
    <Pressable onPress={handleCardPress}>
      <Box className="rounded-lg shadow-sm border border-outline-200 overflow-hidden">
        <Box className="relative">
          <ImageBackground
            source={{ uri: event.image }}
            alt={event.title}
            style={{ width: "100%", height: 150 }}
            resizeMode="cover"
            className="rounded-lg"
          />

          <Button
            onPress={handleFavoritePress}
            className="absolute top-4 left-4 p-3 rounded-full bg-white"
            action="secondary"
          >
            <Icon
              as={isFavorite(event.id) ? BookmarkCheck : Bookmark}
              size="sm"
            />
          </Button>
        </Box>

        <VStack space="sm" className="p-4">
          <HStack className="justify-between items-start">
            <VStack space="xs" className="flex-1">
              <Text className="text-lg font-semibold">{event.title}</Text>
              <Text className="text-sm">{formatDate(event.date)}</Text>
              {event.location && (
                <Text className="text-sm">{event.location}</Text>
              )}
            </VStack>
          </HStack>

          {event.description && (
            <Text className="text-sm" numberOfLines={2}>
              {event.description}
            </Text>
          )}
        </VStack>
      </Box>
    </Pressable>
  );
};
