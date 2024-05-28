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


var game = new Phaser.Game(config);
var isAnimating = false;
var background;

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    var graphics = game.scene.scenes[0].add.graphics();
    graphics.lineStyle(2, 0xffffff);

    // Dessiner les lignes verticales
    for (let i = 1; i < numCols; i++) {
        let x = i * cellSize;
        graphics.lineBetween(x, 0, x, 480);
    }

    // Dessiner les lignes horizontales
    for (let i = 1; i < numRows; i++) {
        let y = i * cellSize;
        graphics.lineBetween(0, y, 480, y);
    }

    graphics.fillStyle(0xffffff);
    road_pattern = [
        [8, 0, 0, 0, 0, 8],
        [8, 8, 8, 8, 8, 8],
        [8, 8, 8, 8, 8, 8],
        [8, 8, 8, 8, 8, 8],
        [8, 8, 8, 8, 8, 8],
        [8, 0, 0, 0, 0, 8],
    ];
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let x = j * cellSize;
            let y = i * cellSize;
            if (road_pattern[i][j] === 8) {
                graphics.strokeRect(x, y, cellSize, cellSize); // Dessiner le contour blanc pour les 8
            }
        }
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


