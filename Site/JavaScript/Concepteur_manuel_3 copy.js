var config = {
    type: Phaser.AUTO,
    width: 484,
    transparent: true,
    height: 484,
    scene: {
        preload: preload,
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
    [8, 8, 8, 8, 8, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 8, 8, 8, 8, 8],
];

let imageFiles = [
    '../../../Document/Image/Jeu/Tuyaux/Entree_Noir.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie_Noir.png',

];

function preload() {
    for (let i = 0; i < imageFiles.length; i++) {
        this.load.image('img_' + i, imageFiles[i]);
    }
}
function updateRoadPattern(pattern) {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (pattern[i][j] !== 'E') {
                road_pattern[i][j] = 1;
            }
        }
    }
}
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

let img_pattern = convertToMatrix(pattern, 6, 6);

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


    // Remplir les cellules avec la couleur grise
    graphics.fillStyle(0x566573);
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let x = j * cellSize + 2; // Ajuster la position x pour les lignes
            let y = i * cellSize + 2; // Ajuster la position y pour les lignes
            if (road_pattern[i][j] === 8) {
                graphics.fillRect(x, y, cellSize - 4, cellSize - 4); // Reduire la taille des carrés gris
            }
        }
    }
}
// Fonction pour gérer le clic sur les cases rouges
function handleCellClick(image) {
    // Vérifier si la case cliquée est rouge (couleur hexadécimale : 0xff0000)
    if (image.fillColor === 0xff0000) {
        // Changer la couleur de la case en vert
        image.setFillStyle(0x00ff00);
    }
}

function drawPattern(pattern) {
    // Le reste du code pour dessiner le modèle reste le même

    // Ajoutez un gestionnaire de clic pour chaque case
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let x = col * cellSize + cellSize / 2;
            let y = row * cellSize + cellSize / 2;

            let image;

            switch (pattern[row][col]) {
                // Cas 'D' et 'A' restent les mêmes
                case 'D':
                    image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0xff0000);
                    image.setInteractive(); // Rendre la case cliquable
                    image.on('pointerup', function () {
                        handleCellClick(image); // Appeler la fonction de gestion du clic
                    });
                    break;
                case 'A':
                    image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0xff0000);
                    image.setInteractive(); // Rendre la case cliquable
                    image.on('pointerup', function () {
                        handleCellClick(image); // Appeler la fonction de gestion du clic
                    });
                    break;
                // Case 'E' est modifiée pour rendre les cases vides également cliquables
                case 'E':
                    image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0);
                    image.setInteractive(); // Rendre la case cliquable
                    image.on('pointerup', function () {
                        handleCellClick(image); // Appeler la fonction de gestion du clic
                    });
                    break;
                default:
                    image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0);
                    break;
            }

            image.setOrigin(0.5);
            image.displayWidth = cellSize; // Reduire la taille des images
            image.displayHeight = cellSize; // Reduire la taille des images
            gridContainer.add(image);
        }
    }

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


updateRoadPattern(img_pattern);

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
    drawPattern(img_pattern);
}
