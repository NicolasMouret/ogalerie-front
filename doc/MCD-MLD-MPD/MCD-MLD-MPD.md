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
oeuvre: _nom, url, support, date de création, description
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
personne: _prénom, nom, pseudo, courriel, date de naissance, ville, pays, avatar, role
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
- oeuvre (<u>codeOeuvre</u>, nom, url, support, date, description, #codeCollection, #codeAuteur)
- commentaire (<u>codeCommentaire</u>, date, contenu, #codeOeuvre, #codeAuteur)
- collection (<u>codeCollection</u>, nom, #codeAuteur)
- modération (<u>codeModération</u>, label, message, #codeAuteur, #codeOeuvre, #codeCommentaire)
- like (#codeOeuvre, #codeAuteur)
- favori (#codeOeuvre, #codePersonne)
- personne (<u>codePersonne</u>, prénom, nom, pseudo, courriel, date de naissance, ville, pays, avatar, role

## MPD

- tag: <u>id(INT)</u>, label(text), category(enum)
- mark: #tag_id(int), #oeuvre_id(int)
- artwork: <u>id(int)</u>, label(text), uri(text), support(text), date(timestampz), description(text), #collection_id(int), #person_id(int)
- comment: <u>id(int)</u>, date(timestampz), content(text), #artwork_id(int), #person_id(int)
- collection: <u>id(int)</u>, label(text), #person_id(int)
- moderate: <u>id(int)</u>, label(text), message(text), #person_id(int), #oeuvre_id(int), #comment_id(int)
- like: #oeuvre_id(int), #person_id(int)
- favorite: #oeuvre_id(int), #person_id(int)
- personne: <u>id(int)</u>, firstname(text), lastname(text), nickname(text), email(text), birthday(date), town(text), country(text), avatar(tex), role(enum)


### types

- label (tag) : aquarelle, photo, gravure, papier, …
- category (tag) : type, support, style
- label (moderate) : signalement, moderation
- role (person) : utilisateur, createur, admin


```python

```
