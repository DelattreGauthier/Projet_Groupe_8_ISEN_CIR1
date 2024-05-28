<?php include '../Fonctionnement/header.php'; 
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
    <style>
        #game-container {
            background-color: rgba(0, 0, 0, 0.7);
        }

        .square-2 {
            background-color: rgba(0, 0, 128, 0.5);
        }

        .disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    </style>
    <div class="script-container">
        <!-- Écran de jeu -->
        <div id="script">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Concepteur_manuel.js"></script>
        </div>
    </div>

</body>
</html>


