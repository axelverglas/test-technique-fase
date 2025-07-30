import { supabase } from "@/utils/supabase";
import {
  Event,
  CreateEvent,
  UserFavorite,
  CreateFavorite,
  EventWithFavorite,
} from "@/schema/events";

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

  // Récupérer les événements avec leur statut de favori pour un utilisateur
  async getEventsWithFavorites(userId: string): Promise<EventWithFavorite[]> {
    const { data, error } = await supabase
      .from("events")
      .select(
        `
        *,
        user_favorites!inner(user_id)
      `
      )
      .eq("user_favorites.user_id", userId);

    if (error) throw error;

    // Récupérer tous les événements
    const allEvents = await this.getAllEvents();

    // Récupérer les favoris de l'utilisateur
    const { data: favorites, error: favoritesError } = await supabase
      .from("user_favorites")
      .select("event_id")
      .eq("user_id", userId);

    if (favoritesError) throw favoritesError;

    const favoriteEventIds = new Set(favorites?.map((f) => f.event_id) || []);

    return allEvents.map((event) => ({
      ...event,
      isFavorite: favoriteEventIds.has(event.id),
    }));
  },
};

export const favoritesService = {
  // Ajouter un favori
  async addFavorite(favorite: CreateFavorite): Promise<UserFavorite> {
    const { data, error } = await supabase
      .from("user_favorites")
      .insert(favorite)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Retirer un favori
  async removeFavorite(userId: string, eventId: string): Promise<void> {
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id", userId)
      .eq("event_id", eventId);

    if (error) throw error;
  },

  // Récupérer les événements favoris d'un utilisateur
  async getUserFavorites(userId: string): Promise<Event[]> {
    // Récupérer d'abord les IDs des événements favoris
    const { data: favorites, error: favoritesError } = await supabase
      .from("user_favorites")
      .select("event_id")
      .eq("user_id", userId);

    if (favoritesError) throw favoritesError;

    if (!favorites || favorites.length === 0) {
      return [];
    }

    // Récupérer les événements correspondants
    const eventIds = favorites.map((f) => f.event_id);
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("*")
      .in("id", eventIds);

    if (eventsError) throw eventsError;
    return events || [];
  },

  // Toggle favori
  async toggleFavorite(userId: string, eventId: string): Promise<boolean> {
    // Vérifier si le favori existe déjà
    const { data: existing } = await supabase
      .from("user_favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("event_id", eventId)
      .single();

    if (existing) {
      // Retirer le favori
      await this.removeFavorite(userId, eventId);
      return false;
    } else {
      // Ajouter le favori
      await this.addFavorite({ user_id: userId, event_id: eventId });
      return true;
    }
  },
};
