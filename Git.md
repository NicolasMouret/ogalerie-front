## Quelque commande Git utile:

# Git Add :

Cette commande met à jour l’index en utilisant le contenu actuel trouvé dans l’arbre de travail, pour préparer le contenu de la prochaine validation. Typiquement, elle ajoute intégralement le contenu actuel des chemins existants, mais peut aussi n’ajouter que certaines parties des modifications au moyen d’options ou soustraire certains chemins qui n’existent plus dans l’arbre de travail.


# Git Status :

Montre les chemins qui ont des différences entre le fichier d’index et le commit HEAD actuel, les chemins qui ont des différences entre l’arbre de travail et de fichier d’index, et les chemins dans l’arbre de travail qui ne sont pas suivis par Git (et qui ne sont pas ignorés par gitignore[5]). Les premiers sont ce que vous valideriez en lançant git commit ; les seconds et les troisièmes sont ce que vous pourriez valider en lançant git add avant de lancer git commit.

# Git Commit :

Crée un nouveau commit contenant le contenu actuel de l’index et avec le message de validation décrivant la modification. Le nouveau commit est un fils direct de HEAD, habituellement au sommet de la branche actuelle et la branche est mise à jour pour pointer dessus (à moins qu’aucune branche ne soit associée avec l’arbre de travail actuel, auquel cas HEAD est « détachée » comme décrit dans git-checkout).

Le contenu à valider peut être spécifié de différentes manières :

en utilisant git-add pour « ajouter » de manière incrémentale des modifications à l’index avant d’utiliser la commande commit (Note : les fichiers doivent être « ajoutés » pour faire partie du commit, même s’ils ont été modifiés);

en utilisant git-rm pour supprimer des fichiers de l’arbre de travail et de l’index, encore une fois avant d’utiliser la commande commit;

en listant les fichiers comme arguments de la commande commit (sans les options --interactive ou --patch), auquel cas la validation ignorera les modifications indexées et enregistrera plutôt le contenu actuel des fichiers listés (qui doivent être déjà connus de Git);

en utilisant l’option -a avec la commande commit pour « ajouter » automatiquement les modifications de tous les fichiers connus (c’est-à-dire les fichiers déjà listés dans l’index) et supprimer (rm) automatiquement les fichiers de l’index qui ont été supprimés dans l’arbre de travail, puis d’effectuer la validation ;

en utilisant les options --interactive ou --patch avec la commande commit pour choisir quels fichiers ou sections de fichier doivent être inclus dans le commit en plus de l’index, avant finalisation de l’opération. Référez-vous à la section « Mode interactif » de git-add pour la description de ces modes.

L’option --dry-run peut être utilisée pour obtenir un résumé de ce qui sera inclus par une des commandes ci-dessus pour la prochaine validation en fournissant le même jeu de paramètres (options et chemins).

Si vous validez et trouvez une erreur immédiatement après, vous pouvez annuler la validation avec git reset.

# Git Restore :

Restaurer les chemins spécifiés dans l’arbre de travail avec certains contenus d’une source de restauration. Si un chemin est suivi mais n’existe pas dans la source de restauration, il sera supprimé pour correspondre à la source.

La commande peut aussi être utilisée pour restaurer le contenu de l’index avec --staged, ou restaurer à la fois l’arbre de travail et l’index avec --staged --worktree.

Par défaut, si --staged est donné, le contenu est restauré depuis HEAD, sinon depuis l’index. Utilisez --source pour restaurer à partir d’un commit différent.

Voir « Reset, restore et revert » dans git pour les différences entre les trois commandes.

CETTE COMMANDE EST EXPÉRIMENTALE. LE COMPORTEMENT PEUT CHANGER.

# Git Push :

Met à jour les références distantes ainsi que les objets associés.

La commande git push prend deux arguments :

Un nom de dépôt distant, par exemple origin
Un nom de branche, par exemple main

- git push REMOTE-NAME BRANCH-NAME;


Renommage des branches
Pour renommer une branche, vous utilisez la même commande git push, mais vous ajoutez un autre argument : le nom de la nouvelle branche. Par exemple :

git push REMOTE-NAME LOCAL-BRANCH-NAME:REMOTE-BRANCH-NAME

Cela pousse LOCAL-BRANCH-NAME vers votre REMOTE-NAME, mais il est renommé en REMOTE-BRANCH-NAME.


Lorsque vous clonez un dépôt que vous possédez, vous lui fournissez une URL distante qui indique à Git où extraire et pousser des mises à jour. Si vous souhaitez collaborer avec le dépôt d’origine, vous ajoutez une nouvelle URL distante, généralement appelée upstream, à votre clone Git local :

git remote add upstream THEIR_REMOTE_URL
Vous pouvez maintenant extraire des mises à jour et des branches à partir de leur duplication :

Exemple : 

git fetch upstream
Grab the upstream remote's branches
> remote: Counting objects: 75, done.
> remote: Compressing objects: 100% (53/53), done.
> remote: Total 62 (delta 27), reused 44 (delta 9)
> Unpacking objects: 100% (62/62), done.
> From https://github.com/OCTOCAT/REPO
>  * [new branch]      main     -> upstream/main



# Git Stash :

Utilisez git stash lorsque vous voulez enregistrer l’état actuel du répertoire de travail et de l’index, mais que vous voulez revenir à un répertoire de travail propre. La commande enregistre vos modifications locales et rétablit le répertoire de travail pour qu’il corresponde au commit HEAD.

Les modifications remisées par cette commande peuvent être listées avec git stash list, inspectées avec git stash show, et restaurées (potentiellement au dessus d’un commit différent) avec git stash apply.


# git Merge :

Intègre les modifications des commits nommés (depuis le moment où leur historique a divergé de la branche actuelle) dans la branche actuelle. Cette commande est utilisée par git pull pour incorporer les modifications d’un autre dépôt et peut être utilisée à la main pour fusionner les modifications d’une branche dans une autre.

Avant d’appliquer des modifications extérieures, vous devez faire en sorte que votre propre travail soit en bon état et validé localement, afin qu’il ne soit pas écrasé en cas de conflits. Voir aussi git-stash[1]. git pull et git merge s’arrêteront sans rien faire lorsque des modifications locales non validées chevaucheront des fichiers que git pull/git merge devront mettre à jour.

Si vous avez essayé une fusion qui a donné lieu à des conflits complexes et que vous voulez recommencer, vous pouvez vous remettre à zéro avec *git merge --abort*.

# Git Checkout : 

Bascule sur une autre branche ou restaure des fichiers de l’arbre de travail.

# Git Branch :

Liste, crée, ou supprime des branches.

# Git Pull : 

Rapatrier et intégrer un autre dépôt ou une branche locale. 

# Git Push : 

Intègre les modifications d’un dépôt distant dans la branche actuelle. Dans son mode par défaut, git pull est l’abréviation de git fetch suivi de git merge FETCH_HEAD.


**Voir Doc https://git-scm.com/docs**



