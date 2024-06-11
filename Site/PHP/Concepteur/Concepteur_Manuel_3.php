<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Manual Designer Step 3</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <style>
        body {
            background-image: url('../../../Document/Image/Jeu/Dino/Dino_Vert.png'); /* Image de fond par défaut */
            background-size: cover;
        }
    </style>
</head>

<?php include '../Fonctionnement/body.php'; ?>
<body class="Jeu"> 
        
<?php 
    $couleur = isset($_GET["color"]) ? $_GET["color"] : "vert";
    if (isset($_GET["taille"])) {
        $taille = $_GET["taille"];
    } else {
        header("Location: Concepteur_Manuel_2.php");
        exit();
    }
?>
<div id="Etapes-Concepteur-3">
    <h3>Now you'll have to choose where the game start and where it finish. 
        you must choose the start outside the <?php echo $taille . "x" . $taille; ?>
        grid, on the top and on the bottom of the grid.
    </h3>
</div>
<button id="nextButton" style="display: none;">Next Step</button>
<script>
    var couleur = "<?php echo $couleur; ?>";
    var taille = <?php echo $taille; ?>;

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

    changeBackgroundImage();



</script>
<div class="script-container"  style="height: 600px;">
        <div id="script">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Concepteur_manuel_3.js"></script>
        </div>
    </div>
</body>

</html>
