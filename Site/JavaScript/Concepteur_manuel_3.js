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
let pattern = [
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
    ['E', 'E', 'E', 'E', 'E', 'E'],
];
let road_pattern = [
    [8, 0, 0, 0, 0, 8],
    [8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8],
    [8, 0, 0, 0, 0, 8],
];
switch (taille) {
    case 4:  
        pattern = [
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
        ];
        road_pattern = [
            [8, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 8],
        ];
        break;
    case 6:
        pattern = [
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E'],
            ['E', 'E', 'E', 'E', 'E', 'E','E','E']
        ];
        road_pattern = [
            [8, 0, 0, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 0, 0, 8]
        ];
        break;
    case 8:
        pattern = [
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']
        ];
        road_pattern = [
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 0, 0, 0, 0, 8]
        ];
        
        break;
    case 10:
        pattern = [
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E'],
            ['E','E','E','E','E','E','E','E','E','E','E','E']
        ];
        road_pattern = [
            [8,0,0,0,0,0,0,0,0,0,0,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,8,8,8,8,8,8,8,8,8,8,8],
            [8,0,0,0,0,0,0,0,0,0,0,8]
        ];
        
        
        break;
    default:
        pattern = [
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
            ['E', 'E', 'E', 'E', 'E', 'E'],
        ];
        road_pattern = [
            [8, 0, 0, 0, 0, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 8, 8, 8, 8, 8],
            [8, 0, 0, 0, 0, 8],
        ];
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
    // Créer les cases interactives pour la ligne du haut
    for (let i = 0; i < numRows; i++) {
        gridImages[i] = []; // Initialiser le tableau interne
        for (let j = 0; j < numCols; j++) {
            let x = j * cellSize;
            let y = i * cellSize;
            let cell = game.scene.scenes[0].add.rectangle(x + 2, y + 2, cellSize - 4, cellSize - 4, 0xffffff); // Dessiner une case blanche
            cell.setOrigin(0);
            gridImages[i][j] = cell; // Stocker la référence de la case
            if (road_pattern[i][j] !== 8 && i === 0) {
                cell.setInteractive(); // Rend la case cliquable
                cell.on('pointerdown', function () {
                    if (!isAnimating1 && road_pattern[i][j] !== 1 && !topRowSelected) {
                        isAnimating1 = true;
                        pattern[i][j] = 'D'; // Si la case est sur la ligne du haut
                        topRowSelected = true;
                        this.setFillStyle(0x00FF00); // Mettre en vert la case sélectionnée
                        road_pattern[i][j] = 1; // Marquer la case comme sélectionnée dans road_pattern
                        checkSelectionComplete();
                    }
                });
            } else if (road_pattern[i][j] !== 8 && i === numRows - 1) { // Ajout de la condition pour la ligne du bas
                cell.setInteractive(); // Rend la case cliquable
                cell.on('pointerdown', function () {
                    if (!isAnimating2 && road_pattern[i][j] !== 1 && !bottomRowSelected) {
                        isAnimating2 = true;
                        pattern[i][j] = 'A'; // Si la case est sur la ligne du bas
                        bottomRowSelected = true;
                        this.setFillStyle(0xFF0000); // Mettre en rouge la case sélectionnée
                        road_pattern[i][j] = 1; // Marquer la case comme sélectionnée dans road_pattern
                        checkSelectionComplete();
                    }
                });
            }
            gridContainer.add(cell);
        }
    }
    
}

function deactivateSelectedCells() {
    // Parcourez toutes les cases
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            let cell = gridImages[i][j];
            if (road_pattern[i][j] === 1) {
                cell.removeInteractive(); // Désactiver l'interaction avec la case déjà sélectionnée
            }
        }
    }
}

function changeGridSize(rows, cols) {
    createGrid(rows, cols);
}

function checkSelectionComplete() {
    if (topRowSelected && bottomRowSelected) {
        deactivateSelectedCells();

    // Envoyer les données à PHP avec la taille et le pattern
    window.location.href = "Concepteur_manuel_4.php?color=" + couleur + "&taille=" + taille + "&pattern=" + pattern;
    }
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

}

