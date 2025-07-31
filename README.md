# Fase - Application d'Événements Culturels

Une application React Native/Expo pour découvrir et gérer vos événements culturels favoris.

## 🎥 Démonstration

Lien de la démonstration : https://drive.google.com/file/d/1PBeiQe8ZHyxd4gt05cQc-VsV2kzXAHel/view?usp=sharing

## 🎯 Fonctionnalités

- **Liste d'événements** : Parcourez une collection d'événements culturels
- **Système de favoris** : Ajoutez/retirez des événements de vos favoris
- **Création d'événements** : Formulaire pour créer de nouveaux événements
- **Interface moderne** : Design épuré et responsive
- **Persistance des données** : Sauvegarde dans Supabase

## 🛠️ Stack Technique

### Frontend & Mobile

- **Framework** : React Native 0.79.3 + React 19.0.0
- **Plateforme** : Expo 53.0.12 avec Expo Router 5.1.0
- **Styling** : NativeWind 4.1.23 (Tailwind CSS) + Gluestack UI
- **Animations** : React Native Reanimated 3.17.4 + Legendapp Motion 2.4.0
- **Icônes** : Expo Vector Icons + Lucide React Native
- **Navigation** : React Navigation 7.x avec Bottom Tabs

### UI Components (Gluestack UI)

- **Composants** : Accordion, ActionSheet, Alert, Button, Card, Input, Modal, etc.
- **Form Controls** : Input, Select, Checkbox, Radio, Switch, Textarea
- **Overlay** : Toast, Tooltip, Popover, Drawer
- **Media** : Image, Avatar avec support responsive

### Backend & Data

- **Backend** : Supabase (PostgreSQL + Auth + Storage)
- **State Management** : TanStack Query 5.80.7 (React Query)
- **Authentification** : Supabase Auth Helpers
- **Storage Local** : React Native MMKV 2.12.2 + Expo Secure Store
- **Validation** : Zod 3.25.67
- **Forms** : React Hook Form 7.58.1

### Fonctionnalités Natives

- **Image Picker** : Expo Image Picker 16.1.4
- **Maps** : React Native Maps 1.20.1
- **Location** : Expo Location 18.1.6
- **Notifications** : Sonner Native 0.21.0
- **Haptic Feedback** : Expo Haptics 14.1.4
- **Web Browser** : Expo Web Browser 14.1.6

### Développement & Build

- **TypeScript** : 5.3.3 avec types React 19.x
- **Build System** : Metro + Babel avec module resolver
- **Tests** : Jest 29.x + Jest Expo
- **Linting** : Expo Lint
- **Package Manager** : PNPM 9.15.1

## 🧠 Choix Techniques

### Architecture & Patterns

- **Expo Router** : Choisi pour la navigation basée sur le système de fichiers, simplifiant la structure et améliorant la DX
- **Feature-based Architecture** : Organisation par domaines métier (`features/events`, `features/auth`) pour une meilleure maintenabilité
- **TanStack Query** : Gestion de l'état serveur avec cache automatique, synchronisation et invalidation intelligente
- **Gluestack UI + NativeWind** : Combo performant alliant composants pré-construits et flexibilité du styling Tailwind

### Backend & Data

- **Supabase** : Solution Backend-as-a-Service complète avec PostgreSQL, Auth, Storage et Real-time intégrés
- **PostgreSQL** : Base de données relationnelle robuste avec support des relations complexes et requêtes avancées
- **Row Level Security (RLS)** : Sécurité au niveau des données directement dans la base pour protéger les informations utilisateur
- **MMKV** : Storage local ultra-rapide pour le cache et les données critiques hors-ligne

### Validation & Forms

- **Zod + React Hook Form** : Validation type-safe côté client avec schémas réutilisables
- **Hookform Resolvers** : Intégration seamless entre validation Zod et React Hook Form

### Performance & UX

- **React Native Reanimated** : Animations fluides exécutées sur le thread UI
- **Image Picker optimisé** : Compression et redimensionnement automatique des images
- **Lazy Loading** : Chargement progressif des composants et écrans

## ⚠️ Limites & Hypothèses

### Limites Techniques

- **Dépendance Expo** : Certaines fonctionnalités natives avancées peuvent nécessiter un eject
- **Taille de l'app** : Bundle size important dû aux nombreuses dépendances UI et animations
- **Performance Maps** : React Native Maps peut être gourmand en ressources sur les anciens appareils
- **Offline-first** : Support hors-ligne partiel, nécessite une connexion pour la synchronisation

### Hypothèses Métier

