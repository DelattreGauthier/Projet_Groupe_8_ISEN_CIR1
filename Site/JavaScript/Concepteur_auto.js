var config = {
    type: Phaser.AUTO,//permet de faire un jeu via Phaser
    width: 484,
    transparent: true,
    height: 600,
    scene: {//fonctions qui s'activent au lancement du jeu
        preload: preload,
        create:create
    }
};

let numRows = 6;
let numCols = 6;
//On modifie la taille de la grille en fonction de taille
switch (taille) {
    case 4:  
        numRows = 6;
        numCols = 6; 
        break;
    case 6:
        numRows = 8;
        numCols = 8; 
        break;
    case 8:
        numRows = 10;
        numCols = 10; 
        break;
    case 10:
        numRows = 12;
        numCols = 12; 
        break;
    default:
        numRows = 6;
        numCols = 6; 
        break;
}

let cellSize = 484 / numCols;
let gridContainer;
let gridImages = []; 
//Jeu phaser en fonction de config
var game = new Phaser.Game(config);
var background;
var isAnimating = false;
let imageFiles = [];
//On change les images a utilisé en fonction du paramètre couleur
switch (couleur) {
    case 'bleu':  
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
        ];
        break;
    case 'noir':
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Noir.png',
        
        ];
        break;
    case 'vert':
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Vert.png',
        ];
        break;
    case 'cuivre':
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png',
        ];
        break;
    default:
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
        ]; 
        break;
}

//On charge les images
function preload() {
    for (let i = 0; i < imageFiles.length; i++) {
        this.load.image('img_' + i, imageFiles[i]);
    }
}

//Fonction qui permet de crée une matrice en fonction d'une taille et d'un chaine de caractère
function convertToMatrix(str, rows, cols) {
    let result = [];
    let chunks = str.split(",");
    let index = 0;
    for (let i = 0; i < rows; i++) {
        result.push(chunks.slice(index, index + cols));
        index += cols;
    }
    return result;
}
//Fonction qui permet de crée une matrice d'entier en fonction d'une taille et d'un chaine de caractère
function convertToMatrix_int(int, rows, cols) {
    let result = [];
    let chunks = int.split(",").map(Number); // Convertir les chaînes en nombres
    let index = 0;
    for (let i = 0; i < rows; i++) {
        result.push(chunks.slice(index, index + cols));
        index += cols;
    }
    return result;
}

//On crée une matrice img_pattern en fonction de pattern et de taille 
let img_pattern = [];
switch (taille) {
    case 4:  
        img_pattern = convertToMatrix(pattern, 6, 6);
        break;
    case 6:
        img_pattern = convertToMatrix(pattern, 8, 8);
        break;
    case 8:
        img_pattern = convertToMatrix(pattern, 10, 10);
        break;
    case 10:
        img_pattern = convertToMatrix(pattern, 12, 12);
        break;
    default:
        img_pattern = convertToMatrix(pattern, 6, 6);
        break;
}
//On crée une matrice road_pattern en fonction de road_pattern_split et de taille 
let road_pattern = [];
switch (taille) {
    case 4:  
        road_pattern = convertToMatrix_int(road_pattern_split, 6, 6);
        break;
    case 6:
        road_pattern = convertToMatrix_int(road_pattern_split, 8, 8);
        break;
    case 8:
        road_pattern = convertToMatrix_int(road_pattern_split, 10, 10);
        break;
    case 10:
        road_pattern = convertToMatrix_int(road_pattern_split, 12, 12);
        break;
    default:
        road_pattern = convertToMatrix_int(road_pattern_split, 6, 6);
        break;
}

//Fonction qui met a jour road_pattern, mettant pour chaque case un valeur 
//entre 1 et 4 (en fonction du sens du tuyau)
function updateRoadPattern(row,col) {
    if (img_pattern[row][col] !== 'E') {
        road_pattern[row][col]++;
        if (road_pattern[row][col] >= 5) { // Changement ici pour permettre d'aller jusqu'à 4
            road_pattern[row][col] = 1;
        }
    }
}


