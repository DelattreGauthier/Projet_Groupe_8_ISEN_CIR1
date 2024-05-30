var config = {
    type: Phaser.AUTO,
    width: 484,
    transparent: true,
    height: 600,
    scene: {
        preload: preload,
        create:create
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

let road_pattern = [];
switch (taille) {
    case 4:  
        road_pattern = convertToMatrix_int(road_pattern_split, 6, 6);
        break;
    case 6:
        road_pattern = convertToMatrix_int(road_pattern_split, 8, 8);
        break;
    case 8:
        road_pattern = convertToMatrix_int(road_pattern_split, 10, 10);
        break;
    case 10:
        road_pattern = convertToMatrix_int(road_pattern_split, 12, 12);
        break;
    default:
        road_pattern = convertToMatrix_int(road_pattern_split, 6, 6);
        break;
}
let selectedCell = null; // Variable pour stocker la case actuellement sélectionnée

// Ajoutez un événement de clic à chaque case de la grille
function addClickEventsToCells() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (img_pattern[row][col] === 'E' && road_pattern[row][col] === 1) {
                let cell = gridImages[row][col];
                cell.setInteractive(); // Rend la case interactive
                // Stocker les coordonnées de ligne et de colonne dans selectedCell
                cell.row = row;
                cell.col = col;
                cell.on('pointerdown', function () {
                    // Lorsque la case est cliquée
                    if (selectedCell !== cell) {
                        // Si la case cliquée est différente de la case déjà sélectionnée
                        if (selectedCell) {
                            // S'il y a déjà une case sélectionnée, réinitialiser son cadre
                            selectedCell.setStrokeStyle(0); // Supprimer le cadre rouge
                        }
                        // Mettre en surbrillance la case cliquée en dessinant un cadre rouge
                        cell.setStrokeStyle(4, 0xff0000); // Épaissir le cadre rouge et rétrécir de 4 pixels
                        selectedCell = cell; // Mettre à jour la case sélectionnée
                    } else {
                        // Si la case cliquée est déjà sélectionnée, désélectionner
                        cell.setStrokeStyle(0); // Supprimer le cadre rouge
                        selectedCell = null; // Réinitialiser la case sélectionnée
                    }
                });
            }
        }
    }
}



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

    // Stocker les références des images dans gridImages
    for (let i = 0; i < numRows; i++) {
        let rowImages = [];
        for (let j = 0; j < numCols; j++) {
            let x = j * cellSize + cellSize / 2;
            let y = i * cellSize + cellSize / 2;
            let image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0);
            image.setOrigin(0.5);
            image.displayWidth = cellSize;
            image.displayHeight = cellSize;
            image.row = i; // Définir la propriété row de l'image
            image.col = j; // Définir la propriété col de l'image
            gridContainer.add(image);
            rowImages.push(image); // Stocker la référence de l'image dans rowImages
        }
        gridImages.push(rowImages); // Ajouter rowImages à gridImages
    }

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

    // Ajouter des événements de clic aux cases interactives
    addClickEventsToCells();
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
                    } else if(road_pattern[row][col] === 1){
                        image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x00ff00); // Gris
                    }
                    else {
                        // Dessiner un rectangle noir transparent pour une case vide normale
                        image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0); // Noir transparent
                    }
                    break;
                case 'D':
                    image = game.scene.scenes[0].add.image(x, y, 'img_0'); // Image d'entrée noir
                    
                    break;
                case 'A':
                    image = game.scene.scenes[0].add.image(x, y, 'img_1'); // Image de sortie noir
                
                    break;
                default:
                    // Dessiner un rectangle noir transparent par défaut
                    image = game.scene.scenes[0].add.rectangle(x, y, cellSize, cellSize, 0x000000, 0); // Noir transparent
                    break;
                }
                image.setOrigin(0.5);
                image.displayWidth = cellSize;
                image.displayHeight = cellSize;
                gridImages[row][col] = image; // Stocker la référence de l'image dans gridImages
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
    
        // Ajouter des événements de clic aux cases interactives
        addClickEventsToCells();
}
let buttonRed;
let buttonBlue;
let buttonPurple;
let buttonOrange;

function createButtons() {
    // Créez le bouton rouge
    buttonRed = game.scene.scenes[0].add.rectangle(100, 550, 60, 40, 0xff0000).setInteractive();
    buttonRed.on('pointerdown', function () {
        updatePattern('S', selectedCell.row, selectedCell.col); // Mettre à jour img_pattern avec la lettre 'S'
        console.log(img_pattern);
    });

    // Créez le bouton bleu
    buttonBlue = game.scene.scenes[0].add.rectangle(200, 550, 60, 40, 0x0000ff).setInteractive();
    buttonBlue.on('pointerdown', function () {
        updatePattern('C', selectedCell.row, selectedCell.col); // Mettre à jour img_pattern avec la lettre 'C'
        console.log(img_pattern);
    });

    // Créez le bouton violet
    buttonPurple = game.scene.scenes[0].add.rectangle(300, 550, 60, 40, 0x800080).setInteractive();
    buttonPurple.on('pointerdown', function () {
        updatePattern('T', selectedCell.row, selectedCell.col); // Mettre à jour img_pattern avec la lettre 'T'
        console.log(img_pattern);
    });

    // Créez le bouton orange
    buttonOrange = game.scene.scenes[0].add.rectangle(400, 550, 60, 40, 0xffa500).setInteractive();
    buttonOrange.on('pointerdown', function () {
        updatePattern('Q', selectedCell.row, selectedCell.col); // Mettre à jour img_pattern avec la lettre 'Q'
        console.log(img_pattern);
    });
}

function updatePattern(letter, row, col) {
    if (row !== undefined && col !== undefined) {
        img_pattern[row][col] = letter; // Mettre à jour img_pattern avec la lettre sélectionnée

        // Mettre à jour la couleur de la case en fonction de la lettre dans img_pattern
        switch (letter) {
            case 'S':
                gridImages[row][col].fillColor = 0xff0000; // Rouge
                break;
            case 'C':
                gridImages[row][col].fillColor = 0x0000ff; // Bleu
                break;
            case 'T':
                gridImages[row][col].fillColor = 0x800080; // Violet
                break;
            case 'Q':
                gridImages[row][col].fillColor = 0xffa500; // Orange
                break;
            default:
                gridImages[row][col].fillColor = 0x00ff00; // Vert par défaut
                break;
        }
    } else {
        console.log("Erreur : Les coordonnées de la cellule ne sont pas correctement définies.");
    }
}


function create() {
    var graphics = this.add.graphics();
    createButtons();
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
    drawPattern(img_pattern)
}