-- Migration: 004_add_location_coordinates.sql
-- Description: Ajout des colonnes latitude et longitude pour la géolocalisation des événements

-- Ajouter les colonnes latitude et longitude à la table events
ALTER TABLE events 
ADD COLUMN latitude DECIMAL(10, 8),
ADD COLUMN longitude DECIMAL(11, 8);

-- Index pour améliorer les performances des requêtes géographiques
CREATE INDEX IF NOT EXISTS idx_events_coordinates ON events(latitude, longitude);