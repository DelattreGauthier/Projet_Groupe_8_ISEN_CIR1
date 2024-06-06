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

let succes = false;
let END = false;
let numRows = 8;
let numCols = 8;
let cellSize = 480 / numCols;
let gridContainer;
let imageFiles = [
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre_True.png',
    '../../../Document/Image/Jeu/Dino/Dino_Rouge.png',
    '../../../Document/Image/Jeu/Dino/Dino_Rouge2.png',
    'empty' // Valeur pour les cases vides
];

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
function preload() {
    for (let i = 0; i < imageFiles.length - 1; i++) {
        this.load.image(imageFiles[i], imageFiles[i]);
    }
}

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
            if(pattern[i][j]!=='Q'){
                if(pattern[i][j]==='S'){
                    if (road_pattern[i][j]%2 !== base_pattern[i][j]%2) {
                        return false;
                    }  
                }
                else if (road_pattern[i][j] !== base_pattern[i][j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

function createGrid(rows, cols) {
    numRows = rows;
    numCols = cols;
    cellSize = 480 / numCols;

    if (gridContainer) gridContainer.removeAll(true);
    gridContainer = game.scene.scenes[0].add.container(0, 0);

    pattern = [
        ['E', 'D', 'E', 'E', 'E', 'E','E','E'],
        ['E', 'T', 'T', 'T', 'C', 'E','E','E'],
        ['E', 'S', 'C', 'Q', 'Q', 'C','E','E'],
        ['E', 'S', 'C', 'T', 'T', 'C','E','E'],
        ['E', 'T', 'T', 'S', 'S', 'E','E','E'],
        ['E', 'C', 'C', 'C', 'T', 'E','E','E'],
        ['E', 'E', 'E', 'C', 'C', 'E','E','E'],
        ['E', 'E', 'E', 'A', 'E', 'E','E','E'],
    ];
    road_pattern = [
        [0,1,0,0,0,0,0,0],
        [0,4,1,1,1,0,0,0],
        [0,2,3,1,1,1,0,0],
        [0,2,4,2,4,2,0,0],
        [0,4,2,2,2,0,0,0],
        [0,3,2,3,2,0,0,0],
        [0,0,0,4,2,0,0,0],
        [0,0,0,1,0,0,0,0]
    ];
    base_pattern = [
        [0, 1, 0, 0, 0, 0, 0, 0],
        [0, 3, 2, 1, 4, 0, 0, 0],
        [0, 2, 4, 3, 1, 2, 0, 0],
        [0, 1, 2, 3, 4, 3, 0, 0],
        [0, 3, 4, 1, 1, 0, 0, 0],
        [0, 2, 1, 4, 3, 0, 0, 0],
        [0, 0, 0, 2, 4, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0]
    ];
    

    gridImages = []; // Pour stocker les références aux images affichées sur chaque case

    for (let i = 0; i < numRows; i++) {
        gridImages[i] = []; // Initialiser le tableau interne
        for (let j = 0; j < numCols; j++) {
            let imageKey;
            let can_move;
            let angle = 0; // Angle initial de l'image
            checkPatternMatch(); // Appel pour vérifier si le motif initial est correct
            switch (pattern[i][j]) {
                case 'S':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple_Cuivre.png';
                    can_move=true;
                    break;
                case 'C':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe_Cuivre.png';
                    can_move=true;
                    break;
                case 'T':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple_Cuivre.png';
                    can_move=true;
                    break;
                case 'Q':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple_Cuivre.png';
                    can_move=true;
                    break;
                case 'D':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Entree_Cuivre.png';
                    can_move=false;
                    break;
                case 'A':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png';
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
                if(base_pattern[i][j]>0){
                    image.angle += 90 * (base_pattern[i][j]-1); 
                }
                if (can_move) {
                    image.setInteractive();
                    image.on('pointerdown', function () {
                        if (!isAnimating && !END) {
                            isAnimating = true;
                            updateBasePattern(i, j); // Déplacez ceci ici
                            if(score<999){
                                score++;
                            }
                            scoreText.setText('Score: ' + score);

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
    graphics.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics.strokeRect(58, 58, 364, 364); // Dessiner un rectangle autour de la zone de la grille

    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics2.strokeRect(2, 2, 480, 480); // Dessiner un rectangle autour de la zone de la grille

    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.7)');

    createGrid(numRows, numCols);

    scoreText = this.add.text(320, 430, 'Score: ' + score, {
        fontSize: '32px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif'
    });

    victoryRect = this.add.rectangle(240, 240, 360, 360, 0x000000, 0.5);
    victoryRect.setVisible(false);
    victoryText = this.add.text(242, 120, 'Score : ' + score,{
        fontSize: '64px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif'
    });
    victoryText.setOrigin(0.5);
    victoryText.setVisible(false);

}

function update() {
    if (checkPatternMatch()) {
        if (!dinoSprite) {
            // Créer le sprite du dino seulement s'il n'existe pas déjà
            dinoSprite = this.add.sprite(242, 242-24, '../../../Document/Image/Jeu/Dino/Dino_Rouge.png');
            dinoSprite.setOrigin(0.5);
            dinoSprite.displayWidth = cellSize+96;
            dinoSprite.displayHeight = cellSize+96;

            // Configurer la minuterie pour changer les images de Dino
            this.time.addEvent({
                delay: 300, // 0.3 seconde
                callback: function () {
                    dinoFrame = (dinoFrame + 1) % 2;
                    dinoSprite.setTexture(dinoFrame === 0 ? '../../../Document/Image/Jeu/Dino/Dino_Rouge.png' : '../../../Document/Image/Jeu/Dino/Dino_Rouge2.png');
                },
                loop: true
            });
        }
        background.setBackgroundColor('rgba(172, 137, 22, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre_True.png');
        }

        if (!succes) {
            succes = true; // Marquer que la sauvegarde a été tentée
            END=true;
            victoryRect.setVisible(true);
            victoryText.setText('Score : ' + score);
            victoryText.setVisible(false);

            // Tenter la sauvegarde
            saveScore(score,4);

            // Définir un cookie pour débloquer le niveau suivant
            setCookie("level4", "unlocked", 7);
            enableNextLevelLinks();
        }
    } else {
        background.setBackgroundColor('rgba(0, 0, 0, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('../../../Document/Image/Jeu/Tuyaux/Sortie_Cuivre.png');
        }
    }
}


function enableNextLevelLinks() {
    for (let i = 2; i <= 8; i++) {
        let levelLink = document.getElementById("level" + i);
        if (getCookie("level" + (i - 1)) === "unlocked") {
            levelLink.classList.remove("disabled");
            levelLink.href = "Level" + i + ".php";
        }
    }
}
function saveScore(score, level) {
    if (!succes) {
        alert("You must be logged in to save your score.");
    } else if (succes) {
        succes = false;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "save_score.php?score=" + score + "&level=" + level, true); // Ajout du niveau dans la requête GET
        xhr.send();
    }
}

function getHint() {
    score += 9;
    let hintFound = false; // Indicateur pour arrêter la recherche après avoir trouvé un indice
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // Comparaison de la valeur dans road_pattern avec base_pattern
            if (road_pattern[i][j] !== base_pattern[i][j]) {
                if (!(pattern[i][j] === 'S' && (road_pattern[i][j] % 2 !== base_pattern[i][j] % 2))) {
                    if (pattern[i][j] !== 'Q') {
                        // Calcul de la différence de clics nécessaires
                        let clicksNeeded = (road_pattern[i][j] - base_pattern[i][j] + 4) % 4; // 4 - (road_pattern - base_pattern)

                        // Afficher la fenêtre d'indice
                        showHintWindow("Click the cell in [" + i + "][" + j + "] " + clicksNeeded + " time(s) to align it correctly.");

                        hintFound = true; // Marquer qu'un indice a été trouvé
                        break; // Sortir de la boucle interne
                    }
                }
            }
        }
        if (hintFound) {
            break; // Sortir de la boucle externe si un indice a été trouvé
        }
    }
}

function showHintWindow(message) {
    let hintWindow = document.getElementById("hintWindow");
    let hintText = document.getElementById("hintText");

    hintText.innerText = message;
    hintWindow.classList.add("show");

    // Masquer la fenêtre d'indice après 3 secondes
    setTimeout(function() {
        hintWindow.classList.remove("show");
    }, 3000);
}