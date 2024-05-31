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
let gridImages = []; // Ajout d'une variable pour stocker les références des cellules
var game = new Phaser.Game(config);
var isAnimating1 = false;
var isAnimating2 = false;
var background;
var startRedClicked=false;
var endRedClicked=false;

let road_pattern = [
    [8, 8, 8, 8, 8, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 0, 0, 0, 0, 8],
    [8, 8, 8, 8, 8, 8],
];

switch (taille) {
    case 4:  
        road_pattern = [
            [8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8],
        ];
        break;
    case 6:
        road_pattern = [
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8, 8, 8]
        ];
        break;
    case 8:
        road_pattern = [
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
        ];
        
        break;
    case 10:
        road_pattern = [
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,8,8,8,8,8,8,8,8,8,8,8]
        ];
        
        
        break;
    default:
        road_pattern = [
            [8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8],
        ];
        break;
}
let imageFiles = [];
switch (couleur) {
    case 'bleu':  
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Entree.png',
        '../../../Document/Image/Jeu/Tuyaux/Sortie.png',
        ];
        break;
    case 'noir':
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Entree_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Noir.png',
        
        ];
        break;
    case 'vert':
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Entree_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Vert.png',
        ];
        break;
    case 'cuivre':
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png',
        ];
        break;
    default:
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Entree.png',
        '../../../Document/Image/Jeu/Tuyaux/Sortie.png',
        ]; 
        break;
}

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
let redRectX_D= 0; 
let redRectY_D= 0; 
let redRectX_A= 0; 
let redRectY_A= 0; 

function handleCellClick(image, row, col) {
    // Vérifier si la case cliquée est rouge (couleur hexadécimale : 0xff0000)
    if (image.fillColor === 0xff0000 || image.fillColor ===0x3498DB) {
        // Changer la couleur de la case en vert
        image.setFillStyle(0x00ff00);
        // Mettre à jour road_pattern pour marquer cette case comme occupée
        road_pattern[row][col] = 1;

        if(row===redRectY_D && col===redRectX_D){
            startRedClicked=true;
        }
        if(row===redRectY_A && col===redRectX_A){
            endRedClicked=true;
        }
        checkAndMakeClickable(row - 1, col); // Case au-dessus
        checkAndMakeClickable(row + 1, col); // Case en-dessous
        checkAndMakeClickable(row, col - 1); // Case à gauche
        checkAndMakeClickable(row, col + 1); // Case à droite
        // Si les deux cases rouges sont devenues vertes, désactiver toutes les cases
        if (startRedClicked && endRedClicked) {
            disableAllCells();
            checkPathConnected();
        }
    }
}
function disableAllCells() {
    // Parcourir toutes les cases et désactiver l'interaction
    gridContainer.iterate(function (child) {
        child.disableInteractive();
    });
}
function checkPathConnected() {
    // Trouver les coordonnées de la case 'D' et de la case 'A' dans img_pattern
    let startCoords, endCoords;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (img_pattern[row][col] === 'D') {
                startCoords = { row: row, col: col };
            } else if (img_pattern[row][col] === 'A') {
                endCoords = { row: row, col: col };
            }
        }
    }

    // Vérifier si les deux chemins sont connectés
    if (isPathConnected(startCoords, endCoords)) {
        // Si les chemins sont connectés, vous pouvez rediriger vers une autre page ici si nécessaire
        window.location.href = "Concepteur_manuel_5.php?color=" + couleur + "&taille=" + taille + "&pattern=" + img_pattern + "&road_pattern=" + road_pattern;
    } else {
        // Si les chemins ne sont pas connectés, recharger la page actuelle
        window.location.reload();
    }
}


function isPathConnected(startCoords, endCoords) {
    let visited = new Array(numRows).fill(false).map(() => new Array(numCols).fill(false)); // Tableau pour suivre les cases visitées
    let queue = []; // File pour le parcours BFS

    // Ajouter les coordonnées de la case 'D' à la file
    queue.push(startCoords);

    // Parcours BFS pour marquer les cases visitées
    while (queue.length > 0) {
        let current = queue.shift();

        // Vérifier si current est défini
        if (current) {
            let row = current.row;
            let col = current.col;

            // Marquer la case actuelle comme visitée
            visited[row][col] = true;

            // Vérifier les cases adjacentes
            let neighbors = getAdjacentGreenCells(row, col); // Fonction à implémenter pour obtenir les cases vertes adjacentes
            for (let neighbor of neighbors) {
                let nRow = neighbor.row;
                let nCol = neighbor.col;

                // Si la case voisine est la case 'A', les chemins sont connectés
                if (nRow === endCoords.row && nCol === endCoords.col) {
                    // Mettre à jour les indicateurs de clic sur les cases rouges
                    endRedClicked = true;
                    startRedClicked = true;
                    return true;
                }

                // Si la case voisine n'a pas été visitée, l'ajouter à la file
                if (!visited[nRow][nCol]) {
                    queue.push({ row: nRow, col: nCol });
                }
            }
        }
    }

    // Si toutes les cases reliées à 'D' ont été parcourues et 'A' n'a pas été atteint, les chemins ne sont pas connectés
    return false;
}



