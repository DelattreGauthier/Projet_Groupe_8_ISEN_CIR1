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
var background;
var isAnimating = false;
let imageFiles = [];
switch (couleur) {
    case 'bleu':  
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
        ];
        break;
    case 'noir':
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Noir.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Noir.png',
        
        ];
        break;
    case 'vert':
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Vert.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Vert.png',
        ];
        break;
    case 'cuivre':
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png',
        ];
        break;
    default:
        imageFiles = [
            '../../../../Document/Image/Jeu/Tuyaux/Entree.png',
            '../../../../Document/Image/Jeu/Tuyaux/Sortie.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
            '../../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
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

function updateRoadPattern(row,col) {
    if (img_pattern[row][col] !== 'E') {
        road_pattern[row][col]++;
        if (road_pattern[row][col] >= 5) { // Changement ici pour permettre d'aller jusqu'à 4
            road_pattern[row][col] = 1;
        }
    }
}

console.log(img_pattern);

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    gridImages = []; // Pour stocker les références aux images affichées sur chaque case

    for (let i = 0; i < numRows; i++) {
        gridImages[i] = []; // Initialiser le tableau interne
        for (let j = 0; j < numCols; j++) {
            let imageKey;
            let can_move;
            let angle = 0; // Angle initial de l'image
            switch (img_pattern[i][j]) {
                case 'S':
                    imageKey = 'img_2';
                    can_move=true;
                    break;
                case 'C':
                    imageKey = 'img_3';
                    can_move=true;
                    break;
                case 'T':
                    imageKey = 'img_4';
                    can_move=true;
                    break;
                case 'Q':
                    imageKey = 'img_5';
                    can_move=true;
                    break;
                case 'D':
                    imageKey = 'img_0';
                    can_move=false;
                    break;
                case 'A':
                    imageKey = 'img_1';
                    can_move=false;
                    break;
                case 'E':
                default:
                    imageKey = 'empty';
                    break;
            }
            let image;

            if (imageKey !== 'empty') {
                image = game.scene.scenes[0].add.sprite(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, imageKey);
                image.setOrigin(0.5);
                image.displayWidth = cellSize;
                image.displayHeight = cellSize;
                if (can_move) {
                    image.setInteractive();
                    image.on('pointerdown', function () {
                        if (!isAnimating) {
                            isAnimating = true;
                            updateRoadPattern(i, j);
                            console.log(road_pattern);
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
                image = game.scene.scenes[0].add.rectangle(j * cellSize + cellSize / 2, i * cellSize + cellSize / 2, cellSize, cellSize, 0x000000, 0);
            }

            gridImages[i][j] = image; // Stocker la référence à l'image dans le tableau
            gridContainer.add(image);
        }
    }
}


for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        if (road_pattern[i][j] === 8) {
            road_pattern[i][j] = 0;
        }
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
    // Création du bouton RESET
    resetButton = this.add.rectangle(150, 550, 100, 50, 0xff0000);
    resetButton.setOrigin(0.5);
    resetButton.setInteractive();
    resetButton.on('pointerdown', function () {
        // Redirection vers Concepteur_Manuel_3.php avec les paramètres de couleur et de taille
        window.location.href = `Concepteur_Auto.php`;
    });

    // Texte du bouton RESET
    let resetText = this.add.text(150, 550, 'RESET', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
    resetText.setOrigin(0.5);

    // Création du bouton COMPLETE
    completeButton = this.add.rectangle(330, 550, 120, 50, 0x00ff00);
    completeButton.setOrigin(0.5);
    completeButton.setInteractive();
    completeButton.on('pointerdown', function () {
        saveToFile().then(response => {
            if (response.success) {
                if (response.Checkroadcorrect) {
                    window.location.href = "../Save_in_BD.php?color=" + couleur + "&taille=" + taille + "&pattern=" + img_pattern + "&road_pattern=" + road_pattern;
                } else {
                    alert("Incorrect");
                }
            } else {
                alert("Error: " + response.message);
            }
        });
    });

    // Texte du bouton COMPLETE
    let completeText = this.add.text(330, 550, 'COMPLETE', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
    completeText.setOrigin(0.5);
}

function saveToFile() {
    // Initialize the patterns as strings
    let roadPatternStr = '';
    for (let i = 0; i < road_pattern.length; i++) {
        for (let j = 0; j < road_pattern[i].length; j++) {
            roadPatternStr += road_pattern[i][j];
        }
        roadPatternStr += '\n'; // Add separator for each row
    }

    let imgPatternStr = '';
    for (let i = 0; i < img_pattern.length; i++) {
        for (let j = 0; j < img_pattern[i].length; j++) {
            imgPatternStr += img_pattern[i][j];
        }
        imgPatternStr += '\n'; // Add separator for each row
    }

    // Concatenate taille, roadPatternStr, and imgPatternStr with a unique separator
    let content = (taille+2) + '\n' + roadPatternStr + imgPatternStr;

    return fetch('save_file_auto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'content=' + encodeURIComponent(content)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error saving file:', error);
        return { success: false, message: 'Error saving file.' };
    });
}