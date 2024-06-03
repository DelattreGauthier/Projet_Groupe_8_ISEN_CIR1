var config = {
    type: Phaser.AUTO,
    width: 484,
    transparent: true,
    height: 484,
    scene: {
        preload: preload,
        create: create,
        update: update
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


let succes = false; // Définir succès comme une variable globale
let END =false;
let cellSize = 480 / numCols;
let gridContainer;
switch (couleur) {
    case 'bleu':  
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
            '../../../Document/Image/Jeu/Tuyaux/Entree.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_True.png',
            '../../../Document/Image/Jeu/Dino/Dino_Robot.png',
            '../../../Document/Image/Jeu/Dino/Dino_Robot2.png'
        ];
        break;
    case 'noir':
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Entree_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Noir.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Noir_True.png',
            '../../../Document/Image/Jeu/Dino/Dino_Vert.png',
            '../../../Document/Image/Jeu/Dino/Dino_Vert2.png'
        ];
        break;
    case 'vert':
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Entree_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Vert.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Vert_True.png',
            '../../../Document/Image/Jeu/Dino/Dino_Bleu.png',
            '../../../Document/Image/Jeu/Dino/Dino_Bleu2.png'
        ];
        break;
    case 'cuivre':
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre_True.png',
            '../../../Document/Image/Jeu/Dino/Dino_Rouge.png',
            '../../../Document/Image/Jeu/Dino/Dino_Rouge2.png'
        ];
        break;
    default:
        imageFiles = [
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
            '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
            '../../../Document/Image/Jeu/Tuyaux/Entree.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie.png',
            '../../../Document/Image/Jeu/Tuyaux/Sortie_True.png',
            '../../../Document/Image/Jeu/Dino/Dino_Robot.png',
            '../../../Document/Image/Jeu/Dino/Dino_Robot2.png'
        ]; 
        break;
}

function preload() {
    for (let i = 0; i < imageFiles.length; i++) {
        this.load.image('img_' + i, imageFiles[i]);
    }
}

var game = new Phaser.Game(config);
var isAnimating = false;
var background;
var sortieSprite;  // Référence au sprite de la case 'A'
var dinoSprite; // Référence au sprite du dino
var dinoFrame = 0;
var victoryText; // Référence au texte de victoire
var victoryRect; // Référence au rectangle de victoire
var score = 0;
var scoreText;
let pattern = [];
let road_pattern = [];
function updateBasePattern(row, col) {
    if (pattern[row][col] !== 'E') {
        base_pattern[row][col]++;
        if (base_pattern[row][col] >= 5) { // Changement ici pour permettre d'aller jusqu'à 4
            base_pattern[row][col] = 1;
        }
    }
}