function getAdjacentGreenCells(row, col) {
    let neighbors = [];

    // Vérifier les cases vertes adjacentes à la case actuelle, uniquement horizontalement et verticalement
    let directions = [
        { row: row - 1, col: col }, // Case au-dessus
        { row: row + 1, col: col }, // Case en-dessous
        { row: row, col: col - 1 }, // Case à gauche
        { row: row, col: col + 1 }  // Case à droite
    ];

    for (let dir of directions) {
        let newRow = dir.row;
        let newCol = dir.col;

        // Vérifier les limites de la grille et si la case est verte
        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols && road_pattern[newRow][newCol] === 1) {
            neighbors.push({ row: newRow, col: newCol });
        }
    }

    return neighbors;
}


function checkAndMakeClickable(row, col) {
    if (row >= 0 && row < numRows && col >= 0 && col < numCols && road_pattern[row][col] === 0) {
        let x = col * cellSize + cellSize / 2;
        let y = row * cellSize + cellSize / 2;
        let redRect = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0xff0000); // Rouge
        redRect.setOrigin(0.5);
        gridContainer.add(redRect);
        redRect.setInteractive(); // Rendre la case cliquable
        redRect.on('pointerup', function () {
            handleCellClick(redRect, row, col);
        });
    }
}
function checkAndDrawAdjacent(row, col) {
    if (row >= 0 && row < numRows && col >= 0 && col < numCols && road_pattern[row][col] === 0) {
        let x = col * cellSize + cellSize / 2;
        let y = row * cellSize + cellSize / 2;
        let redRect = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0xff0000); // Rouge
        redRect.setOrigin(0.5);
        gridContainer.add(redRect);
        redRect.setInteractive(); // Rendre la case cliquable
        redRect.on('pointerup', function () {
            handleCellClick(redRect, row, col);
        });
    }
}
function drawPattern(pattern) {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let x = col * cellSize + cellSize / 2;
            let y = row * cellSize + cellSize / 2;

            let image;

            switch (pattern[row][col]) {
                case 'E':
                    if (road_pattern[row][col] === 8) {
                        // Dessiner un rectangle gris pour une case vide avec la valeur 8 dans road_pattern
                        image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x566573); // Gris
                    } else {
                        // Dessiner un rectangle noir transparent pour une case vide normale
                        image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0); // Noir transparent
                    }
                    break;
                case 'D':
                    image = game.scene.scenes[0].add.image(x, y, 'img_0'); // Image d'entrée noir
                    // Vérifier si la case en face de 'D' est valide et dessiner un carré rouge
                    if (row < numRows - 1) {
                        let redRectX = col * cellSize + cellSize / 2;
                        let redRectY = (row + 1) * cellSize + cellSize / 2;
                        let redRect = game.scene.scenes[0].add.rectangle(redRectX, redRectY, cellSize, cellSize, 0x3498DB); 
                        redRectX_D= col; 
                        redRectY_D= row + 1; 
                        redRect.setOrigin(0.5);
                        gridContainer.add(redRect);
                        redRect.setInteractive(); // Rendre la case cliquable
                        redRect.on('pointerup', function () {
                            startRedClicked = true;
                            handleCellClick(redRect, row+1, col);
                        });
                    }
                    break;
                case 'A':
                    image = game.scene.scenes[0].add.image(x, y, 'img_1'); // Image de sortie noir
                    // Vérifier si la case en face de 'A' est valide et dessiner un carré rouge
                    if (row > 0) {
                        let redRectX = col * cellSize + cellSize / 2;
                        let redRectY = (row - 1) * cellSize + cellSize / 2;
                        let redRect = game.scene.scenes[0].add.rectangle(redRectX, redRectY, cellSize, cellSize, 0x3498DB); 
                        redRectX_A= col; 
                        redRectY_A= row - 1; 
                        redRect.setOrigin(0.5);
                        gridContainer.add(redRect);
                        redRect.setInteractive(); // Rendre la case cliquable
                        redRect.on('pointerup', function () {
                            endRedClicked = true;
                            handleCellClick(redRect, row-1, col);
                        });
                    }
                    break;
                default:
                    // Dessiner un rectangle noir transparent par défaut
                    image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0); // Noir transparent
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
console.log(road_pattern);
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
