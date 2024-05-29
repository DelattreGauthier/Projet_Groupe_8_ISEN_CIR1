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

let cellSize = 484 / numCols;
let gridContainer;
let gridImages = []; // Ajout d'une variable pour stocker les références des cellules
var game = new Phaser.Game(config);
var isAnimating1 = false;
var isAnimating2 = false;
var background;

let road_pattern = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

console.log(pattern);
let topRowSelected = false;
let bottomRowSelected = false;

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    var graphics = game.scene.scenes[0].add.graphics();
    


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
function drawPattern(pattern) {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let x = col * cellSize + cellSize / 2;
            let y = row * cellSize + cellSize / 2;

            let color;

            switch (pattern[row][col]) {
                case 0: // Correspond à la couleur bleue
                    color = 0x0000ff; // Bleu
                    break;
                case 1: // Correspond à la couleur verte
                    color = 0x00ff00; // Vert
                    break;
                case 2: // Correspond à la couleur rouge
                    color = 0xff0000; // Rouge
                    break;
                default:
                    color = 0xffffff; // Blanc par défaut
                    break;
            }

            let graphics = game.scene.scenes[0].add.graphics();
            graphics.fillStyle(color);
            graphics.fillRect(x - cellSize / 2, y - cellSize / 2, cellSize, cellSize);
            gridContainer.add(graphics); // Ajouter le graphique au conteneur de la grille
        }
    }
}




function changeGridSize(rows, cols) {
    createGrid(rows, cols);
}


function create() {
    var graphics = this.add.graphics();
    
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

    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff); 
    graphics2.strokeRect(2, 2, 480, 480);
    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.3)');

    createGrid(numRows, numCols);
    drawPattern(road_pattern);
}