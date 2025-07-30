import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsService } from "@/services/events";
import { CreateEvent } from "@/schema/events";
import { useUser } from "@/hooks/useUser";

export const useEvents = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: events = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventsService.getAllEvents,
  });

  const {
    data: eventsWithFavorites = [],
    isLoading: isLoadingWithFavorites,
    error: errorWithFavorites,
    refetch: refetchWithFavorites,
  } = useQuery({
    queryKey: ["events-with-favorites", user?.id],
    queryFn: () => eventsService.getEventsWithFavorites(user?.id || ""),
    enabled: !!user?.id,
  });

  const createEventMutation = useMutation({
    mutationFn: eventsService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["events-with-favorites"] });
    },
  });

  const createEvent = (event: CreateEvent) => {
    return createEventMutation.mutateAsync(event);
  };

  return {
    events,
    eventsWithFavorites,
    isLoading,
    isLoadingWithFavorites,
    error,
    errorWithFavorites,
    refetch,
    refetchWithFavorites,
    createEvent,
    isCreatingEvent: createEventMutation.isPending,
  };
};
