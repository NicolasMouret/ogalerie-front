# Cahier des Charges : O’Galerie - Plateforme d'exposition artistique

---

## Présentation du Projet

O’Galerie est une plateforme en ligne dédiée aux artistes visuels, offrant ainsi un espace pour exposer et partager leurs oeuvres.
&nbsp;

Cette galerie virtuelle permet aux artistes de se créer un profil personnalisé, de télécharger des images de leurs créations, de les catégoriser selon divers styles, thèmes et médiums.
&nbsp;

Les visiteurs peuvent parcourir la galerie, filtrer les œuvres par artiste, tags, style et support, laisser des commentaires, ajouter des favoris et contacter les artistes pour des demandes d'informations, d'éventuels achats ou collaborations.

&nbsp;

--- 

## Définition des Besoins et Objectifs

### Besoins :

* Offrir un espace aux artistes pour exposer et partager leurs œuvres.
* Permettre aux visiteurs d'explorer la galerie, filtrer les œuvres et interagir avec les artistes.

### Objectifs :

* Créer une plateforme intuitive pour les artistes et les visiteurs.
* Permettre aux artistes de gérer leur profil et leurs œuvres.
* Faciliter l'exploration des œuvres pour les visiteurs.

&nbsp;

---

## Spécifications Fonctionnelles

### Fonctionnalités Clés
1. **Profils d'Artistes :**
Permettre aux artistes de créer un compte et personnaliser leur profil.

2. **Publication d'une Œuvre :**
Autoriser les artistes à ajouter des œuvres à leur page.

3. **Catégorisation et Exposition :**
Catégoriser les œuvres selon différents critères comme le style, le thème, le médium, etc.

4. **Interaction et Commentaires :**
Permettre aux visiteurs de laisser des commentaires et des appréciations sur les œuvres.

5. **Recherche Avancée :**
Offrir une fonction de recherche avancée pour filtrer les œuvres.

6. **Profil Visiteur :**
Autoriser les visiteurs à ajouter des œuvres/artistes en favoris et consulter les profils des artistes.

7. **Formulaire de contact**
Permettre aux visiteurs de rentrer en contact avec les artistes via un formulaire.

### MVP (Minimum Viable Product)
* Création des pages artistes;
* Publication et visualisation d'œuvres;
* Catégorisation basique des œuvres (tags);
* Interaction de base entre visiteurs et artistes (commentaires et favoris);
* Formulaire de contact (visiteurs -> artistes);
* Recherche basique d'œuvres (filtres).

### Évolutions Potentielles 
* Système de recommandations basé sur les préférences des utilisateurs.
* Messagerie assynchrone (messages privés)
* Statistiques sur les œuvres et les profils.
* Améliorations de l'interface utilisateur.

&nbsp;

---

## Spécifications Techniques

### Technologies Utilisées
* Front-end : React, SASS.
* Back-end : Node.js (Express), PostgreSQL.
* Stockage des images : AWS S3 

### Cible du Projet
* Public visé : Artistes visuels (hors artistes musicuax et vidéo) et amateurs d'art.

### Navigateurs Compatibles
* Dernières versions de Chrome, Firefox, Safari et Edge.

### Arborescence de l'Application
* A Définir ici (organisation des pages et des fonctionnalités).

### Routes Prévues
* On énumère ici les routes de l'application et leurs fonctionnalités associées.

&nbsp;

---

## User Stories
En tant que | Je veux | Afin de |
|--|--|--|
/*
| Artiste | créer une galerie | |
| Artiste | renommer une galerie|  |
| Artiste | renommer une galerie|  |
| Artiste | supprimer une galerie |  |
| Artiste | consulter sa messagerie |  |
| Artiste | Choisir si les images sont téléchargeables |  |
*/
| Artiste | ajouter une oeuvre | |
| Artiste | supprimer une oeuvre |  |
| Artiste | modifier une oeuvre |  |
| Artiste | taguer une oeuvre |  |
| Artiste | accepter les conditions d'utilisations | | 
| Visiteur identifié | se deconnecter |  |
| Visiteur identifié | consulter ses données personnelles |  |
| Visiteur identifié | modifier son profil et ses données personnelles |  |
| Visiteur identifié | supprimer son profil |  |
| Visiteur identifié | s'authentifier |  |
| Visiteur identifié | consulter les pages artistes |  |
| Visiteur identifié | consulter la page d'une oeuvre |
| Visiteur identifié | liker une oeuvre |  |
| Visiteur identifié | mettre une oeuvre en favoris |  |
| Visiteur identifié | commenter une oeuvre  |  |
| Visiteur identifié | contacter un artiste via un formulaire |  |
/*
| Visiteur identifié | contacter un artiste via un la messagerie |  |
*/
| Visiteur anonyme | s'inscrire en tant que visiteur |  |
| Visiteur anonyme | s'inscrire en tant qu'artiste |  |
| Visiteur anonyme | s'authentifier |  |
| Visiteur anonyme | consulter les pages artistes |
| Visiteur anonyme | consulter la page d'une oeuvre |

&nbsp;

---

## Rôles Individuels
* **Product Owner :** Aliénor BERTHINIER
* **Scrum Master :** Sostell TODA
* **Lead Dev Front-end :** Nicolas MOURET
* **Lead Dev Back-end :** Arnaud PITHON
* **Développeurs Front-end :** Nicolas MOURET, Jérôme PARNASSE, Sostell TODA, Aliénor BERTHINIER
* **Développeurs Back-end :** Arnaud PITHON
* **Référent Git :** Jérôme PARNASSE
* **Référent Technologies :** à définir
