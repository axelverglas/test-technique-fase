-- Créer le bucket pour les images d'événements
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Politique pour permettre l'upload d'images aux utilisateurs authentifiés
CREATE POLICY "Authenticated users can upload event images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'event-images' 
  AND auth.role() = 'authenticated'
);

-- Politique pour permettre la lecture publique des images
CREATE POLICY "Public can view event images" ON storage.objects
FOR SELECT USING (bucket_id = 'event-images');

-- Politique pour permettre aux utilisateurs de supprimer leurs propres images
CREATE POLICY "Users can delete their own event images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'event-images' 
  AND auth.role() = 'authenticated'
);