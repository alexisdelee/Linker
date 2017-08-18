# Linker

Au niveau du répertoire __example/__, ajout des fichiers `smalloc.c` et `smalloc.h` dans le projet linker.

Pour cela, lancer la commande suivante à partir de la racine avec node.js

``` shell
node linker.js
```

ou sur windows, exécuter le fichier `linker.exe`.

Il ne restera plus qu'à remplir les différents champs :  

```
Folder where the project is located example/
Name of the project linker
Type of file(s)
(*) C/C++ header
(*) C/C++ source
Name of file(s) smalloc
```

Ouvrir ensuite `example/linker.cbp` et les fichiers auront bien été ajoutés au projet.