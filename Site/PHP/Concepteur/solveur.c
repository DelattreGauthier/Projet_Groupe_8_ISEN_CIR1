#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h> 

typedef struct {
    bool top;
    bool right;
    bool left;
    bool bottom;
} Case;

Case init_case(char letter) {
    Case c;
    switch (letter) {
    case 'E':
        c.top = false;
        c.right = false;
        c.left = false;
        c.bottom = false;
        break;
    case 'T':
        c.top = false;
        c.right = true;
        c.left = true;
        c.bottom = true;
        break;
    case 'S':
        c.top = false;
        c.right = true;
        c.left = true;
        c.bottom = false;
        break;
    case 'C':
        c.top = false;
        c.right = false;
        c.left = true;
        c.bottom = true;
        break;
    case 'Q':
        c.top = true;
        c.right = true;
        c.left = true;
        c.bottom = true;
        break;
    case 'D':
        c.top = false;
        c.right = false;
        c.left = false;
        c.bottom = true;
        break;
    case 'A':
        c.top = true;
        c.right = false;
        c.left = false;
        c.bottom = false;
        break;
    default:
        c.top = false;
        c.right = false;
        c.left = false;
        c.bottom = false;
        break;
    }
    return c;
}

void rotate_case(Case* c, int rotation) {
    rotation = (rotation - 1) % 4;
    for (int i = 0; i < rotation; i++) {
        bool temp = c->top;
        c->top = c->left;
        c->left = c->bottom;
        c->bottom = c->right;
        c->right = temp;
    }
}

bool check_sides(Case* current, Case* neighbor, char side) {
    switch (side) {
    case 'T':
        return current->top == neighbor->bottom;
    case 'R':
        return current->right == neighbor->left;
    case 'L':
        return current->left == neighbor->right;
    case 'B':
        return current->bottom == neighbor->top;
    default:
        return false;
    }
}

int main() {
    FILE* fptr;
    int taille;
    char temp[1000];

    errno_t err = fopen_s(&fptr, "input.txt", "r");
    if (err != 0) {
        printf("Impossible d'ouvrir le fichier input.txt.\n");
        return 1;
    }

    fscanf_s(fptr, "%d", &taille);
    if (taille != 6 && taille != 8 && taille != 10 && taille != 12) {
        printf("Taille invalide. La taille doit être 6, 8, 10 ou 12.\n");
        fclose(fptr);
        return 1;
    }
    printf("Taille : %d\n", taille);

    int** road_pattern = (int**)malloc((taille + 2) * sizeof(int*));
    for (int i = 0; i < taille + 2; i++) {
        road_pattern[i] = (int*)malloc((taille + 2) * sizeof(int));
    }

    Case*** pattern = (Case***)malloc((taille + 2) * sizeof(Case**));
    for (int i = 0; i < taille + 2; i++) {
        pattern[i] = (Case**)malloc((taille + 2) * sizeof(Case*));
        for (int j = 0; j < taille + 2; j++) {
            pattern[i][j] = (Case*)malloc(sizeof(Case));
            pattern[i][j][0] = init_case('E');
        }
    }

    for (int i = 1; i < taille + 1; i++) {
        fscanf_s(fptr, "%s", temp, sizeof(temp));
        for (int j = 1; j < taille + 1; j++) {
            road_pattern[i][j] = temp[j - 1] - '0';
        }
    }

    for (int i = 1; i < taille + 1; i++) {
        fscanf_s(fptr, "%s", temp, sizeof(temp));
        for (int j = 1; j < taille + 1; j++) {
            pattern[i][j][0] = init_case(temp[j - 1]);
        }
    }

    fclose(fptr);

    for (int i = 1; i < taille + 1; i++) {
        for (int j = 1; j < taille + 1; j++) {
            int rotation = road_pattern[i][j];
            rotate_case(&pattern[i][j][0], rotation);
        }
    }

    bool valid = true;
    for (int i = 1; i < taille + 1; i++) {
        for (int j = 1; j < taille + 1; j++) {
            Case* current = &pattern[i][j][0];
            Case* top = &pattern[i - 1][j][0];
            Case* right = &pattern[i][j + 1][0];
            Case* left = &pattern[i][j - 1][0];
            Case* bottom = &pattern[i + 1][j][0];

            if (!check_sides(current, top, 'T') || !check_sides(current, right, 'R') ||
                !check_sides(current, left, 'L') || !check_sides(current, bottom, 'B')) {
                printf("Error at position (%d, %d): Sides do not match.\n", i, j);
                valid = false;
            }
        }
    }

    if (valid) {
        printf("CORRECT\n");
    }
    else {
        printf("ERROR\n");
    }

    // Écriture dans le fichier output.php
    FILE* out_ptr;
    err = fopen_s(&out_ptr, "output.php", "w");
    if (err != 0) {
        printf("Impossible d'ouvrir le fichier output.php.\n");
        return 1;
    }

    fprintf(out_ptr, "<?php\n");
    if (valid) {
        fprintf(out_ptr, "$Checkroadcorrect = true;\n");
    }
    else {
        fprintf(out_ptr, "$Checkroadcorrect = false;\n");
    }
    fprintf(out_ptr, "?>\n");

    fclose(out_ptr);

    for (int i = 0; i < taille + 2; i++) {
        free(road_pattern[i]);
    }
    free(road_pattern);

    for (int i = 0; i < taille + 2; i++) {
        for (int j = 0; j < taille + 2; j++) {
            free(pattern[i][j]);
        }

        free(pattern[i]);
    }
    free(pattern);
    return 0;
}

