import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/services/favorites";
import { toast } from "sonner-native";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  // Récupérer tous les favoris
  const {
    data: favorites = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesService.getUserFavorites,
  });

  // Ajouter un favori
  const addFavoriteMutation = useMutation({
    mutationFn: favoritesService.addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // Supprimer un favori
  const removeFavoriteMutation = useMutation({
    mutationFn: favoritesService.removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // Toggle favori
  const toggleFavorite = async (eventId: string) => {
    const wasFavorite = favorites.some((fav) => fav.event_id === eventId);

    try {
      if (wasFavorite) {
        await removeFavoriteMutation.mutateAsync(eventId);
        toast.success("Retiré des favoris");
      } else {
        await addFavoriteMutation.mutateAsync(eventId);
        toast.success("Ajouté aux favoris");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du favori:", error);
      toast.error("Erreur lors de la modification du favori");
    }
  };

  // Vérifier si un événement est en favori
  const isFavorite = (eventId: string) => {
    return favorites.some((fav) => fav.event_id === eventId);
  };

  return {
    favorites,
    isLoading,
    error,
    refetch,
    toggleFavorite,
    isFavorite,
    addFavorite: addFavoriteMutation.mutateAsync,
    removeFavorite: removeFavoriteMutation.mutateAsync,
  };
};
