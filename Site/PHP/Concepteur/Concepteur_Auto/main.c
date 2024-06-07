#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DROITE 0
#define GAUCHE 1

// Fonction pour afficher la grille
void afficherGrille(char** grille, int lignes, int colonnes, FILE* file) {
    for (int i = 0; i < lignes; i++) {
        for (int j = 0; j < colonnes; j++) {
            fprintf(file, "%c ", grille[i][j]);
        }
        fprintf(file, "\n");
    }
}

int main() {
    // Lecture de la taille depuis input.txt
    FILE* file;
    errno_t err;

    // Ouvrir le fichier d'entr�e en lecture
    err = fopen_s(&file, "input.txt", "r");
    if (err != 0) {
        perror("Impossible d'ouvrir le fichier d'entr�e");
        return 1;
    }
    int taille;
    fscanf_s(file, "%d", &taille);
    fclose(file);

    // Initialisation du g�n�rateur de nombres al�atoires
    srand(time(NULL));

    // Ajustement de la taille des grilles
    int lignes = taille + 2; // Taille + 2 pour les bords
    int colonnes = taille + 2; // Taille + 2 pour les bords

    // Allocation dynamique de la grille road_pattern
    int** road_pattern = (int**)malloc(lignes * sizeof(int*));
    for (int i = 0; i < lignes; i++) {
        road_pattern[i] = (int*)malloc(colonnes * sizeof(int));
    }

    // Allocation dynamique de la grille pattern
    char** pattern = (char**)malloc(lignes * sizeof(char*));
    for (int i = 0; i < lignes; i++) {
        pattern[i] = (char*)malloc(colonnes * sizeof(char));
    }

    // Remplissage de la grille road_pattern avec des z�ros
    for (int i = 0; i < lignes; i++) {
        for (int j = 0; j < colonnes; j++) {
            road_pattern[i][j] = 0;
        }
    }

    // G�n�ration de la position de d�part de la colonne
    int colonne = rand() % (colonnes - 4) + 2; // La plage de valeurs est ajust�e en fonction de la taille de la grille

    // Coordonn�es du premier et du dernier '1' plac�s
    int premier_un_x = colonne;
    int dernier_un_x;

    // Calcul du d�calage en fonction de la taille de la grille
    int decalage = (colonnes - 6) / 2; // colonnes - 6 donne la diff�rence de taille avec une grille de 6x6, puis divis� par 2

    // Calcul du pas en fonction de la taille de la grille
    int pas_min;
    int pas_max;
    if (colonnes == 12) {
        pas_min = 1;
        pas_max = 6;
    }
    else if (colonnes == 10) {
        pas_min = 1;
        pas_max = 5;
    }
    else if (colonnes == 8) {
        pas_min = 1;
        pas_max = 4;
    }
    else { // 6x6
        pas_min = 1;
        pas_max = 3;
    }

    // Boucle pour parcourir chaque ligne de la grille road_pattern
    for (int i = 1; i < lignes - 1; i++) {
        // D�terminer al�atoirement le nombre de pas (entre pas_min et pas_max)
        int pas = rand() % (pas_max - pas_min + 1) + pas_min;

        // D�terminer al�atoirement si nous allons � droite ou � gauche
        int direction = rand() % 2; // 0 pour droite, 1 pour gauche

        // Mettre � jour la position de la colonne en fonction de la direction
        if (direction == DROITE) {
            for (int j = 0; j < pas; j++) {
                road_pattern[i][colonne] = 1;
                dernier_un_x = colonne; // Mettre � jour la coordonn�e du dernier '1'
                colonne++;
                if (colonne >= colonnes - 1) {
                    colonne = colonnes - 2;
                    break;
                }
                road_pattern[i][colonne] = 1;
            }
        }
        else {
            for (int j = 0; j < pas; j++) {
                road_pattern[i][colonne] = 1;
                dernier_un_x = colonne; // Mettre � jour la coordonn�e du dernier '1'
                colonne--;
                if (colonne <= 0) {
                    colonne = 1;
                    break;
                }
                road_pattern[i][colonne] = 1;
            }
        }
    }
    dernier_un_x = colonne;

    // Placer un '1' en Y=0 et X=coordonn� du premier '1'
    road_pattern[0][premier_un_x] = 1;
    // Placer un '1' en Y=colonnes-1 et X=coordonn� du dernier '1'
    road_pattern[colonnes - 1][dernier_un_x] = 1;

    // Remplir la grille pattern avec des 'E' et 'S'
    for (int i = 0; i < lignes; i++) {
        for (int j = 0; j < colonnes; j++) {
            if (road_pattern[i][j] == 0) {
                pattern[i][j] = 'E';
            }
            else {
                pattern[i][j] = 'S';
            }
        }
    }

    // Analyser les cases S pour d�terminer leurs nouveaux �tats
    for (int i = 1; i < lignes - 1; i++) {
        for (int j = 1; j < colonnes - 1; j++) {
            if (pattern[i][j] == 'S') {
                int E_count = 0;
                int E_left = pattern[i][j - 1] == 'E'; // Case � gauche est E
                int E_right = pattern[i][j + 1] == 'E'; // Case � droite est E
                int E_up = pattern[i - 1][j] == 'E'; // Case en haut est E
                int E_down = pattern[i + 1][j] == 'E'; // Case en bas est E
                if (pattern[i - 1][j] == 'E') E_count++; // Case au-dessus
                if (pattern[i + 1][j] == 'E') E_count++; // Case en dessous
                if (pattern[i][j - 1] == 'E') E_count++; // Case � gauche
                if (pattern[i][j + 1] == 'E') E_count++; // Case � droite
                // V�rifier si les 'E' adjacents sont oppos�s ou coll�s
                if ((E_left && E_right) || (E_up && E_down)) {
                    // Laisser S
                    pattern[i][j] = 'S';
                }
                else if ((E_left && E_up) || (E_up && E_right) || (E_right && E_down) || (E_down && E_left)) {
                    // Mettre un C
                    pattern[i][j] = 'C';
                }
                else if (E_count == 1) {
                    // Mettre un T
                    pattern[i][j] = 'T';
                }
                else {
                    // Mettre un Q
                    pattern[i][j] = 'Q';
                }
            }
        }
    }

    // Placer un 'D' en Y=0 et X=coordonn� du premier '1' dans pattern
    pattern[0][premier_un_x] = 'D';
    // Placer un 'A' en Y=colonnes-1 et X=coordonn� du dernier '1' dans pattern
    pattern[colonnes - 1][dernier_un_x] = 'A';

    // Enregistrement des grilles road_pattern et pattern dans une cha�ne de caract�res
    char buffer[5000]; // Taille suffisante pour contenir les grilles
    snprintf(buffer, sizeof(buffer), "<?php\n");
    snprintf(buffer, sizeof(buffer), "%s$pattern = [\n", buffer);
    for (int i = 0; i < lignes; i++) {
        snprintf(buffer, sizeof(buffer), "%s    [", buffer);
        for (int j = 0; j < colonnes; j++) {
            snprintf(buffer, sizeof(buffer), "%s'%c'", buffer, pattern[i][j]);
            if (j < colonnes - 1) {
                snprintf(buffer, sizeof(buffer), "%s, ", buffer);
            }
        }
        snprintf(buffer, sizeof(buffer), "%s]", buffer);
        if (i < lignes - 1) {
            snprintf(buffer, sizeof(buffer), "%s,\n", buffer);
        }
    }
    snprintf(buffer, sizeof(buffer), "%s\n];\n", buffer);
    snprintf(buffer, sizeof(buffer), "%s$road_pattern = [\n", buffer);
    for (int i = 0; i < lignes; i++) {
        snprintf(buffer, sizeof(buffer), "%s    [", buffer);
        for (int j = 0; j < colonnes; j++) {
            snprintf(buffer, sizeof(buffer), "%s%d", buffer, road_pattern[i][j]);
            if (j < colonnes - 1) {
                snprintf(buffer, sizeof(buffer), "%s, ", buffer);
            }
        }
        snprintf(buffer, sizeof(buffer), "%s]", buffer);
        if (i < lignes - 1) {
            snprintf(buffer, sizeof(buffer), "%s,\n", buffer);
        }
    }
    snprintf(buffer, sizeof(buffer), "%s\n];\n", buffer);
    snprintf(buffer, sizeof(buffer), "%secho json_encode(['pattern' => $pattern, 'road_pattern' => $road_pattern]);\n", buffer);
    snprintf(buffer, sizeof(buffer), "%s?>\n", buffer);

    // Enregistrement des grilles dans le fichier index.php
    FILE* php_file;
    err = fopen_s(&php_file, "index.php", "w");
    if (php_file == NULL) {
        perror("Impossible d'ouvrir le fichier index.php");
        return 1;
    }
    fprintf(php_file, "%s", buffer);
    fclose(php_file);

    // Lib�ration de la m�moire allou�e pour la grille road_pattern
    for (int i = 0; i < lignes; i++) {
        free(road_pattern[i]);
    }
    free(road_pattern);

    // Lib�ration de la m�moire allou�e pour la grille pattern
    for (int i = 0; i < lignes; i++) {
        free(pattern[i]);
    }
    free(pattern);

    return 0;
}
