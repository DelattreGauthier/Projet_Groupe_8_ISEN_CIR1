var config = {
    type: Phaser.AUTO,
    width: 484,
    transparent: true,
    height: 484,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let succes = false;
let numRows = 8;
let numCols = 8;
let cellSize = 480 / numCols;
let gridContainer;
let imageFiles = [
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre_True.png',
    '../../../Document/Image/Jeu/Dino/Dino_Rouge.png',
    '../../../Document/Image/Jeu/Dino/Dino_Rouge2.png',
    'empty' // Valeur pour les cases vides
];


var game = new Phaser.Game(config);
var isAnimating = false;
var background;
var sortieSprite;  // Référence au sprite de la case 'A'
var dinoSprite; // Référence au sprite du dino
var dinoFrame = 0;
function preload() {
    for (let i = 0; i < imageFiles.length - 1; i++) {
        this.load.image(imageFiles[i], imageFiles[i]);
    }
}

function updateBasePattern(row, col) {
    if (pattern[row][col] !== 'E') {
        base_pattern[row][col]++;
        if (base_pattern[row][col] >= 5) { // Changement ici pour permettre d'aller jusqu'à 4
            base_pattern[row][col] = 1;
        }
    }
}

function checkPatternMatch() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if(pattern[i][j]!=='Q'){
                if(pattern[i][j]==='S'){
                    if (road_pattern[i][j]%2 !== base_pattern[i][j]%2) {
                        return false;
                    }  
                }
                else if (road_pattern[i][j] !== base_pattern[i][j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    pattern = [
        ['E', 'D', 'E', 'E', 'E', 'E','E','E'],
        ['E', 'T', 'T', 'T', 'C', 'E','E','E'],
        ['E', 'S', 'C', 'Q', 'Q', 'C','E','E'],
        ['E', 'S', 'C', 'T', 'T', 'C','E','E'],
        ['E', 'T', 'T', 'S', 'S', 'E','E','E'],
        ['E', 'C', 'C', 'C', 'T', 'E','E','E'],
        ['E', 'E', 'E', 'C', 'C', 'E','E','E'],
        ['E', 'E', 'E', 'A', 'E', 'E','E','E'],
    ];
    road_pattern = [
        [0,1,0,0,0,0,0,0],
        [0,4,1,1,1,0,0,0],
        [0,2,3,1,1,1,0,0],
        [0,2,4,2,4,2,0,0],
        [0,4,2,2,2,0,0,0],
        [0,3,2,3,2,0,0,0],
        [0,0,0,4,2,0,0,0],
        [0,0,0,1,0,0,0,0],
    ];
    base_pattern = [
        [0,1,0,0,0,0,0,0],
        [0,1,1,1,1,0,0,0],
        [0,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,0,0],
        [0,1,1,1,1,0,0,0],
        [0,1,1,1,1,0,0,0],
        [0,0,0,1,1,0,0,0],
        [0,0,0,1,0,0,0,0],
    ];

    gridImages = []; // Pour stocker les références aux images affichées sur chaque case

    for (let i = 0; i < numRows; i++) {
        gridImages[i] = []; // Initialiser le tableau interne
        for (let j = 0; j < numCols; j++) {
            let imageKey;
            let can_move;
            let angle = 0; // Angle initial de l'image
            checkPatternMatch(); // Appel pour vérifier si le motif initial est correct
            switch (pattern[i][j]) {
                case 'S':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png';
                    can_move=true;
                    break;
                case 'C':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png';
                    can_move=true;
                    break;
                case 'T':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png';
                    can_move=true;
                    break;
                case 'Q':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png';
                    can_move=true;
                    break;
                case 'D':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png';
                    can_move=false;
                    break;
                case 'A':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png';
                    can_move=false;
                    break;
                case 'E':
                default:
                    imageKey = 'empty';
                    break;
            }
            let image;

            if (imageKey !== 'empty') {
                image = game.scene.scenes[0].add.sprite(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, imageKey);
                image.setOrigin(0.5);
                image.displayWidth = cellSize;
                image.displayHeight = cellSize;

                if (can_move) {
                    image.setInteractive();
                    image.on('pointerdown', function () {
                        if (!isAnimating) {
                            isAnimating = true;
                            updateBasePattern(i, j); // Déplacez ceci ici
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
                image = game.scene.scenes[0].add.rectangle(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize, cellSize, 0x000000, 0);
            }

            if (pattern[i][j] === 'A') {
                sortieSprite = image;  // Stocker la référence au sprite 'A'
            }

            gridImages[i][j] = image; // Stocker la référence à l'image dans le tableau
            gridContainer.add(image);
        }
    }
}

function changeGridSize(rows, cols) {
    createGrid(rows, cols);
}

function create() {
    // Création du cadre autour de la grille
    var graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics.strokeRect(58, 58, 364, 364); // Dessiner un rectangle autour de la zone de la grille

    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics2.strokeRect(2, 2, 480, 480); // Dessiner un rectangle autour de la zone de la grille
    createGrid(numRows, numCols);

    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.7)');

    createGrid(numRows, numCols);
}

function update() {
    if (checkPatternMatch()) {
        if (!dinoSprite) {
            // Créer le sprite du dino seulement s'il n'existe pas déjà
            dinoSprite = this.add.sprite(480 - cellSize / 2, 480 - cellSize / 2, '../../../Document/Image/Jeu/Dino/Dino_Rouge.png');
            dinoSprite.setOrigin(0.5);
            dinoSprite.displayWidth = cellSize;
            dinoSprite.displayHeight = cellSize;

            // Configurer la minuterie pour changer les images de Dino
            this.time.addEvent({
                delay: 300, // 0.3 seconde
                callback: function () {
                    dinoFrame = (dinoFrame + 1) % 2;
                    dinoSprite.setTexture(dinoFrame === 0 ? '../../../Document/Image/Jeu/Dino/Dino_Rouge.png' : '../../../Document/Image/Jeu/Dino/Dino_Rouge2.png');
                },
                loop: true
            });
        }
        background.setBackgroundColor('rgba(172, 137, 22, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre_True.png');
        }
    } else {

        background.setBackgroundColor('rgba(0, 0, 0, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png');
        }
    }
}



