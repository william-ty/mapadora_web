# Acrobatt Web

### Outils de développement utilisés
- Visual Studio (IDE)
- Navigateur Web

### Setup
- Installer Node.js.
- Cloner le repo Gitlab.
- Lancer `npm install` à la racine du projet.
- Lancer `npm start` à la racine du projet.

###### Vous êtes prêts à vous lancer !

### Organisation du projet 

#### Arborescence

Informations principales :

- Le fichier `/src/api/api.ts` référence les fonctions d'appel à l'API, génériques pour certaines (CRUD).
  Il est possible d'ajouter des fonctions de fetch à l'API dans ce fichier. (penser à ajouter le type pour Typescript)
- Le dossier `/src/components/` contient les composants React, eventuellement groupés par dossiers.
- Le dossier `/src/i18n/` comporte les fichiers de contenus textuels de l'application, triés par langues. 
- Le dossier `/src/model/` contient les entités, qui reflètent celles les données renvoyées par l'API. 
- Le dossier `/src/provider/` regroupe les déclarations des 'data providers' utilisés au sein de l'application.
(ex: authentification). 
- Le dossier `/src/theme/` reférence les modifications faites au thème Material UI et les variables facilement éditables pour changer l'identité graphique du site.
- Le fichier `/app.tsx/` est le composant de plus haut niveau, dans lequel est regroupé la logique globale de l'application.
On y retrouve notamment l'ensemble des routes définies renvoyant aux composants adaptés.
Il sert de conteneur pour le reste de l'application.
