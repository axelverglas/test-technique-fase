# Supabase - Configuration et Migration

Ce dossier contient la configuration Supabase pour l'application Fase.

## 📁 Structure

```
supabase/
├── config.toml          # Configuration Supabase CLI
├── migrations/          # Migrations de base de données
│   └── 001_initial_schema.sql
└── seed.sql            # Données initiales (événements hip-hop)
```

## 🚀 Installation et Configuration

### 1. Prérequis

**Docker Desktop est requis pour Supabase local**

```bash
# Installer Docker Desktop
# macOS : https://docs.docker.com/desktop/install/mac-install/
# Windows : https://docs.docker.com/desktop/install/windows-install/
# Linux : https://docs.docker.com/desktop/install/linux-install/

# Vérifier que Docker fonctionne
docker --version
```

### 2. Installer Supabase CLI

```bash
# Option A : NPM (recommandé)
npm i supabase --save-dev

# Option B : Homebrew (macOS)
brew install supabase/tap/supabase

# Option C : Version beta
npm i supabase@beta --save-dev
# ou
brew install supabase/tap/supabase-beta
brew link --overwrite supabase-beta
```

### 3. Initialiser le projet

```bash
# Si installé avec npm (dans le dossier racine du projet)
npx supabase init

# Si installé avec Homebrew
supabase init
```

### 4. Démarrer Supabase localement

```bash
# Si installé avec npm
npx supabase start

# Si installé avec Homebrew
supabase start

# Vérifier le statut
npx supabase status
# ou
supabase status
```

### 5. Appliquer les migrations

```bash
# Si installé avec npm
npx supabase db reset
npx supabase db push

# Si installé avec Homebrew
supabase db reset
supabase db push
```

### 6. Insérer les données de test

```bash
# Si installé avec npm
npx supabase db reset

# Si installé avec Homebrew
supabase db reset
```

## 🔧 Commandes Utiles

### Base de données

```bash
# Si installé avec npm
npx supabase status
npx supabase stop
npx supabase start
npx supabase db reset
npx supabase db push
npx supabase logs

# Si installé avec Homebrew
supabase status
supabase stop
supabase start
supabase db reset
supabase db push
supabase logs
```

### Studio (Interface Web)

```bash
# Si installé avec npm
npx supabase studio

# Si installé avec Homebrew
supabase studio

# Ou accéder directement à http://localhost:54323
```

### Génération de types

```bash
# Si installé avec npm
npx supabase gen types typescript --local > ../types/supabase.ts

# Si installé avec Homebrew
supabase gen types typescript --local > ../types/supabase.ts
```

## 📊 Tables Créées

### `events`

- `id` (UUID, Primary Key)
- `title` (TEXT, NOT NULL)
- `date` (TEXT, NOT NULL)
- `image` (TEXT, NOT NULL)
- `description` (TEXT)
- `location` (TEXT)
- `price` (DECIMAL)
- `created_at` (TIMESTAMP)

### `user_favorites`

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `event_id` (UUID, Foreign Key)
- `created_at` (TIMESTAMP)
- Contrainte UNIQUE sur (user_id, event_id)

## 🔐 Sécurité (RLS)

### Politiques pour `events`

- **SELECT** : Lecture publique pour tous
- **INSERT** : Seuls les utilisateurs authentifiés

### Politiques pour `user_favorites`

- **SELECT** : Utilisateur peut voir ses propres favoris
- **INSERT** : Utilisateur peut ajouter ses propres favoris
- **DELETE** : Utilisateur peut supprimer ses propres favoris

## 🎯 Données de Test

Le fichier `seed.sql` contient 12 événements culturels hip-hop :

1. **Festival Hip-Hop Underground** - Le Trianon, Paris
2. **Exposition Street Art & Graffiti** - Galerie Urbaine, Lyon
3. **Battle de Rap Freestyle** - Le Divan du Monde, Paris
4. **Workshop Beatmaking & Production** - Studio Beat Factory, Marseille
5. **Concert Rap Indépendant** - Le Petit Bain, Paris
6. **Exposition Culture Urbaine** - Centre Culturel Urbain, Bordeaux
7. **DJ Set Hip-Hop Classics** - Le Rex Club, Paris
8. **Atelier Graffiti & Street Art** - Atelier Street Art, Nantes
9. **Battle de Breakdance** - Salle de Danse Urbaine, Toulouse
10. **Conférence "Hip-Hop & Société"** - Université Paris 8, Saint-Denis
11. **Concert Rap Conscious** - La Bellevilloise, Paris
12. **Exposition "Femmes du Hip-Hop"** - Galerie Féministe, Lyon

## 🔗 URLs Locales

- **API** : http://localhost:54321
- **Studio** : http://localhost:54323
- **Database** : postgresql://postgres:postgres@localhost:54322/postgres
- **Auth** : http://localhost:54327
- **Storage** : http://localhost:54324

## 🚨 Dépannage

### Problème Docker

```bash
# Vérifier que Docker Desktop est démarré
docker --version

# Redémarrer Docker Desktop si nécessaire
# macOS : Applications > Docker Desktop
# Windows : Systray > Docker Desktop
# Linux : sudo systemctl start docker

# Vérifier que Docker fonctionne
docker ps
```

### Problème de ports

```bash
# Vérifier les ports utilisés
lsof -i :54321
lsof -i :54322
lsof -i :54323

# Arrêter et redémarrer
npx supabase stop
npx supabase start
# ou
supabase stop
supabase start
```

### Problème de base de données

```bash
# Réinitialiser complètement
npx supabase db reset --linked
# ou
supabase db reset --linked

# Ou supprimer et recréer
npx supabase stop
npx supabase start
# ou
supabase stop
supabase start
```

### Problème de migrations

```bash
# Voir les migrations appliquées
npx supabase migration list
# ou
supabase migration list

# Appliquer manuellement
npx supabase db push
# ou
supabase db push
```

## 📝 Variables d'Environnement

Ajoutez ces variables dans votre `.env` :

```env
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_studio
```

L'anon key se trouve dans Supabase Studio > Settings > API.
