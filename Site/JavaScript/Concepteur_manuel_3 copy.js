var config = {
    type: Phaser.AUTO,
    width: 484,
    transparent: true,
    height: 484,
    scene: {
        create: create
    }
};

let numRows = 6;
let numCols = 6;
let cellSize = 480 / numCols;
let gridContainer;
let gridImages = []; // Ajout d'une variable pour stocker les références des cellules
var game = new Phaser.Game(config);
var isAnimating = false;
var background;
let pattern = [
    ['E', 'D', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'A', 'E', 'E', 'E', 'E'],
];
let road_pattern = [
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
];

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    var graphics = game.scene.scenes[0].add.graphics();
    
    // Remplir les cellules avec la couleur grise
    graphics.fillStyle(0x566573);
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let x = j * cellSize;
            let y = i * cellSize;
            if (road_pattern[i][j] === 8) {
                graphics.fillRect(x, y, cellSize, cellSize); // Remplir la cellule avec la couleur grise
            }
        }
    }

    // Dessiner les lignes blanches
    graphics.lineStyle(4, 0xffffff); // Définir le style de ligne à blanc
    // Dessiner les lignes verticales
    for (let i = 0; i < numCols; i++) {
        let x = (i * cellSize) + 2; // Décalage vers la droite de la moitié de l'épaisseur de la ligne
        graphics.lineBetween(x, 0, x, 480);
    }

    // Dessiner les lignes horizontales
    for (let i = 0; i < numRows; i++) {
        let y = (i * cellSize) + 2; // Décalage vers le bas de la moitié de l'épaisseur de la ligne
        graphics.lineBetween(0, y, 480, y);
    }

}



function changeGridSize(rows, cols) {
    createGrid(rows, cols);
}

function create() {
    var graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff);
    graphics.strokeRect(78, 78, 324, 324);

    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff);
    graphics2.strokeRect(2, 2, 480, 480);

    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.3)');

    createGrid(numRows, numCols);
}
