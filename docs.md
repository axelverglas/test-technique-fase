# Mini-cas technique : **"Créer la feature de favoris"**

### 🎯 Objectif

Créer une **feature simple mais complète (front + back)** autour des **favoris d’événements** pour l’app **Fase**.

Le but est de tester ta logique fullstack, ta capacité à structurer une feature maintenable, et ta gestion du temps sur un périmètre réaliste.

---

### 🧩 Contexte

Tu travailles sur l’application **Fase**, qui propose une liste d’événements culturels.

On souhaite permettre aux utilisateurs de **mettre des événements en favoris** (et de les retrouver plus tard) via une l’icône suivante :

![bookmark (3).svg](<attachment:9e2e7210-cc5c-4c60-8eef-3ecbf0fa7d66:bookmark_(3).svg>)

---

### ✅ À faire

### 🔹 Back-end (Supabase)

- Créer une base d’événements simple (5–10 items avec `id`, `titre`, `date`, `image`)
- Implémenter une logique pour stocker les favoris d’un utilisateur :
  - Une table `user_favorites` (avec `user_id` et `event_id`)
- Implémenter ou simuler les **endpoints / requêtes** permettant de :
  - Ajouter ou retirer un favori
  - Récupérer les événements favoris d’un utilisateur

### 🔹 Front-end (React Native / Expo)

- Afficher une **liste d’événements** avec leurs infos principales : titre, image, date
- Ajouter un bouton permettant de mettre/retirer un favori
- La sélection doit être **persistée** (via l’API ou mock)

---

### ⏱️ Temps estimé

- Durée indicative : **1h de développement**
- Tu as **48h** pour livrer ton travail

---

### 📦 À rendre

- Un lien vers le **repo GitHub**
- Un **README court** avec :
  - Stack utilisée
  - Choix techniques
  - Limites / hypothèses
- Une **démo rapide** :
  - Lien Expo Go (si dispo)
  - OU une courte vidéo Loom / screen recording

---

### 🎨 Design

Tu trouveras ci-aprés une **maquette de la page d’événement** issue de l’application Fase.

[Page-événement.pdf](attachment:593b111d-df77-4014-955a-0970346c6f97:Page-evenement.pdf)

- Tu peux t’en **inspirer** pour structurer la **carte événement** (image, titre, date, bouton favori)
- **Pas besoin de pixel-perfect pour ce cas** : ce qui nous intéresse ici, c’est la logique, la lisibilité du code, et la propreté de la structure UI
