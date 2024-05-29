<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Manual Designer Step 3</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <style>
        /* Ajoutez ici vos styles CSS */
        body {
            /* Ajoutez ici le style pour l'image de fond en fonction de la couleur */
            background-image: url('../../../Document/Image/Jeu/Dino/Dino_Vert.png'); /* Image de fond par défaut */
            background-size: cover;
        }
    </style>
</head>

<body class="Jeu"> 
        
<?php 
    // Récupérer la couleur choisie sur la page 2
    $couleur = isset($_GET["color"]) ? $_GET["color"] : "vert";
    // Récupérer la taille choisie sur la page 2
    $taille = isset($_GET["taille"]) ? $_GET["taille"] : 4;
?>
<div id="Etapes-Jeu">
    <h3>Now you'll have to choose where the game start and where it finish. 
        you must choose the start outside the <?php echo $taille . "x" . $taille; ?>
        grid, on the top and on the bottom of the grid.
    </h3>
</div>
<button id="nextButton" style="display: none;">Next Step</button>
<script>
    // Récupérer la couleur choisie depuis PHP
    var couleur = "<?php echo $couleur; ?>";
    var taille = <?php echo $taille; ?>;
    // Fonction pour changer l'image de fond en fonction de la couleur choisie
    function changeBackgroundImage() {
        var body = document.body;
        switch (couleur) {
            case 'bleu':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/future.jpg")';
                break;
            case 'vert':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/paris.png")'; // Remplacez par l'image verte
                break;
            case 'cuivre':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/versailles.png")'; // Remplacez par l'image cuivre
                break;
            case 'noir':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/jurisen.png")'; // Remplacez par l'image noire
                break;
            default:
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/paris.png")'; // Image de fond par défaut
                break;
        }
    }

    // Appeler la fonction pour changer l'image de fond
    changeBackgroundImage();



</script>
<div class="script-container-trois">
        <!-- Écran de jeu -->
        <div id="script-trois">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Concepteur_manuel_3.js"></script>
        </div>
    </div>
</body>

</html>
