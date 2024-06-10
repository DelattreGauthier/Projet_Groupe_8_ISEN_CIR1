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
let numRows = 12;
let numCols = 12;
let cellSize = 480 / numCols;
let gridContainer;
let imageFiles = [
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png',
    '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png',
    '../../../Document/Image/Jeu/Tuyaux/Entree.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie.png',
    '../../../Document/Image/Jeu/Tuyaux/Sortie_True.png',
    '../../../Document/Image/Jeu/Dino/Dino_Robot.png',
    '../../../Document/Image/Jeu/Dino/Dino_Robot2.png',

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
        ['E','E', 'D', 'E', 'E', 'E', 'E','E','E','E','E','E'],
        ['E','C', 'Q', 'S', 'S', 'C', 'E','C','C','E','E','E'],
        ['E','T', 'T', 'E', 'E', 'T', 'S','C','T','S','C','E'],
        ['E','C', 'C', 'C', 'S', 'Q', 'S','C','S','E','S','E'],
        ['E','E', 'E', 'C', 'T', 'Q', 'T','C','S','E','S','E'],
        ['E','E', 'E', 'E', 'C', 'T', 'T','E','C','T','C','E'],
        ['E','C', 'T', 'C', 'E', 'E', 'S','E','C','C','E','E'],
        ['E','T', 'Q', 'T', 'E', 'C', 'Q','C','S','E','E','E'],
        ['E','T', 'T', 'C', 'T', 'Q', 'T','C','C','E','E','E'],
        ['E','S', 'T', 'S', 'T', 'T', 'Q','C','E','E','E','E'],
        ['E','C', 'T', 'S', 'C', 'C', 'T','T','E','E','E','E'],
        ['E','E', 'E', 'E', 'E', 'E', 'E','A','E','E','E','E']
    ];
    road_pattern = [
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 1, 1, 1, 1, 0, 4, 1, 0, 0, 0],
        [0, 4, 2, 0, 0, 4, 1, 2, 4, 1, 1, 0],
        [0, 3, 2, 4, 1, 1, 1, 1, 2, 0, 2, 0],
        [0, 0, 0, 3, 1, 1, 1, 2, 2, 0, 2, 0],
        [0, 0, 0, 0, 3, 3, 2, 0, 3, 1, 2, 0],
        [0, 4, 1, 1, 0, 0, 2, 0, 4, 2, 0, 0],
        [0, 4, 1, 2, 0, 4, 1, 1, 2, 0, 0, 0],
        [0, 4, 2, 3, 1, 1, 2, 3, 2, 0, 0, 0],
        [0, 2, 4, 1, 2, 4, 1, 1, 0, 0, 0, 0],
        [0, 3, 3, 1, 2, 3, 3, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
    ]
    
    base_pattern = [
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 4, 1, 3, 0, 3, 1, 0, 0, 0],
        [0, 1, 3, 0, 0, 1, 2, 3, 4, 1, 3, 0],
        [0, 1, 1, 2, 3, 4, 1, 2, 3, 0, 1, 0],
        [0, 0, 0, 3, 4, 1, 2, 3, 4, 0, 1, 0],
        [0, 0, 0, 0, 3, 4, 1, 0, 2, 3, 4, 0],
        [0, 1, 2, 3, 0, 0, 1, 0, 1, 2, 0, 0],
        [0, 1, 3, 4, 0, 1, 2, 3, 4, 0, 0, 0],
        [0, 1, 2, 3, 4, 1, 2, 3, 4, 0, 0, 0],
        [0, 1, 3, 4, 1, 2, 3, 4, 0, 0, 0, 0],
        [0, 1, 2, 3, 4, 1, 2, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
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
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Simple.png';
                    can_move=true;
                    break;
                case 'C':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Courbe.png';
                    can_move=true;
                    break;
                case 'T':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Triple.png';
                    can_move=true;
                    break;
                case 'Q':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Tuyau_Quadruple.png';
                    can_move=true;
                    break;
                case 'D':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Entree.png';
                    can_move=false;
                    break;
                case 'A':
                    imageKey = '../../../Document/Image/Jeu/Tuyaux/Sortie.png';
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
                            updateBasePattern(i, j); 
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
    // Création du cadre autour de la grille
    var graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics.strokeRect(38, 38, 404, 404); // Dessiner un rectangle autour de la zone de la grille

    var graphics2 = this.add.graphics();
    graphics2.lineStyle(4, 0xffffff); // Définir l'épaisseur et la couleur de la ligne du cadre
    graphics2.strokeRect(2, 2, 480, 480); // Dessiner un rectangle autour de la zone de la grille
    createGrid(numRows, numCols);

    background = this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.7)');

    createGrid(numRows, numCols);
    scoreText = this.add.text(10, 442.5, 'Score: ' + score, {
        fontSize: '32px',
        fill: '#FFFFFF',
        fontFamily: 'Arial, sans-serif'
    });

    // Ajouter le rectangle noir de victoire mais le rendre invisible pour l'instant
    victoryRect = this.add.rectangle(240, 240, 400, 400, 0x000000, 0.5);
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
            dinoSprite = this.add.sprite(242, 242-24, '../../../Document/Image/Jeu/Dino/Dino_Robot.png');
            dinoSprite.setOrigin(0.5);
            dinoSprite.displayWidth = cellSize+192;
            dinoSprite.displayHeight = cellSize+192;

            // Configurer la minuterie pour changer les images de Dino
            this.time.addEvent({
                delay: 300, // 0.3 seconde
                callback: function () {
                    dinoFrame = (dinoFrame + 1) % 2;
                    dinoSprite.setTexture(dinoFrame === 0 ? '../../../Document/Image/Jeu/Dino/Dino_Robot.png' : '../../../Document/Image/Jeu/Dino/Dino_Robot2.png');
                },
                loop: true
            });
        }
        background.setBackgroundColor('rgba(0, 127, 166, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('../../../Document/Image/Jeu/Tuyaux/Sortie_True.png');
        }

        if (!succes) {
            succes = true; // Marquer que la sauvegarde a été tentée
            END=true;
            victoryRect.setVisible(true);
            victoryText.setText('Score : ' + score);
            victoryText.setVisible(false);

            // Tenter la sauvegarde
            saveScore(score,7);
           // Définir un cookie pour débloquer le niveau suivant
           setCookie("level7", "unlocked",7);
           enableNextLevelLinks();
           }
    } else {
        background.setBackgroundColor('rgba(0, 0, 0, 0.7)');
        if (sortieSprite) {
            sortieSprite.setTexture('../../../Document/Image/Jeu/Tuyaux/Sortie.png');
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
    if(score <= 999){
        score += 9;
    } else {
        score = 999;
    }
    let hintFound = false; // Indicateur pour arrêter la recherche après avoir trouvé un indice
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // Comparaison de la valeur dans road_pattern avec base_pattern
            if (road_pattern[i][j] !== base_pattern[i][j] && pattern[i][j] !== 'Q') {
                let clicksNeeded = 0; // Initialiser le nombre de clics nécessaires

                if (pattern[i][j] === 'S') {
                    // Si c'est un tuyau simple, calculer la différence en tenant compte de l'orientation
                    let diff = Math.abs(road_pattern[i][j] - base_pattern[i][j]);
                    // Si la différence est de 1, tourner le tuyau une fois
                    if (diff === 1) {
                        clicksNeeded += 1;
                    } else if (diff === 2) {
                        // Ne rien faire, car 2 est déjà égal à 4 (pas besoin de rotation)
                        continue; // Passer au tuyau suivant
                    } else {
                        // Les autres différences nécessitent une rotation normale
                        clicksNeeded += diff;
                    }
                } else {
                    // Calcul de la différence de clics nécessaires pour les autres types de tuyaux
                    let diff = (road_pattern[i][j] - base_pattern[i][j] + 4) % 4; // 4 - (road_pattern - base_pattern)
                    // Ajouter cette différence au nombre de clics nécessaires
                    clicksNeeded += diff;
                }

                // Afficher la fenêtre d'indice
                showHintWindow("Click the cell in [" + i + "][" + j + "] " + clicksNeeded + " time(s) to align it correctly.");

                hintFound = true; // Marquer qu'un indice a été trouvé
                break; // Sortir de la boucle interne
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

function countClicksNeeded() {
    let clicksNeeded = 0; // Initialisation du nombre de clics nécessaires

    // Parcours de toutes les cellules de la grille
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            // Comparaison de la valeur dans road_pattern avec base_pattern
            if (road_pattern[i][j] !== base_pattern[i][j] && pattern[i][j] !== 'Q') {
                if (pattern[i][j] === 'S') {
                    // Si c'est un tuyau simple
                    // Vérifiez d'abord s'il est déjà correctement orienté
                    if ((road_pattern[i][j] % 2) === (base_pattern[i][j] % 2)) {
                        // Si oui, aucun clic n'est nécessaire
                        continue;
                    }

                    // Sinon, il faut ajuster la rotation
                    let diff = Math.abs(road_pattern[i][j] - base_pattern[i][j]);
                    // Ajoutez le nombre minimum de clics pour ramener le tuyau à la bonne orientation
                    clicksNeeded += Math.min(diff, 4 - diff);
                } else {
                    // Pour les autres types de tuyaux, le calcul reste le même
                    let diff = (road_pattern[i][j] - base_pattern[i][j] + 4) % 4; // 4 - (road_pattern - base_pattern)
                    clicksNeeded += diff;
                }
            }
        }
    }

    return clicksNeeded;
}



function getBestScore() {
    // Appeler la fonction countClicksNeeded pour obtenir le nombre de clics nécessaires
    let clicksNeeded = countClicksNeeded();

    // Afficher le résultat dans une fenêtre contextuelle
    showPopup("You need to do at least " + clicksNeeded + " more clicks to finish the level");
}

function showPopup(message) {
    let popup = document.getElementById("popup");
    let popupText = document.getElementById("popupText");

    popupText.innerText = message;
    popup.classList.add("show");

    setTimeout(function() {
        popup.classList.remove("show");
    }, 5000); // Disparaît après 5 secondes
}

function getSolution() {
    let totalClicks = 0; // Initialiser le nombre total de clics nécessaires
    let maxTries = 1000; // Nombre maximal de tentatives pour éviter une boucle infinie
    let tryCount; // Déclaration de tryCount à l'extérieur de la boucle

    // Boucle jusqu'à ce que road_pattern soit égal à base_pattern ou jusqu'à ce que maxTries soit atteint
    for (tryCount = 0; tryCount < maxTries; tryCount++) {
        // Parcours de toutes les cellules de la grille
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                // Comparaison de la valeur dans road_pattern avec base_pattern
                if (road_pattern[i][j] !== base_pattern[i][j]) {
                    // Effectuer une rotation sur cette cellule
                    rotateCell(i, j);
                    updateBasePattern(i, j);
                    totalClicks++; // Incrémenter le nombre total de clics nécessaires
                }
            }
        }

        // Vérifier si road_pattern est maintenant égal à base_pattern
        if (checkPatternMatch()) {
            // Si oui, mettre le score à 999 et sortir de la boucle
            score = 999;
            scoreText.setText('Score: ' + score);
            break;
        }
    }

    // Si maxTries est atteint sans que les motifs ne soient alignés, afficher un message d'erreur
    if (tryCount === maxTries) {
        showPopup("Unable to find solution within the maximum number of tries.");
    }
}
function rotateCell(row, col) {
    // Récupérer la référence à l'image de la cellule
    let cellImage = gridImages[row][col];

    // Faire tourner l'image de 90 degrés
    cellImage.angle += 90;
}
