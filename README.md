# Projet Facebook

Ce projet est une application web développée en utilisant ReactJS pour la partie front-end, PHP pour la partie back-end, et Socket.IO pour la fonctionnalité en temps réel. 

## Fonctionnalités

- Connexion et inscription des utilisateurs
- Fil d'actualités affichant les publications des utilisateurs
- Possibilité de publier des messages
- Ajouter des amis
- Afficher le profil des utilisateurs
- Possibilité de trouver des utilisateurs dans la barre de recherche
- Système de chat en temps réel utilisant Socket.IO
- Interaction avec les publications (likes, commentaires, etc.) en  temps réel
- Système de notification

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et npm installés.
3. Accédez au répertoire du projet via la ligne de commande.
4. Installez les dépendances en exécutant la commande suivante :
```bash
  npm install 
```
5. En étant à la racine du projet. Lancez l'application front-end en exécutant la commande suivante :

```bash
  npm start
```
L'application sera exécutée sur le port 3000.

6. Tout en étant a la racine du projet. Lancez le serveur Socket.IO en exécutant la commande suivante :
```bash
  cd back-end
  npm start
```
Le serveur sera exécuté sur le port 4000.

7. En restant à la racine du dossier back-end. Lancez le serveur PHP en exécutant la commande suivante :
```bash
  php -S localhost:8000
```
Le serveur PHP sera exécuté sur le port 8000.

8. Assurez-vous d'avoir une base de données MySQL configurée. Vous pouvez importer le schéma de base de données à partir du fichier `failbook.sql` fourni.

9. Assurez-vous de mettre à jour les informations de connexion à la base de données dans le fichier de configuration PHP et dans le fichier server.js

## Auteurs

- Guillaume Cazes

N'hésitez pas à me contacter si vous avez des questions ou des commentaires.

---