- **Utilisateurs authentifiés** : L'application nécessite une connexion pour toutes les fonctionnalités principales
- **Géolocalisation** : Les événements sont géolocalisés et les utilisateurs acceptent de partager leur position
- **Images obligatoires** : Chaque événement doit avoir une image (contrainte UX)
- **Modération simple** : Pas de système de modération avancé pour le contenu utilisateur

### Scalabilité

- **Base utilisateurs** : Optimisé pour <10k utilisateurs actifs simultanés (limites Supabase free tier)
- **Storage** : 1GB de stockage d'images (limite Supabase free tier)
- **Géographique** : Focus sur une zone géographique limitée (pas de multi-régions)

### Sécurité

- **Auth Supabase** : Dépendance complète au système d'authentification Supabase
- **Data validation** : Validation côté client uniquement (à compléter côté serveur pour la production)
- **Upload sécurisé** : Les uploads d'images ne sont pas scannés pour le contenu malveillant

## 🚀 Installation

1. **Cloner le projet**

```bash
git clone <repository-url>
cd tricount-like
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Configuration Supabase**

#### Option A : Supabase Cloud (recommandé pour la production)

- Créez un projet sur [supabase.com](https://supabase.com)
- Configurez les variables d'environnement dans `utils/supabase.ts`
- Exécutez le SQL de migration dans l'éditeur SQL de Supabase

#### Option B : Supabase Local (recommandé pour le développement)

**Prérequis : Docker Desktop**

```bash
# 1. Installer Docker Desktop
# https://docs.docker.com/desktop/

# 2. Installer Supabase CLI
npm i supabase --save-dev

# 3. Initialiser le projet
npx supabase init

# 4. Démarrer Supabase localement
npx supabase start

# 5. Appliquer les migrations et seeds
npx supabase db reset
```

**Voir le README complet dans `supabase/README.md` pour toutes les commandes.**

4. **Initialiser les données de test**

```bash
# Si vous utilisez Supabase local
npx supabase db reset

# Si vous utilisez Supabase Cloud, exécutez le contenu de supabase/seed.sql
```

5. **Lancer l'application**

```bash
npm start
# ou
yarn start
```

## 📱 Utilisation

1. **Authentification** : Connectez-vous avec votre compte
2. **Parcourir les événements** : Consultez la liste des événements disponibles
3. **Ajouter aux favoris** : Cliquez sur l'icône bookmark pour ajouter/retirer un favori
4. **Voir vos favoris** : Onglet "Favoris" pour voir vos événements sauvegardés
5. **Créer un événement** : Bouton "Créer un événement" pour ajouter un nouvel événement

## 🏗️ Architecture

```
src/
├── app/                    # Pages principales (Expo Router)
├── components/ui/          # Composants UI réutilisables
├── features/events/        # Feature événements
│   ├── components/         # Composants spécifiques aux événements
│   └── screens/           # Écrans des événements
├── hooks/                 # Hooks personnalisés
├── providers/             # Providers React
├── schema/                # Schémas Zod
├── services/              # Services API
└── utils/                 # Utilitaires
```

## 🎨 Design

L'application suit les principes de design moderne avec :

- Interface épurée et intuitive
- Navigation claire entre événements et favoris
- Cartes d'événements avec images et informations
- Boutons de favoris visuellement distincts
- Formulaires avec validation en temps réel

## 🔧 Développement

### Ajouter un nouvel événement

1. Cliquez sur "Créer un événement"
2. Remplissez le formulaire avec validation
3. L'événement apparaît automatiquement dans la liste

### Gérer les favoris

- Cliquez sur l'icône bookmark pour ajouter/retirer
- Les favoris sont persistés dans Supabase
- Synchronisation automatique entre les onglets

## 📊 Base de Données

### Tables principales

- `events` : Stockage des événements
- `user_favorites` : Relation many-to-many entre utilisateurs et événements
- `auth.users` : Gestion des utilisateurs (Supabase Auth)

### Relations

- Un utilisateur peut avoir plusieurs favoris
- Un événement peut être favori de plusieurs utilisateurs
- Suppression en cascade des favoris si un événement est supprimé

## 🚀 Déploiement

### Expo

```bash
# Build pour production
expo build:android
expo build:ios
```

### Variables d'environnement

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- [Expo](https://expo.dev/) pour l'écosystème React Native
- [Supabase](https://supabase.com/) pour le backend
- [Gluestack UI](https://ui.gluestack.io/) pour les composants
- [NativeWind](https://www.nativewind.dev/) pour le styling
- [Club Théory AKA Fase](https://club-theory.com/) pour le test technique 
