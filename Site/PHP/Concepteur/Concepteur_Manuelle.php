<?php 
include '../Fonctionnement/header.php'; 
if (!isset($_SESSION['authentifie'])) {
    header("Location: ../Connexion/logout.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en"> 

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Level 1</title>
    <link rel="stylesheet" href="../../CSS/style.css">

</head>

<body>
    <div class="script-container">
        <!-- Écran de jeu -->
        <div id="script">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Concepteur_Manuelle.js"></script>
        </div>
    </div>

    <!-- Ajout des rectangles -->
    <div id="Etapes">
    <h3>Bienvenue dans le concepteur manuelle, pour crée un niveau vous-même, on va vous demander de suivre plusieurs étapes afin de pouvoir facilement réaliser votre niveau, nous vous conseillons d'abord d'imaginer au brouillon votre niveau.
    </div>
  
    <!-- Fin de l'ajout des rectangles -->
</body>
</html>
