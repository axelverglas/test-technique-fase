import { supabase } from "@/utils/supabase";

export interface Favorite {
  id: string;
  user_id: string;
  event_id: string;
  created_at: string;
}

export const favoritesService = {
  // Ajouter un événement aux favoris
  async addFavorite(eventId: string): Promise<Favorite | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("user_favorites")
      .insert({ user_id: user.id, event_id: eventId })
      .select()
      .single();

    if (error) {
      console.error("Erreur lors de l'ajout du favori:", error);
      return null;
    }

    return data;
  },

  // Supprimer un événement des favoris
  async removeFavorite(eventId: string): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("event_id", eventId);

    if (error) {
      console.error("Erreur lors de la suppression du favori:", error);
      return false;
    }

    return true;
  },

  // Récupérer tous les favoris de l'utilisateur
  async getUserFavorites(): Promise<Favorite[]> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("user_favorites")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération des favoris:", error);
      return [];
    }

    return data || [];
  },

  // Vérifier si un événement est en favori
  async isFavorite(eventId: string): Promise<boolean> {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from("user_favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("event_id", eventId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  },
};
