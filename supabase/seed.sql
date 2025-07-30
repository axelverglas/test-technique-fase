-- Seed: Données initiales pour l'application Fase
-- Description: Événements culturels, hip-hop, rap, art urbain

-- Supprimer les données existantes (optionnel)
DELETE FROM user_favorites;
DELETE FROM events;

-- Insérer les événements culturels
INSERT INTO events (title, date, image, description, location, price) VALUES
(
  'Festival Hip-Hop Underground',
  '2024-02-15',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
  'Le plus grand rassemblement de la scène hip-hop underground. MCs, DJs, danseurs et graffeurs réunis pour 3 jours de culture urbaine.',
  'Le Trianon, Paris',
  35
),
(
  'Exposition Street Art & Graffiti',
  '2024-02-20',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
  'Découvrez les œuvres des plus grands artistes street art français et internationaux. Banksy, Shepard Fairey et bien d''autres.',
  'Galerie Urbaine, Lyon',
  15
),
(
  'Battle de Rap Freestyle',
  '2024-02-25',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
  'Compétition de rap freestyle avec les meilleurs MCs de France. Jury composé de rappeurs confirmés.',
  'Le Divan du Monde, Paris',
  20
),
(
  'Workshop Beatmaking & Production',
  '2024-03-01',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  'Apprenez à créer des beats avec des producteurs professionnels. Logic Pro, Ableton, techniques de sampling.',
  'Studio Beat Factory, Marseille',
  80
),
(
  'Concert Rap Indépendant',
  '2024-03-05',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
  'Soirée dédiée aux nouveaux talents du rap français. Découvrez les artistes de demain.',
  'Le Petit Bain, Paris',
  25
),
(
  'Exposition Culture Urbaine',
  '2024-03-10',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
  'Histoire et évolution de la culture urbaine : hip-hop, breakdance, graffiti, DJing. Photos et vidéos d''archives.',
  'Centre Culturel Urbain, Bordeaux',
  12
),
(
  'DJ Set Hip-Hop Classics',
  '2024-03-15',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
  'Voyage dans les classiques du hip-hop avec DJ Cut Killer. De Grandmaster Flash à Kendrick Lamar.',
  'Le Rex Club, Paris',
  18
),
(
  'Atelier Graffiti & Street Art',
  '2024-03-20',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
  'Initiation au graffiti et street art. Techniques de spray, pochoirs, collages. Matériel fourni.',
  'Atelier Street Art, Nantes',
  45
),
(
  'Battle de Breakdance',
  '2024-03-25',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
  'Compétition de breakdance avec les meilleurs B-Boys et B-Girls de France. Catégories solo et crew.',
  'Salle de Danse Urbaine, Toulouse',
  15
),
(
  'Conférence "Hip-Hop & Société"',
  '2024-03-30',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
  'Débat sur l''impact du hip-hop sur la société française. Avec des sociologues et des artistes.',
  'Université Paris 8, Saint-Denis',
  0
),
(
  'Concert Rap Conscious',
  '2024-04-05',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
  'Soirée dédiée au rap engagé et conscient. Artistes qui utilisent leur voix pour le changement social.',
  'La Bellevilloise, Paris',
  22
),
(
  'Exposition "Femmes du Hip-Hop"',
  '2024-04-10',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
  'Hommage aux femmes qui ont marqué l''histoire du hip-hop. MCs, DJs, danseuses, graffeuses.',
  'Galerie Féministe, Lyon',
  8
); 