function checkPatternMatch() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (pattern[i][j] !== 'Q') {
                if (pattern[i][j] === 'S') {
                    if (road_pattern[i][j] % 2 !== base_pattern[i][j] % 2) {
                        return false;
                    }
                } else if (road_pattern[i][j] !== base_pattern[i][j]) {
                    return false;
                }
            }
        }
    }
    return true;
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


    
switch (taille) {
    case 4:  
        pattern = convertToMatrix(img_pattern, 6, 6);
        break;
    case 6:
        pattern = convertToMatrix(img_pattern, 8, 8);
        break;
    case 8:
        pattern = convertToMatrix(img_pattern, 10, 10);
        break;
    case 10:
        pattern = convertToMatrix(img_pattern, 12, 12);
        break;
    default:
        pattern = convertToMatrix(img_pattern, 6, 6);
        break;
}


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


    base_pattern = [];
    // Assurer que road_pattern est initialisé avec des valeurs numériques
    road_pattern = road_pattern.map(row => row.map(cell => isNaN(cell) ? 0 : cell));

    for (let i = 0; i < numRows; i++) {
        base_pattern[i] = [];
        for (let j = 0; j < numCols; j++) {
            if (pattern[i][j] === 'D' || pattern[i][j] === 'A') {
                base_pattern[i][j] = 1; // Si la case est 'D' ou 'A', la valeur de base_pattern est 0
            } else if (road_pattern[i][j] !== 0) {
                // Si la case de road_pattern n'est pas vide, attribuer une valeur aléatoire entre 1 et 4
                base_pattern[i][j] = Math.floor(Math.random() * 4) + 1;
            } else {
                base_pattern[i][j] = 0; // Sinon, la valeur de base_pattern est 0
            }
        }
    }




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
            checkPatternMatch(); // Appel de la fonction checkPatternMatch ici

            switch (pattern[i][j]) {
                case 'S':
                    imageKey = 'img_0';
                    can_move = true;
                    break;
                case 'C':
                    imageKey = 'img_1';
                    can_move = true;
                    break;
                case 'T':
                    imageKey = 'img_2';
                    can_move = true;
                    break;
                case 'Q':
                    imageKey = 'img_3';
                    can_move = true;
                    break;
                case 'D':
                    imageKey = 'img_4';
                    can_move = false;
                    break;
                case 'A':
                    imageKey = 'img_5';
                    can_move = false;
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
                if (base_pattern[i][j] > 0) {
                    image.angle += 90 * (base_pattern[i][j] - 1);

                }
                if (can_move) {
                    image.setInteractive();
                    image.on('pointerdown', function () {
                        if (!isAnimating && !END) {
                            console.log(pattern);
                            console.log(road_pattern);
                            console.log(base_pattern);
                            isAnimating = true;
                            updateBasePattern(i, j); // Déplacez ceci ici
                            if(score<999){
                                score++;
                            }

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

            if (pattern[i][j] === 'A') {
                sortieSprite = image;  // Stocker la référence au sprite 'A'
            }

            gridImages[i][j] = image; // Stocker la référence à l'image dans le tableau
            gridContainer.add(image);
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

    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.7)');

    createGrid(numRows, numCols);
    switch (taille) {
        case 4:  

            // Ajouter le rectangle noir de victoire mais le rendre invisible pour l'instant
            victoryRect = this.add.rectangle(240, 240, 320, 320, 0x000000, 0.5);
            break;
        case 6:

            //Ajouter le rectangle noir de victoire mais le rendre invisible pour l'instant
            victoryRect = this.add.rectangle(240, 240, 360, 360, 0x000000, 0.5);
            break;
        case 8:

            // Ajouter le rectangle noir de victoire mais le rendre invisible pour l'instant
            victoryRect = this.add.rectangle(240, 240, 384, 384, 0x000000, 0.5);
            break;
        case 10:

            // Ajouter le rectangle noir de victoire mais le rendre invisible pour l'instant
            victoryRect = this.add.rectangle(240, 240, 400, 400, 0x000000, 0.5); 
            break;
        default:

            // Ajouter le rectangle noir de victoire mais le rendre invisible pour l'instant
            victoryRect = this.add.rectangle(240, 240, 360, 360, 0x000000, 0.5);
            break;
    }
    victoryRect.setVisible(false);


}

function update() {
    if (checkPatternMatch()) {
        if (!dinoSprite) {
            // Créer le sprite du dino seulement s'il n'existe pas déjà
            dinoSprite = this.add.sprite(242, 242 - 24, 'img_7');
            dinoSprite.setOrigin(0.5);
            switch (taille) {
                case 4:  
                    dinoSprite.displayWidth = cellSize + 48;
                    dinoSprite.displayHeight = cellSize + 48;
                    break;
                case 6:
                    dinoSprite.displayWidth = cellSize+96;
                    dinoSprite.displayHeight = cellSize+96;
                    break;
                case 8:
                    dinoSprite.displayWidth = cellSize+144;
                    dinoSprite.displayHeight = cellSize+144;
                    break;
                case 10:
                    dinoSprite.displayWidth = cellSize+192;
                    dinoSprite.displayHeight = cellSize+192;
                    break;
                default:
                    dinoSprite.displayWidth = cellSize + 48;
                    dinoSprite.displayHeight = cellSize + 48;
                    break;
            }
            

            // Configurer la minuterie pour changer les images de Dino
            this.time.addEvent({
                delay: 300, // 0.3 seconde
                callback: function () {
                    dinoFrame = (dinoFrame + 1) % 2;
                    dinoSprite.setTexture(dinoFrame === 0 ? 'img_7' : 'img_8');
                },
                loop: true
            });
        }
        switch (couleur) {
            case 'bleu':
                background.setBackgroundColor('rgba(0, 127, 166, 0.7)');
                break;
            case 'vert':
                background.setBackgroundColor('rgba(15, 142, 86, 0.7)');
                break;
            case 'cuivre':
                background.setBackgroundColor('rgba(172, 137, 22, 0.7)');
                break;
            case 'noir':
                background.setBackgroundColor('rgba(2, 73, 2, 0.7)');
                break;
            default:
                background.setBackgroundColor('rgba(15, 142, 86, 0.7)');
                break;
        }
        
        if (sortieSprite) {
            sortieSprite.setTexture('img_6');
        }

        // Afficher le rectangle et le texte de victoire une seule fois
        if (!succes) {
            succes = true; // Marquer que la sauvegarde a été tentée
            END=true;
            victoryRect.setVisible(true);
        }
    } else {
        background.setBackgroundColor('rgba(0, 0, 0, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('img_5');
        }
        
    }
}



