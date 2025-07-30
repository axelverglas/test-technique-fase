import { supabase } from "@/utils/supabase";
import { Event, CreateEvent } from "@/schema/events";

export const eventsService = {
  // Récupérer tous les événements
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Créer un nouvel événement
  async createEvent(event: CreateEvent): Promise<Event> {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
