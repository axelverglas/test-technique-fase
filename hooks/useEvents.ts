import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventsService } from "@/services/events";
import { CreateEvent } from "@/schema/events";
import { useUser } from "@/hooks/useUser";

export const useEvents = () => {
  const queryClient = useQueryClient();

  const {
    data: events = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      console.log("Fetching events...");
      const events = await eventsService.getAllEvents();
      console.log("Events fetched:", events);
      return events;
    },
  });

  const createEventMutation = useMutation({
    mutationFn: eventsService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const createEvent = (event: CreateEvent) => {
    return createEventMutation.mutateAsync(event);
  };

  return {
    events,
    isLoading,
    error,
    refetch,
    createEvent,
    isCreatingEvent: createEventMutation.isPending,
  };
};
