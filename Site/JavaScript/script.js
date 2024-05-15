// Création d'une configuration pour le jeu
var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    scene: {
        preload: preload,
        create: create
    }
};

let numRows = 5;
let numCols = 5;
let cellSize = 480 / numCols;
let gridContainer;
let imageFiles = [
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png', 
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Vert.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Vert.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Vert.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Vert.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Noir.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Noir.png', 
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Noir.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Noir.png',
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

    // Creating new grid
    for (let i = 0; i < numRows; i++) {

        for (let j = 0; j < numCols; j++) {

            let imageKey = imageFiles[Math.floor(Math.random() * (imageFiles.length))]; // Choose a random image key except 'empty'
            let image;

            if (imageKey !== 'empty') {
                image = game.scene.scenes[0].add.sprite(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, imageKey); // Set the origin to the center of the image
                image.setOrigin(0.5); // Set the origin to the center of the image
                image.displayWidth = cellSize;
                image.displayHeight = cellSize;

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
            } else {
                // Creating a square of the same color as the background
                image = game.scene.scenes[0].add.rectangle(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize, cellSize, 0xFA8072);
            }
            
            gridContainer.add(image);
        }
    }
}
function changeGridSize(rows, cols) {
    createGrid(rows, cols);
}

function create() {
    createGrid(numRows, numCols);
    this.cameras.main.setBackgroundColor('#FA8072');
}

