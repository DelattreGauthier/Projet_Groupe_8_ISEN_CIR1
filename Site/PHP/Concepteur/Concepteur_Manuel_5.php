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
            background-image: url('../../../Document/Image/Jeu/Dino/Dino_Vert.png'); 
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
     $pattern  = isset($_GET["pattern"]) ? json_encode($_GET["pattern"]) : "[]";
     $road_pattern_split  = isset($_GET["road_pattern"]) ? json_encode($_GET["road_pattern"]) : "[]";
?>
<div id="Etapes-Concepteur-5">
    <h3>
    Now let's add the textures, select a box and click on the pipe you
    want to put in its place, be careful: you cannot yet rotate the pipes, so be 
    sure to place the right pipes in the right place to create the path.
    </h3>
</div>

<script>
    var couleur = "<?php echo $couleur; ?>";
    var taille = <?php echo $taille; ?>;
    var pattern = <?php echo $pattern; ?>;
    var road_pattern_split = <?php echo $road_pattern_split; ?>;
    
    function changeBackgroundImage() {
        var body = document.body;
        switch (couleur) {
            case 'bleu':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/future.jpg")';
                break;
            case 'vert':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/paris.png")'; 
                break;
            case 'cuivre':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/versailles.png")'; 
                break;
            case 'noir':
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/jurisen.png")'; 
                break;
            default:
                body.style.backgroundImage = 'url("../../../Document/Image/Fond/loading_screen/paris.png")'; 
                break;
        }
    }

    changeBackgroundImage();

</script>
<div class="script-container" style="height: 630px;">
        <div id="script">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Concepteur_manuel_5.js"></script>
        </div>
    </div>
</body>
</html>