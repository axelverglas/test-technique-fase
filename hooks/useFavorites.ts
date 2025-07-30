import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "@/services/events";
import { useUser } from "@/hooks/useUser";

export const useFavorites = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => favoritesService.getUserFavorites(user?.id || ""),
    enabled: !!user?.id,
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ eventId }: { eventId: string }) =>
      favoritesService.toggleFavorite(user?.id || "", eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["events-with-favorites"] });
    },
  });

  const toggleFavorite = (eventId: string) => {
    return toggleFavoriteMutation.mutateAsync({ eventId });
  };

  return {
    favorites,
    isLoading,
    error,
    refetch,
    toggleFavorite,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
  };
};
