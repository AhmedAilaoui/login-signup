# 🛍️ NEXUS - Marketplace E-Commerce Full-Stack

Plateforme e-commerce moderne permettant aux vendeurs de gérer leurs produits et aux clients d'acheter en toute simplicité. Construite avec React.js, NestJS et MySQL.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-10.3.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Captures d'écran](#-captures-décran)
- [Déploiement](#-déploiement)
- [Contribuer](#-contribuer)
- [Auteur](#-auteur)
- [Licence](#-licence)

---

## 🎯 Aperçu

**NEXUS** est une marketplace e-commerce complète qui connecte vendeurs et acheteurs dans un environnement sécurisé et intuitif.

### 🎨 Caractéristiques principales

- 🛒 **Marketplace complète** - Achat et vente de produits en ligne
- 👥 **Double interface** - Espace client et espace vendeur séparés
- 🔐 **Authentification sécurisée** - Système JWT avec gestion des rôles
- 📱 **100% Responsive** - Compatible mobile, tablette et desktop
- ⚡ **Performance optimale** - Interface rapide avec Vite et React
- 🎨 **Design moderne** - UI élégante avec glassmorphism et animations

### 🎯 Cas d'usage

- Créer votre boutique en ligne en tant que vendeur
- Acheter des produits variés en tant que client
- Gérer vos produits et suivre vos statistiques
- Naviguer facilement parmi des milliers de produits

---

## ✨ Fonctionnalités

### 🛍️ Pour les Clients

- ✅ **Catalogue de produits** - Parcourir tous les produits disponibles
- ✅ **Recherche et filtres** - Trouver des produits par nom ou catégorie
- ✅ **Panier d'achat** - Ajouter, modifier et supprimer des articles
- ✅ **Gestion des quantités** - Ajuster le nombre d'articles dans le panier
- ✅ **Pagination** - Navigation fluide avec 9 produits par page
- ✅ **Calcul automatique** - Total, sous-total et frais de livraison
- ✅ **Processus de commande** - Simulation de paiement et confirmation
- ✅ **Responsive design** - Expérience optimale sur tous les appareils

### 🏪 Pour les Vendeurs

- ✅ **Dashboard complet** - Vue d'ensemble des statistiques
  - Total des produits
  - Chiffre d'affaires
  - Vues totales
  - Note moyenne
- ✅ **Gestion des produits** - CRUD complet (Create, Read, Update, Delete)
- ✅ **Formulaire d'ajout** - Créer des produits avec :
  - Nom et description
  - Prix et stock
  - Catégorie
  - Images (URL)
- ✅ **Pagination** - Gestion de 6 produits par page
- ✅ **Modifications en temps réel** - Interface d'édition intuitive
- ✅ **Consultation** - Voir les produits des autres vendeurs (lecture seule)

### 🔐 Authentification et Sécurité

- ✅ **Inscription sécurisée** - Choix du rôle (Client ou Vendeur)
- ✅ **Connexion JWT** - Tokens sécurisés avec expiration
- ✅ **Redirection intelligente** - Selon le rôle :
  - Vendeur → Dashboard
  - Client → Catalogue produits
- ✅ **Routes protégées** - Guards pour séparer les accès
- ✅ **Hachage des mots de passe** - Bcrypt avec salt rounds
- ✅ **Validation des données** - Vérification côté client et serveur

### 🎨 Interface Utilisateur

- ✅ **Landing Page moderne** - Présentation de NEXUS
  - Section Hero avec CTA
  - Statistiques (1000+ produits, 500+ vendeurs)
  - Features pour acheteurs et vendeurs
  - **Section Catégories** (8 catégories avec icônes)
  - Footer complet
- ✅ **Design cohérent** - Thème sombre élégant
- ✅ **Animations fluides** - Transitions et effets visuels
- ✅ **Messages de confirmation** - Feedback visuel pour chaque action
- ✅ **États de chargement** - Indicateurs pendant les requêtes

### 📊 Fonctionnalités avancées

- ✅ **Persistance du panier** - LocalStorage pour conserver le panier
- ✅ **Gestion du stock** - Vérification de disponibilité
- ✅ **Prévention des doublons** - Incrémentation de quantité si produit existant
- ✅ **Restriction par rôle** - Vendeurs ne peuvent pas acheter
- ✅ **Scroll automatique** - Retour en haut lors du changement de page
- ✅ **Responsive images** - Chargement optimisé des images

---

## 🛠️ Technologies

### Frontend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **React** | 18.3.1 | Bibliothèque UI avec hooks |
| **TypeScript** | 5.0+ | Typage statique |
| **Vite** | 5.0.11 | Build tool ultra-rapide |
| **React Router DOM** | 6.21.1 | Navigation et routing |
| **Axios** | 1.6.5 | Requêtes HTTP |
| **CSS3** | - | Styling moderne (Glassmorphism) |

### Backend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **NestJS** | 10.3.0 | Framework Node.js structuré |
| **TypeORM** | 0.3.19 | ORM pour MySQL |
| **MySQL** | 8.0+ | Base de données relationnelle |
| **Passport JWT** | 10.2.0 | Authentification stateless |
| **bcryptjs** | 2.4.3 | Hachage sécurisé des mots de passe |
| **class-validator** | 0.14.0 | Validation des DTOs |
| **class-transformer** | 0.5.1 | Transformation des objets |

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** v20.19+ ou v22.12+ ([Télécharger](https://nodejs.org))
- **npm** v10+ (inclus avec Node.js)
- **MySQL** v8.0+ ([Télécharger](https://dev.mysql.com/downloads/mysql/))
- **Git** ([Télécharger](https://git-scm.com/downloads))

### Vérification des versions

```bash
node --version   # Devrait afficher v20.19+ ou v22.12+
npm --version    # Devrait afficher v10+
mysql --version  # Devrait afficher v8.0+
```

---

## 🚀 Installation

### 1️⃣ Cloner le repository

```bash
git clone https://github.com/AhmedAilaoui/login-signup.git
cd login-signup
```

### 2️⃣ Installer le Backend

```bash
# Aller dans le dossier backend
cd Backend

# Installer les dépendances
npm install

# Copier le fichier d'environnement (si disponible)
# cp .env.example .env
```

**Créer un fichier `.env` dans le dossier Backend :**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_DATABASE=nexus_db

JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi_en_production
PORT=3001
```

### 3️⃣ Configurer MySQL

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE nexus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Vérifier
SHOW DATABASES;

# Quitter
EXIT;
```

**Note :** Les tables seront créées automatiquement par TypeORM au démarrage.

### 4️⃣ Installer le Frontend

```bash
# Retourner au dossier racine
cd ..

# Aller dans le dossier frontend
cd Frontend

# Installer les dépendances
npm install
```

---

## ⚙️ Configuration

### Backend (.env)

Le fichier `.env` du backend doit contenir :

```env
# Configuration Base de Données
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
DB_DATABASE=nexus_db

# Configuration JWT
JWT_SECRET=une_cle_secrete_tres_longue_et_aleatoire_123456789

# Port du serveur
PORT=3001
```

**⚠️ Important :**
- Changez `JWT_SECRET` par une clé aléatoire sécurisée (min. 32 caractères)
- Ne commitez **JAMAIS** le fichier `.env` sur Git
- Utilisez des mots de passe forts en production

### Frontend (Configuration API)

Le fichier `src/services/api.ts` contient la configuration de l'API :

```typescript
const API_URL = 'http://localhost:3001/api';
```

En production, changez cette URL vers votre serveur backend.

---

## 💻 Utilisation

### Démarrer l'application

**Terminal 1 - Backend :**
```bash
cd Backend
npm run start:dev
```

✅ Le backend sera accessible sur **http://localhost:3001**

**Terminal 2 - Frontend :**
```bash
cd Frontend
npm run dev
```

✅ Le frontend sera accessible sur **http://localhost:3000**

### Accéder à l'application

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

### Utilisation de la plateforme

#### En tant que CLIENT :

1. **Inscription** - Créez un compte avec le rôle "Client"
2. **Connexion** - Connectez-vous avec vos identifiants
3. **Catalogue** - Parcourez les produits disponibles
4. **Recherche** - Utilisez la barre de recherche ou les filtres de catégorie
5. **Panier** - Ajoutez des produits au panier
6. **Commande** - Passez commande depuis le panier

#### En tant que VENDEUR :

1. **Inscription** - Créez un compte avec le rôle "Vendeur"
2. **Connexion** - Connectez-vous avec vos identifiants
3. **Dashboard** - Consultez vos statistiques
4. **Gestion** - Ajoutez, modifiez ou supprimez vos produits
5. **Consultation** - Voir les produits des autres vendeurs

---

## 📁 Structure du projet

```
login-signup/
│
├── Frontend/                      # Application React + TypeScript
│   ├── public/                    # Fichiers statiques
│   ├── src/
│   │   ├── pages/                 # Pages de l'application
│   │   │   ├── LandingPage.tsx    # ✅ Page d'accueil (avec catégories)
│   │   │   ├── LandingPage.css
│   │   │   ├── LoginPage.tsx      # ✅ Page de connexion (avec redirection)
│   │   │   ├── LoginPage.css
│   │   │   ├── SubscribePage.tsx  # ✅ Page d'inscription (choix rôle)
│   │   │   ├── SubscribePage.css
│   │   │   ├── DashboardPage.tsx  # ✅ Dashboard vendeur (pagination)
│   │   │   ├── DashboardPage.css
│   │   │   ├── ProductsListPage.tsx # ✅ Catalogue produits (panier + pagination)
│   │   │   ├── ProductsListPage.css
│   │   │   ├── CartPage.tsx       # ✅ NOUVEAU - Page panier
│   │   │   └── CartPage.css       # ✅ NOUVEAU - Styles panier
│   │   ├── components/
│   │   │   └── header.tsx         # Header avec navigation
│   │   ├── services/
│   │   │   └── api.ts             # Configuration Axios
│   │   ├── App.tsx                # ✅ Routes + Guards
│   │   └── main.tsx               # Point d'entrée
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── Backend/                       # API NestJS + TypeScript
│   ├── src/
│   │   ├── auth/                  # Module d'authentification
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── login.dto.ts
│   │   │   ├── guards/            # Guards de sécurité
│   │   │   │   └── jwt-auth.guard.ts
│   │   │   ├── strategies/        # Stratégies Passport
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/                 # Module utilisateurs
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts # Entité User avec rôles
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── product/               # ✅ Module produits
│   │   │   ├── entities/
│   │   │   │   └── product.entity.ts # Entité Product
│   │   │   ├── product.controller.ts
│   │   │   ├── product.service.ts
│   │   │   └── product.module.ts
│   │   ├── app.module.ts          # Module racine
│   │   └── main.ts                # Point d'entrée
│   ├── .env                       # Variables d'environnement
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md                      # Ce fichier
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints disponibles

#### 🔐 Authentication

**POST /api/auth/register**

Créer un nouveau compte utilisateur.

**Body :**
```json
{
  "firstName": "Ahmed",
  "lastName": "Ailaoui",
  "email": "ahmed@example.com",
  "password": "password123",
  "phone": "+33612345678",
  "role": "client"  // "client" ou "vendeur"
}
```

**Réponse (201) :**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "firstName": "Ahmed",
    "lastName": "Ailaoui",
    "email": "ahmed@example.com",
    "role": "client"
  }
}
```

---

**POST /api/auth/login**

Se connecter et obtenir un token JWT.

**Body :**
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Réponse (200) :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "ahmed@example.com",
    "firstName": "Ahmed",
    "lastName": "Ailaoui",
    "role": "client"
  }
}
```

---

#### 👤 Users

**GET /api/users/profile**

Obtenir le profil de l'utilisateur connecté (route protégée).

**Headers :**
```
Authorization: Bearer {token}
```

**Réponse (200) :**
```json
{
  "id": 1,
  "firstName": "Ahmed",
  "lastName": "Ailaoui",
  "email": "ahmed@example.com",
  "phone": "+33612345678",
  "role": "client",
  "createdAt": "2026-02-01T10:30:00.000Z"
}
```

---

#### 🛍️ Products

**GET /api/products**

Obtenir tous les produits (accessible à tous les utilisateurs connectés).

**Headers :**
```
Authorization: Bearer {token}
```

**Réponse (200) :**
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Dernier modèle Apple avec puce A17...",
    "price": 1299.99,
    "stock": 15,
    "category": "Électronique",
    "mainImage": "https://example.com/iphone.jpg",
    "rating": 4.8,
    "views": 234,
    "seller": {
      "id": 2,
      "firstName": "Mohamed",
      "lastName": "Ben Ali"
    }
  }
]
```

---

**GET /api/products/my/products**

Obtenir les produits du vendeur connecté (vendeurs uniquement).

**Headers :**
```
Authorization: Bearer {token}
```

---

**GET /api/products/my/stats**

Obtenir les statistiques du vendeur connecté.

**Headers :**
```
Authorization: Bearer {token}
```

**Réponse (200) :**
```json
{
  "totalProducts": 12,
  "totalRevenue": 15999.88,
  "totalViews": 3456,
  "averageRating": 4.6
}
```

---

**POST /api/products**

Créer un nouveau produit (vendeurs uniquement).

**Headers :**
```
Authorization: Bearer {token}
```

**Body :**
```json
{
  "name": "Samsung Galaxy S24",
  "description": "Smartphone haut de gamme",
  "price": 999.99,
  "stock": 20,
  "category": "Électronique",
  "mainImage": "https://example.com/galaxy.jpg"
}
```

---

**PUT /api/products/:id**

Modifier un produit (vendeurs uniquement, leurs propres produits).

**Headers :**
```
Authorization: Bearer {token}
```

**Body :**
```json
{
  "name": "Samsung Galaxy S24 Ultra",
  "price": 1199.99,
  "stock": 18
}
```

---

**DELETE /api/products/:id**

Supprimer un produit (vendeurs uniquement, leurs propres produits).

**Headers :**
```
Authorization: Bearer {token}
```

---

### Codes de statut HTTP

| Code | Signification | Description |
|------|--------------|-------------|
| 200 | OK | Requête réussie |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Données invalides |
| 401 | Unauthorized | Non authentifié |
| 403 | Forbidden | Accès refusé |
| 404 | Not Found | Ressource introuvable |
| 409 | Conflict | Email déjà utilisé |
| 500 | Server Error | Erreur serveur |

---

## 📸 Captures d'écran

### 🏠 Landing Page
![Landing Page](https://via.placeholder.com/800x400/16213E/FFD700?text=NEXUS+Landing+Page)

*Page d'accueil avec section catégories, features et CTA*

### 🛍️ Catalogue Produits (Client)
![Catalogue](https://via.placeholder.com/800x400/16213E/61DAFB?text=Catalogue+Produits)

*Liste des produits avec recherche, filtres et pagination*

### 🛒 Panier
![Panier](https://via.placeholder.com/800x400/16213E/FF6B6B?text=Panier+d'achat)

*Gestion du panier avec quantités et total*

### 📊 Dashboard Vendeur
![Dashboard](https://via.placeholder.com/800x400/16213E/10B981?text=Dashboard+Vendeur)

*Statistiques et gestion des produits*

---

## 🚢 Déploiement

### Frontend (Vercel / Netlify)

```bash
cd Frontend
npm run build
# Le dossier dist/ contient les fichiers de production
```

**Configuration Vercel :**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Backend (Heroku / Railway / Render)

```bash
cd Backend
npm run build
# Le dossier dist/ contient les fichiers compilés
```

**Variables d'environnement en production :**
```env
DB_HOST=votre_host_mysql_production
DB_USERNAME=votre_username
DB_PASSWORD=votre_password_securise
DB_DATABASE=nexus_db
JWT_SECRET=votre_secret_jwt_production_tres_long_et_securise
PORT=3001
NODE_ENV=production
```

### Base de données (MySQL en production)

Options recommandées :
- **PlanetScale** - MySQL serverless
- **AWS RDS** - MySQL managé
- **DigitalOcean Managed Databases**

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez** le projet
2. **Créez** une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m '✨ Add some AmazingFeature'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines

- Suivez les conventions de code TypeScript
- Utilisez les emojis dans les commits (✨ feature, 🐛 bugfix, 📝 docs, etc.)
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation si nécessaire
- Assurez-vous que tous les tests passent

---

## 👨‍💻 Auteur

**Ahmed Ezzine Ailaoui**

- 🐙 GitHub: [@AhmedAilaoui](https://github.com/AhmedAilaoui)
- 💼 LinkedIn: [Ahmed ezzine Ailaoui](https://www.linkedin.com/in/ahmed-ezzine-ailaoui-a40380254/)
- 📧 Email: ahmedailaoui2002@gmail.com

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🙏 Remerciements

- [React](https://reactjs.org/) - Bibliothèque UI performante
- [NestJS](https://nestjs.com/) - Framework backend structuré
- [Vite](https://vitejs.dev/) - Build tool ultra-rapide
- [TypeORM](https://typeorm.io/) - ORM TypeScript élégant
- [Passport](http://www.passportjs.org/) - Authentification simple
- [TypeScript](https://www.typescriptlang.org/) - Typage statique

---

## 🔄 Roadmap

### ✅ Version 1.0 (Actuel)
- ✅ Authentification JWT avec rôles
- ✅ Gestion complète des produits (CRUD)
- ✅ Panier d'achat fonctionnel
- ✅ Pagination sur toutes les listes
- ✅ Dashboard vendeur avec statistiques
- ✅ Landing page avec catégories
- ✅ Design responsive complet

### 🚀 Version 1.1 (À venir)
- [ ] Système de commandes persistantes
- [ ] Historique des achats
- [ ] Notifications en temps réel
- [ ] Upload d'images de produits
- [ ] Système de favoris
- [ ] Avis et notes des produits

### 🌟 Version 1.2 (Futur)
- [ ] Paiement en ligne (Stripe)
- [ ] Système de livraison
- [ ] Chat vendeur-client
- [ ] Tableau de bord analytique avancé
- [ ] Export des données (CSV, PDF)
- [ ] Multi-langue (FR, EN, AR)
- [ ] Mode sombre/clair

### 🔮 Version 2.0 (Vision)
- [ ] Application mobile (React Native)
- [ ] IA pour recommandations de produits
- [ ] Système de cashback
- [ ] Programme de fidélité
- [ ] API publique pour développeurs

---

## ⭐ Donnez une étoile !

Si ce projet vous a aidé ou vous a plu, n'oubliez pas de lui donner une étoile sur GitHub ! ⭐

Cela aide le projet à gagner en visibilité et motive le développement de nouvelles fonctionnalités.

---

## 📊 Statistiques du projet

![GitHub stars](https://img.shields.io/github/stars/AhmedAilaoui/login-signup?style=social)
![GitHub forks](https://img.shields.io/github/forks/AhmedAilaoui/login-signup?style=social)
![GitHub issues](https://img.shields.io/github/issues/AhmedAilaoui/login-signup)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AhmedAilaoui/login-signup)

---

## 💬 Support

Besoin d'aide ? Vous pouvez :

1. 📖 Consulter la [documentation complète](#-table-des-matières)
2. 🐛 Ouvrir une [issue sur GitHub](https://github.com/AhmedAilaoui/login-signup/issues)
3. 💬 Me contacter par [email](mailto:ahmedailaoui2002@gmail.com)
4. 💼 Me contacter sur [LinkedIn](https://www.linkedin.com/in/ahmed-ezzine-ailaoui-a40380254/)

---

## 🏆 Remerciements spéciaux

Merci à tous ceux qui ont contribué à ce projet, directement ou indirectement !

---

<div align="center">

**Fait avec ❤️ par Ahmed Ezzine Ailaoui**

[⬆ Retour en haut](#-nexus---marketplace-e-commerce-full-stack)

</div>
