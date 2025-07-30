import { z } from "zod";

export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Le titre est requis"),
  date: z.string().min(1, "La date est requise"),
  image: z.string().url("L'URL de l'image doit être valide"),
  description: z.string().optional(),
  location: z.string().optional(),
  price: z.number().min(0, "Le prix doit être positif").optional(),
});

export const CreateEventSchema = EventSchema.omit({ id: true });

export type Event = z.infer<typeof EventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;
