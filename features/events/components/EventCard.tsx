import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { Bookmark, BookmarkCheck } from "lucide-react-native";
import { EventWithFavorite } from "@/schema/events";

interface EventCardProps {
  event: EventWithFavorite;
  onToggleFavorite: (eventId: string) => void;
  onPress?: () => void;
}

export const EventCard = ({
  event,
  onToggleFavorite,
  onPress,
}: EventCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleFavoritePress = () => {
    onToggleFavorite(event.id);
  };

  return (
    <Pressable onPress={onPress}>
      <Box className="bg-background-0 rounded-lg shadow-sm border border-outline-200 overflow-hidden">
        <Image
          source={{ uri: event.image }}
          alt={event.title}
          className="w-full h-48"
          resizeMode="cover"
        />

        <VStack space="sm" className="p-4">
          <HStack className="justify-between items-start">
            <VStack space="xs" className="flex-1">
              <Text className="text-lg font-semibold text-typography-900">
                {event.title}
              </Text>
              <Text className="text-sm text-typography-600">
                {formatDate(event.date)}
              </Text>
              {event.location && (
                <Text className="text-sm text-typography-500">
                  📍 {event.location}
                </Text>
              )}
              {event.price !== undefined && (
                <Text className="text-sm text-typography-500">
                  💰 {event.price}€
                </Text>
              )}
            </VStack>

            <Pressable
              onPress={handleFavoritePress}
              className="p-2 rounded-full bg-background-100"
            >
              <Icon
                as={event.isFavorite ? BookmarkCheck : Bookmark}
                size="md"
                color={event.isFavorite ? "primary.500" : "typography.400"}
              />
            </Pressable>
          </HStack>

          {event.description && (
            <Text className="text-sm text-typography-600" numberOfLines={2}>
              {event.description}
            </Text>
          )}
        </VStack>
      </Box>
    </Pressable>
  );
};
