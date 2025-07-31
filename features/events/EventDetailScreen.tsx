import React from "react";
import { ScrollView, Linking, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ImageBackground } from "@/components/ui/image-background";
import { Divider } from "@/components/ui/divider";
import { Badge, BadgeText } from "@/components/ui/badge";
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  MapPin,
} from "lucide-react-native";
import { Event } from "@/schema/events";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "expo-router";
import { SimilarEventsSection } from "./components/SimilarEventsSection";
import { useEvents } from "@/hooks/useEvents";

interface EventDetailScreenProps {
  event: Event;
}

export const EventDetailScreen = ({ event }: EventDetailScreenProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { events = [] } = useEvents();
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

  // Configuration de la région de la carte
  const getMapRegion = (latitude: number, longitude: number) => {
    return {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  };

  // Ouvrir l'application Maps native
  const openInMaps = async (
    latitude: number,
    longitude: number,
    label: string
  ) => {
    const url = `maps:0,0?q=${latitude},${longitude}(${encodeURIComponent(
      label
    )})`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Erreur", "Impossible d'ouvrir l'application Maps");
    }
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <VStack className="px-4" space="4xl">
        {/* Image de l'événement */}
        <Box
          className="relative rounded-lg overflow-hidden"
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
            action="secondary"
            className="absolute top-4 left-4 p-3 rounded-full bg-white"
          >
            <Icon as={ChevronLeft} size="sm" color="black" />
          </Button>
          {/* Bouton favori */}
          <Button
            onPress={handleFavoritePress}
            className="absolute top-4 right-4 p-3 rounded-full bg-white"
            action="secondary"
          >
            <Icon
              as={isFavorite(event.id) ? BookmarkCheck : Bookmark}
              size="sm"
              color="black"
            />
          </Button>
        </Box>

        {/* Titre, date et lieu */}
        <VStack space="md">
          <Text className="text-2xl font-bold">{event.title}</Text>
          <Text className="text-lg font-medium">
            {formatDate(event.date)} de {formatTime(event.date)} à 7h
          </Text>
          <Text className="text-base">
            {event.location || "Lieu à confirmer"} • À 13 min à pied
          </Text>
        </VStack>

        {/* Séparateur */}
        <Divider />

        <VStack space="xl">
          <Text className="text-lg font-semibold">À propos</Text>
          {/* tags en dur */}
          <HStack space="sm" className="flex-wrap">
            <Badge
              variant="outline"
              size="md"
              className="rounded-full bg-transparent border-primary-500 py-2 px-3"
            >
              <BadgeText>Concert</BadgeText>
            </Badge>
            <Badge
              variant="outline"
              size="md"
              className="rounded-full bg-transparent border-primary-500"
            >
              <BadgeText>Clubbing</BadgeText>
            </Badge>
          </HStack>
          {/* description */}
          <Text className="text-sm">
            {event.description || "Aucune description disponible"}
          </Text>
        </VStack>

        {/* Carte de localisation */}
        {event.latitude && event.longitude && (
          <VStack space="xl">
            <Box className="rounded-sm overflow-hidden">
              <MapView
                style={{ width: "100%", height: 200 }}
                region={getMapRegion(event.latitude, event.longitude)}
                onPress={() =>
                  openInMaps(event.latitude!, event.longitude!, event.title)
                }
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                  }}
                  title={event.title}
                  description={event.location || "Localisation de l'événement"}
                />
              </MapView>
            </Box>

            {event.location && (
              <HStack space="sm" className="items-center">
                <Icon as={MapPin} size="sm" color="gray" />
                <Text className="text-sm text-gray-600">{event.location}</Text>
              </HStack>
            )}
          </VStack>
        )}

        {/* Événements similaires */}
        <SimilarEventsSection currentEventId={event.id} events={events} />
      </VStack>
    </ScrollView>
  );
};