//Fonction qui va crée la grille de jeu 
function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;
    //On supprime la grille précédente si elle existe
    if (gridContainer) gridContainer.removeAll(true);
    //On ajoute un nouveau conteneur pour la grille
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    gridImages = []; // Pour stocker les références aux images affichées sur chaque case

    for (let i = 0; i < numRows; i++) {
        gridImages[i] = []; // Initialiser le tableau interne
        for (let j = 0; j < numCols; j++) {
            let imageKey;
            let can_move;
            let angle = 0; // Angle initial de l'image
            //On fonction de la lettre dans img_pattern, on change l'image de la case
            switch (img_pattern[i][j]) {
                case 'S':
                    imageKey = 'img_2';
                    can_move=true;
                    break;
                case 'C':
                    imageKey = 'img_3';
                    can_move=true;
                    break;
                case 'T':
                    imageKey = 'img_4';
                    can_move=true;
                    break;
                case 'Q':
                    imageKey = 'img_5';
                    can_move=true;
                    break;
                case 'D':
                    imageKey = 'img_0';
                    can_move=false;
                    break;
                case 'A':
                    imageKey = 'img_1';
                    can_move=false;
                    break;
                case 'E':
                default:
                    imageKey = 'empty';
                    break;
            }
            let image;

            if (imageKey !== 'empty') {
                //On met l'image à la même taille que la case et au bonne coordonnées
                image = game.scene.scenes[0].add.sprite(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, imageKey);
                image.setOrigin(0.5);
                image.displayWidth = cellSize;
                image.displayHeight = cellSize;
                //si les images peuvent bouger, et qu'on clique dessus, elles effectuent une rotation de 90°
                if (can_move) {
                    image.setInteractive();
                    image.on('pointerdown', function () {
                        //Fait en sorte que les images ne puissent pas tourné en même temps
                        if (!isAnimating) {
                            isAnimating = true;
                            //On modifie road_pattern 
                            updateRoadPattern(i, j);
                            this.scene.tweens.add({
                                targets: this,
                                angle: this.angle + 90,
                                duration: 300,
                                ease: 'Linear',
                                repeat: 0,
                                yoyo: false,
                                onComplete: function () {
                                    isAnimating = false;
                                }
                            });
                        }
                    });
                }
            } else {
                //On met une case vide si imageKey est empty
                image = game.scene.scenes[0].add.rectangle(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize, cellSize, 0x000000, 0);
            }

            gridImages[i][j] = image; // Stocker la référence à l'image dans le tableau
            gridContainer.add(image);
        }
    }
}

//On modifie road_pattern pour mettre toutes les cases vides à 0.
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        if (road_pattern[i][j] === 8) {
            road_pattern[i][j] = 0;
        }
    }
}
//Fonction de création des éléments du jeu
function create() {
    var graphics = this.add.graphics();
    //On change les bordures intérieur de la grille en fonciton de la taille de celle-ci
    switch (taille) {
        case 4:
            graphics.lineStyle(4, 0xffffff);
            graphics.strokeRect(78, 78, 324, 324);
            break;
        case 6:
            graphics.lineStyle(4, 0xffffff); 
            graphics.strokeRect(58, 58, 364, 364); 
            break;
        case 8:
            graphics.lineStyle(4, 0xffffff); 
            graphics.strokeRect(46, 46, 388, 388);
            break;
        case 10:
            graphics.lineStyle(4, 0xffffff);
            graphics.strokeRect(38, 38, 404, 404);
            break;
        default:
            graphics.lineStyle(4, 0xffffff);
            graphics.strokeRect(78, 78, 324, 324);
            break;
    }

    //Bordures extérieur
    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff); 
    graphics2.strokeRect(2, 2, 480, 480);
    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.3)');

    //On crée la grille de jeu
    createGrid(numRows, numCols);
    // Création du bouton RESET
    resetButton = this.add.rectangle(150, 550, 100, 50, 0xff0000);
    resetButton.setOrigin(0.5);
    resetButton.setInteractive();
    resetButton.on('pointerdown', function () {
        // Redirection vers Concepteur_Auto.php 
        window.location.href = `Concepteur_Auto.php`;
    });

    // Texte du bouton RESET
    let resetText = this.add.text(150, 550, 'RESET', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
    resetText.setOrigin(0.5);

    // Création du bouton COMPLETE
    completeButton = this.add.rectangle(330, 550, 120, 50, 0x00ff00);
    completeButton.setOrigin(0.5);
    completeButton.setInteractive();
    completeButton.on('pointerdown', function () {
        //En fonction du résultat du solveur, on renvoie soit un message d'erreur,
        //soit on sauvegarde les données dans la base de données via Save_in_BD.php
        saveToFile().then(response => {
            if (response.success) {
                if (response.Checkroadcorrect) {
                    window.location.href = "../Save_in_BD.php?color=" + couleur + "&taille=" + taille + "&pattern=" + img_pattern + "&road_pattern=" + road_pattern;
                } else {
                    alert("Error : You did not turn correctly or you placed the pipes incorrectly in the previous step, if this is the case click on RESET");
                }
            } else {
                alert("Error: " + response.message);
            }
        });
    });

    // Texte du bouton COMPLETE
    let completeText = this.add.text(330, 550, 'COMPLETE', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
    completeText.setOrigin(0.5);
}

//Fonction qui enregistre road_pattern img_pattern et taille en string pour les 
//utiliser ensuite dans le solveur
function saveToFile() {
    //Convertie les matrices en string 
    let roadPatternStr = '';
    for (let i = 0; i < road_pattern.length; i++) {
        for (let j = 0; j < road_pattern[i].length; j++) {
            roadPatternStr += road_pattern[i][j];
        }
        roadPatternStr += '\n';
    }

    let imgPatternStr = '';
    for (let i = 0; i < img_pattern.length; i++) {
        for (let j = 0; j < img_pattern[i].length; j++) {
            imgPatternStr += img_pattern[i][j];
        }
        imgPatternStr += '\n'; 
    }

    //Chaine de caractères contenant tout les éléments nécessaire au fonctionnement du solveur
    let content = (taille+2) + '\n' + roadPatternStr + imgPatternStr;
    //On envoie content dans save_file_auto.php qui exécutera le solveur
    return fetch('save_file_auto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'content=' + encodeURIComponent(content)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error saving file:', error);
        return { success: false, message: 'Error saving file.' };
    });
}