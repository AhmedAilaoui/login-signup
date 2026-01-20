# 🚀 Login & Signup - Full-Stack Web Application

Application web moderne de gestion d'authentification construite avec React.js, NestJS et MySQL.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
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
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Contribuer](#-contribuer)
- [Auteur](#-auteur)
- [Licence](#-licence)

---

## 🎯 Aperçu

**Login & Signup** est une application web full-stack moderne offrant :
- ✨ Interface utilisateur élégante et responsive
- 🔐 Système d'authentification sécurisé avec JWT
- 📱 Design adaptatif (mobile, tablette, desktop)
- ⚡ Performance optimale avec Vite
- 🛡️ Protection des routes et validation des données

**Cas d'usage :**
- Système d'inscription et de connexion utilisateur
- Gestion de profils utilisateurs
- Template de base pour des applications nécessitant une authentification

---

## ✨ Fonctionnalités

### Frontend (Interface Utilisateur)

- ✅ **Landing Page** - Page d'accueil avec présentation des fonctionnalités
- ✅ **Page de Connexion** - Formulaire de login avec validation
- ✅ **Page d'Inscription** - Processus d'inscription en 2 étapes
- ✅ **Design Responsive** - Compatible mobile, tablette et desktop
- ✅ **Animations fluides** - Transitions et effets visuels
- ✅ **Validation formulaires** - Vérification côté client en temps réel

### Backend (API)

- ✅ **Authentification JWT** - Tokens sécurisés avec expiration
- ✅ **Hachage de mots de passe** - Bcrypt avec salt rounds
- ✅ **Validation des données** - class-validator pour la sécurité
- ✅ **Routes protégées** - Guards pour les endpoints sécurisés
- ✅ **Gestion des erreurs** - Messages d'erreur clairs et cohérents
- ✅ **Base de données MySQL** - Stockage persistant avec TypeORM

---

## 🛠️ Technologies

### Frontend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **React** | 18.3.1 | Bibliothèque UI |
| **Vite** | 5.0.11 | Build tool & dev server |
| **React Router DOM** | 6.21.1 | Navigation et routing |
| **Axios** | 1.6.5 | Requêtes HTTP |
| **CSS3** | - | Styling et animations |

### Backend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| **NestJS** | 10.3.0 | Framework Node.js |
| **TypeORM** | 0.3.19 | ORM pour MySQL |
| **MySQL** | 8.0+ | Base de données |
| **Passport JWT** | 10.2.0 | Authentification |
| **bcryptjs** | 2.4.3 | Hachage des mots de passe |
| **class-validator** | 0.14.0 | Validation des DTOs |

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
git clone https://github.com/votre-username/login-signup-app.git
cd login-signup-app
```

### 2️⃣ Installer le Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

**Modifiez le fichier `.env` avec vos informations :**

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_DATABASE=nexus_db

JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi
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

### 4️⃣ Installer le Frontend

```bash
# Retourner au dossier racine
cd ..

# Aller dans le dossier frontend
cd frontend

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
JWT_SECRET=une_cle_secrete_tres_longue_et_aleatoire_123456

# Port du serveur
PORT=3001
```

**⚠️ Important :**
- Changez `JWT_SECRET` par une clé aléatoire sécurisée
- Ne commitez JAMAIS le fichier `.env` sur Git
- Utilisez des mots de passe forts en production

### Frontend (vite.config.js)

Le proxy API est déjà configuré dans `vite.config.js` :

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true
    }
  }
}
```

---

## 💻 Utilisation

### Démarrer l'application

**Terminal 1 - Backend :**
```bash
cd backend
npm run start:dev
```

Le backend sera accessible sur **http://localhost:3001**

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur **http://localhost:3000**

### Accéder à l'application

Ouvrez votre navigateur et allez sur :
```
http://localhost:3000
```

### Tester l'authentification

1. **Page d'accueil** - Cliquez sur "S'inscrire"
2. **Inscription** - Remplissez le formulaire d'inscription
3. **Connexion** - Utilisez vos identifiants pour vous connecter
4. **Profil** - Accédez à votre profil utilisateur

---

## 📁 Structure du projet

```
login-signup-app/
│
├── frontend/                      # Application React
│   ├── public/                    # Fichiers statiques
│   ├── src/
│   │   ├── pages/                 # Pages de l'application
│   │   │   ├── LandingPage.jsx    # Page d'accueil
│   │   │   ├── LandingPage.css
│   │   │   ├── LoginPage.jsx      # Page de connexion
│   │   │   ├── LoginPage.css
│   │   │   ├── SubscribePage.jsx  # Page d'inscription
│   │   │   └── SubscribePage.css
│   │   ├── styles/
│   │   │   └── global.css         # Styles globaux
│   │   ├── App.jsx                # Composant racine
│   │   └── main.jsx               # Point d'entrée
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                       # API NestJS
│   ├── src/
│   │   ├── auth/                  # Module d'authentification
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── login.dto.ts
│   │   │   ├── guards/            # Guards de sécurité
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── local-auth.guard.ts
│   │   │   ├── strategies/        # Stratégies Passport
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/                 # Module utilisateurs
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts # Entité User
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── app.module.ts          # Module racine
│   │   └── main.ts                # Point d'entrée
│   ├── .env.example               # Template des variables d'environnement
│   ├── package.json
│   └── tsconfig.json
│
├── database/                      # Scripts de base de données
│   └── init.sql                   # Script d'initialisation
│
├── .gitignore
└── README.md
```

---

## 🔌 API Documentation

### Endpoints disponibles

#### Authentication

**POST /api/auth/register**

Créer un nouveau compte utilisateur.

**Body :**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+33612345678"
}
```

**Réponse (200) :**
```json
{
  "success": true,
  "message": "Compte créé avec succès",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+33612345678"
  }
}
```

---

**POST /api/auth/login**

Se connecter et obtenir un token JWT.

**Body :**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Réponse (200) :**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

---

#### Users

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
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+33612345678",
  "createdAt": "2026-01-18T10:30:00.000Z",
  "updatedAt": "2026-01-18T10:30:00.000Z"
}
```

### Codes de statut HTTP

| Code | Signification | Description |
|------|--------------|-------------|
| 200 | OK | Requête réussie |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Données invalides |
| 401 | Unauthorized | Non authentifié |
| 409 | Conflict | Email déjà utilisé |
| 500 | Server Error | Erreur serveur |

---

## 🧪 Tests

### Tester le Backend avec Postman

Une collection Postman est disponible :

```bash
# Les fichiers de collection sont fournis
NEXUS-API-COMPLETE.postman_collection.json
NEXUS-Development.postman_environment.json
```

**Importer dans Postman :**
1. Ouvrez Postman
2. Cliquez sur "Import"
3. Sélectionnez les deux fichiers JSON
4. Sélectionnez l'environnement "NEXUS Development"

### Tests manuels

**Inscription :**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Connexion :**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🚢 Déploiement

### Frontend (Vercel / Netlify)

```bash
cd frontend
npm run build
# Le dossier dist/ contient les fichiers de production
```

### Backend (Heroku / Railway)

```bash
cd backend
npm run build
# Le dossier dist/ contient les fichiers compilés
```

### Variables d'environnement en production

**⚠️ Important :**
- Changez `JWT_SECRET` par une clé sécurisée
- Utilisez des identifiants de base de données sécurisés
- Activez HTTPS
- Configurez CORS correctement

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez** le projet
2. **Créez** une branche pour votre feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines

- Suivez les conventions de code existantes
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation si nécessaire
- Assurez-vous que tous les tests passent

---

## 👨‍💻 Auteur

**Votre Nom**

- GitHub: [@AhmedAilaoui](https://github.com/AhmedAilaoui)
- LinkedIn: [Ahmed ezzine Ailaoui](https://www.linkedin.com/in/ahmed-ezzine-ailaoui-a40380254/)
- Email: ahmedailaoui2002@gmail.com

---



## 🙏 Remerciements

- [React](https://reactjs.org/) - Bibliothèque UI
- [NestJS](https://nestjs.com/) - Framework backend
- [Vite](https://vitejs.dev/) - Build tool ultra-rapide
- [TypeORM](https://typeorm.io/) - ORM pour TypeScript
- [Passport](http://www.passportjs.org/) - Authentification

---

## 🔄 Roadmap

### Version 1.1 (À venir)
- [ ] Reset de mot de passe par email
- [ ] Authentification à deux facteurs (2FA)
- [ ] Connexion via réseaux sociaux (Google, Facebook)
- [ ] Dashboard utilisateur

### Version 1.2
- [ ] Système de rôles et permissions
- [ ] Upload de photo de profil
- [ ] Historique des connexions
- [ ] Tests unitaires et e2e

---

## ⭐ Donnez une étoile !

Si ce projet vous a aidé, n'oubliez pas de lui donner une étoile sur GitHub ! ⭐

---



[⬆ Retour en haut](#-login--signup---full-stack-web-application)

</div>
