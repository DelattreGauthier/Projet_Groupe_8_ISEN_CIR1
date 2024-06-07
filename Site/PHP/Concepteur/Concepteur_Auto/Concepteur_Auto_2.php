<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Manual Designer Step 3</title>
    <link rel="stylesheet" href="../../../CSS/style.css">
    <style>
        body {
            background-image: url('../../../../Document/Image/Jeu/Dino/Dino_Vert.png'); 
            background-size: cover;
        }
    </style>
</head>

<body class="Jeu"> 
        
<?php 
     $couleur = isset($_GET["color"]) ? $_GET["color"] : "vert";
     $taille = isset($_GET["taille"]) ? $_GET["taille"] : 4;
     $pattern = isset($_GET["pattern"]) ? json_encode($_GET["pattern"]) : "[]";
    $road_pattern = isset($_GET["road_pattern"]) ? json_encode($_GET["road_pattern"]) : "[]";
?>
<div id="Etapes-Concepteur-6">
    <h3>
    To complete the creation of your level you have to turn the pipes as if you 
    are trying to complete the level, if you like the level completed click 
    COMPLETE, and if you made a mistake click RESET.
    </h3>
</div>

<script>
    var couleur = "<?php echo $couleur; ?>";
    var taille = <?php echo $taille; ?>;
    var pattern = <?php echo $pattern; ?>;
    var road_pattern_split = <?php echo $road_pattern; ?>;
    function changeBackgroundImage() {
        var body = document.body;
        switch (couleur) {
            case 'bleu':
                body.style.backgroundImage = 'url("../../../../Document/Image/Fond/loading_screen/future.jpg")';
                break;
            case 'vert':
                body.style.backgroundImage = 'url("../../../../Document/Image/Fond/loading_screen/paris.png")'; 
                break;
            case 'cuivre':
                body.style.backgroundImage = 'url("../../../../Document/Image/Fond/loading_screen/versailles.png")'; 
                break;
            case 'noir':
                body.style.backgroundImage = 'url("../../../../Document/Image/Fond/loading_screen/jurisen.png")'; 
                break;
            default:
                body.style.backgroundImage = 'url("../../../../Document/Image/Fond/loading_screen/paris.png")'; 
                break;
        }
    }

    changeBackgroundImage();

</script>
<div class="script-container" style="height: 630px;">
        <!-- Écran de jeu -->
        <div id="script-concepteur">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../../Javascript/Concepteur_auto.js"></script>
        </div>
    </div>
</body>
</html>