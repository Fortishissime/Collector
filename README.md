
# Collector - Présentation du Projet

*Initialement créer par AMI SAADA Massil Achour (@Fortishissime) et REN Jonathan (@jona3341). Version remasterisée sous l'accord direct des auteurs*

Ce projet est la reprise d'un projet non abouti, repensé et optimisé afin de **réduire son impact environnemental**, tout en conservant ses fonctionnalités principales.

Il offre une expérience fluide permettant aux utilisateurs d’interagir avec des données de paris et des statistiques pour des jeux comme **League of Legends** et **Valorant**.

---

## 🛠️ Installation des dépendances

Suivez ces quatre étapes pour installer les paquets nécessaires :

1. Aller dans le dossier du backend :
   ```bash
   cd ./backend 
   ```
2. Installer les dépendances du backend :
   ```bash
   npm install
   ```
3. Aller dans le dossier du frontend :
   ```bash
   cd ./frontend 
   ```
4. Installer les dépendances du frontend :
   ```bash
   npm install
   ```

---

## 🚀 Lancer le projet

1. Aller dans le dossier du backend :
   ```bash
   cd ./backend
   ```
2. Lancer le serveur backend :
   ```bash
   node ./server/server.js
   ```
3. Dans un nouveau terminal, aller dans le dossier du frontend :
   ```bash
   cd ./frontend
   ```
4. Lancer le serveur de développement du frontend :
   ```bash
   npm run dev
   ```

---

## 📚 Tutoriel

1. Ouvrez votre navigateur et allez sur [localhost:5173](http://localhost:5173)
2. Inscrivez-vous pour créer un nouveau compte
3. Connectez-vous ensuite (vous n’êtes pas connecté automatiquement)
4. Vous serez redirigé vers la page du tableau de bord
5. Profitez de l’expérience !

---

## 🗃️ Accéder à la base de données

Pour consulter la base de données, vous pouvez utiliser Prisma Studio pour visualiser et modifier les données.

1. Aller dans le dossier du backend :
   ```bash
   cd ./backend
   ```
2. Lancer Prisma Studio :
   ```bash
   npx prisma studio
   ```

Vous pouvez y ajouter ou modifier des données manuellement.

---

## 🔌 Gestion des erreurs de l'API Pandascore

Nous utilisons un service tiers, **Pandascore**, pour récupérer les données de Valorant et League of Legends.

En cas d’erreur avec l’API Pandascore, activez le mode `DEV` dans le fichier `.ENV`. Cela permettra d’utiliser des données exemples au lieu de faire des requêtes vers l’API en direct.

---

## 🐛 Bugs connus

- Le module de pièces (coins) ne se met pas à jour en temps réel ; il faut rafraîchir la page pour voir les dernières valeurs.  
  _→ Cela est dû à une mauvaise utilisation du contexte React, non corrigée par manque de temps._
- Si le serveur reste actif trop longtemps, les requêtes peuvent être rejetées par l’API Pandascore.  
  _→ Il y a une limite de 1000 requêtes par heure, et trop de connexions ouvertes peuvent être bloquées._

---

## ⛔ Fonctionnalités suspendues

- **Leaderboard** : la comparaison des utilisateurs via `BetDelta` est actuellement suspendue.
- **Paris** : il est possible de placer un pari, mais les gains ne sont pas crédités, et le statut des matchs ne se met pas à jour.
