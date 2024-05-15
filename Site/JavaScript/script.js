let game;
let numRows = 5;
let numCols = 5;
let cellSize = 480 / numCols;
let gridContainer;

window.onload = function() {
    let config = {
        type: Phaser.AUTO,
        width: 480,
        height: 480,
        scene: {
            preload: preload,
            create: create
        }
    };

    game = new Phaser.Game(config);
};

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    // Clearing previously created grid if any
    gridContainer.removeAll(true);

    // Creating new grid
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let image = game.scene.scenes[0].add.image(j * cellSize, i * cellSize, 'gridImage');
            image.setOrigin(0);
            image.displayWidth = cellSize;
            image.displayHeight = cellSize;
            gridContainer.add(image);
        }
    }
}

function changeGridSize(rows, cols) {
    createGrid(rows, cols);
}

function preload() {
    this.load.image('gridImage', '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png'); // Charger votre image
}

function create() {
    gridContainer = this.add.container(0, 0);
    createGrid(numRows, numCols);
    this.cameras.main.setBackgroundColor('#FA8072');
}
