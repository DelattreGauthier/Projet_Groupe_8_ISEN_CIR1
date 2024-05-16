var config = {
    type: Phaser.AUTO,
    width: 484, // Augmenter la largeur de la fenêtre de jeu pour accueillir le cadre autour de la grille
    transparent:true,
    height: 484, // Augmenter la hauteur de la fenêtre de jeu pour accueillir le cadre autour de la grille
    scene: {
        preload: preload,
        create: create
    }
};

let numRows = 6;
let numCols = 6;
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
    'empty' // Valeur pour les cases vides
];


// Initialisation du jeu avec la configuration
var game = new Phaser.Game(config);
// Variable pour suivre l'état de l'animation
var isAnimating = false;
function preload() {
    for (let i = 0; i < imageFiles.length-1; i++) {
        this.load.image(imageFiles[i], imageFiles[i]);
    }
}

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    // Clearing previously created grid if any
    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    // Define the pattern
    const pattern = [
        ['E', 'E', 'D', 'E', 'E', 'E'],
        ['E', 'C', 'C', 'E', 'E', 'E'],
        ['E', 'S', 'E', 'E', 'E', 'E'],
        ['E', 'T', 'T', 'C', 'E', 'E'],
        ['E', 'C', 'C', 'S', 'E', 'E'],
        ['E', 'E', 'E', 'A', 'E', 'E']
    ];

    // Creating new grid
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let imageKey;
            let can_move;
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
                image = game.scene.scenes[0].add.sprite(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, imageKey); // Set the origin to the center of the image
                image.setOrigin(0.5); // Set the origin to the center of the image
                image.displayWidth = cellSize;
                image.displayHeight = cellSize;
                
                if (can_move){
                    image.setInteractive();
                    image.on('pointerdown', function () {
                        if (!isAnimating) {
                            isAnimating = true;
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
                // Creating a square of the same color as the background
                image = game.scene.scenes[0].add.rectangle(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize, cellSize, 0x000000, 0);
            }

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
    graphics.strokeRect(78, 78, 324, 324); // Dessiner un rectangle autour de la zone de la grille

    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics2.strokeRect(2, 2, 480, 480); // Dessiner un rectangle autour de la zone de la grille
    createGrid(numRows, numCols);
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.7)');
}
