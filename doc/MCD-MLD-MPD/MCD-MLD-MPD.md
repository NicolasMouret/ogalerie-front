```python
%reload_ext mocodo
```

## MCD


```python
%%mocodo --colors brewer+3

:
caractériser, 0N oeuvre, 0N tag
tag: _label, categorie

:
:
:

commentaire: _date, contenu
commenter, 11 commentaire, 0N oeuvre
oeuvre: _nom, url, date de création, description, mature
classer, 11 oeuvre, 0N collection
:
collection: _nom

:

:
réguler, 0N commentaire, 0N oeuvre, 11 modération
liker, 0N personne, 0N oeuvre
favori, 0N personne, 0N oeuvre
uploader, 0N personne, 11 oeuvre
:


modération: _label, message
:
:


:
initier, 0N personne, 11 modération
personne: _prénom, nom, pseudo, courriel, mot de passe, date de naissance, ville, pays, biographie, avatar, situation
:
:
créer, 0N personne, 11 collection

écrire, 0N personne, 11 commentaire
:
:
:
:
:
```


    
![svg](output_2_0.svg)
    


## MLD

- tag (<u>codeTag</u>, label, categorie)
- caractériser (#codeTag, #codeOeuvre)
- oeuvre (<u>codeOeuvre</u>, nom, url, date, description, mature, #codeCollection, #codeAuteur)
- commentaire (<u>codeCommentaire</u>, date, contenu, #codeOeuvre, #codeAuteur)
- collection (<u>codeCollection</u>, nom, #codeAuteur)
- modération (<u>codeModération</u>, label, message, #codeAuteur, #codeOeuvre, #codeCommentaire)
- like (#codeOeuvre, #codeAuteur)
- favori (#codeOeuvre, #codePersonne)
- personne (<u>codePersonne</u>, prénom, nom, pseudo, courriel, mot de passe, date de naissance, ville, pays, biographie, avatar, situation

## MPD

- tag: <u>id(INT)</u>, name(text), category(enum)
- mark: #tag_id(int), #oeuvre_id(int)
- artwork: <u>id(int)</u>, title(text), uri(text), date(timestamptz), description(text), mature(boolean), #collection_id(int), #person_id(int)
- art_comment: <u>id(int)</u>, date(timestamptz), content(text), #artwork_id(int), #person_id(int)
- collection: <u>id(int)</u>, title(text), #person_id(int)
- moderate: <u>id(int)</u>, ticket(enum), message(text), #person_id(int), #artwork_id(int), #comment_id(int)
- appraise: #oeuvre_id(int), #person_id(int)
- favorite: #oeuvre_id(int), #person_id(int)
- person: <u>id(int)</u>, firstname(text), lastname(text), nickname(text), email(text), hash(text), birthday(date), town(text), country(text), biography, avatar(text), situation(enum)


### types

- name (tag) : aquarelle, photo, gravure, papier, …
- category (tag) : type, support, style
- ticket (moderate) : alert, hide
- situation (person) : user, creator, admin

## Dictionnaire de données

### table *tag*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| id | int | generated always as identity primary key | identifiant du tag |
| name | enum | not null | nom du tag : liste à définir |
| category | enum | unique not null | catégorie du tag : type, support, style |

### table d'association *mark* entre les table *tag* et *artwork*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| tag_id | int | references tag(id) | identifiant du tag |
| artwork_id | int | references artwork(id) | identifiant de l'artwork |

### table *artwork*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| id | int | generated always as identity primary key | identifiant de l'artwork |
| title | text | not null | titre de l'œuvre |
| uri | text | unique not null | url d'accés à l'œuvre |
| date | date | | date de création de l'œuvre |
| description | text | not null | description accompagnant l'œuvre |
| mature | boolean |  | l'œuvre vise-t-elle un public mature .
| collection_id | int | references collection(id) | identifiant d'une collection |
| person_id | int | references person(id) | identifiant de l'auteur de l'œuvre |

### table *art_comment*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| id | int | generated always as identity primary key | identifiant du commentaire |
| content | text | not null | contenu du commentaire |
| artwork_id | int | references artwork(id) | identifiant de l'œuvre |
| person_id | int | references person(id) | identifiant de l'auteur du commentaire |
| created_at | timestamptz | not null default now() | date d'écriture du commentaire |
| updated_at | timestamptz | | date de modification du commentaire |

### table *collection*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| id | int | generated always as identity primary key | identifiant de la collection |
| title | text | not null | titre de la collection |
| person_id | int | references person(id) | identifiant du propriétaire de la collection |

### table *moderate*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| id | int | generated always as identity primary key | identifiant de la modération |
| ticket | enum | not null | type de modération : alert, hide |
| message | text | not null | message justifiant l'action |
| person_id | int | references person(id) | identifiant de l'auteur de la modération |
| artwork_id | int | references artwork(id) | identifiant de l'oeuvre concernée |
| comment_id | int | references comment(id) | identifiant du commentaire concerné |

### table d'association *appraise* entre les tables *artwork* et *person*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| artwork_id | int | references artwork(id) | identifiant de l'œuvre |
| person_id | int | references person(id) | identifiant de l'auteur du like |

### table d'association *favorite* entre les tables *artwork* et *person*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| artwork_id | int | references artwork(id) | identifiant de l'œuvre |
| person_id | int | references person(id) | identifiant du propriétaire de la liste de favoris |


### table *person*

| Champ| Type| Spécifités| Description|
|---|---|---|---|
| id | int | generated always as identity primary key | identifiant de la person |
| firstname | text |  | prénom |
| lastname | text |  | nom de famille |
| nickname | text | unique not null | pseudonyme / nom affiché |
| email | text | unique not null | addresse de contact et identifiant de connexion |
| hash | text | not null | hash du mot de passe |
| birthday | date | not null | date de naissance pour déterminer la majorité ou non |
| town | text | | ville |
| country | text | | pays |
| avatar | text |  | URL où récupérer une image d'avatar, en cas d'absence une version automatique sera créée |
| biography | text |  | courte biographie |
| situation | enum | not null | situation sur le site : user, creator, moderator |



```python

```
