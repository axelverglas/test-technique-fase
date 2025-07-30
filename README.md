# Fase - Application d'Événements Culturels

Une application React Native/Expo pour découvrir et gérer vos événements culturels favoris.

## 🎯 Fonctionnalités

- **Liste d'événements** : Parcourez une collection d'événements culturels
- **Système de favoris** : Ajoutez/retirez des événements de vos favoris
- **Création d'événements** : Formulaire pour créer de nouveaux événements
- **Interface moderne** : Design épuré et responsive
- **Persistance des données** : Sauvegarde dans Supabase

## 🛠️ Stack Technique

- **Frontend** : React Native + Expo
- **UI Components** : Gluestack UI + NativeWind (Tailwind CSS)
- **Backend** : Supabase (PostgreSQL + Auth)
- **State Management** : TanStack Query (React Query)
- **Validation** : Zod
- **Forms** : React Hook Form
- **Navigation** : Expo Router

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
