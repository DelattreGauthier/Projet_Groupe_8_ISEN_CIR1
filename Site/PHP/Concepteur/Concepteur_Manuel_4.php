<!DOCTYPE html>
<html lang="en">
 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Manual Designer Step 4</title>
    <link rel="stylesheet" href="../../CSS/style.css">
</head>

<?php include '../Fonctionnement/body.php'; ?>
<body class="Jeu"> 
        
    <?php 
        $couleur = isset($_GET["color"]) ? $_GET["color"] : "vert";
        $taille = isset($_GET["taille"]) ? $_GET["taille"] : 4;
        if (isset($_GET["pattern"])) {
            $pattern = json_encode($_GET["pattern"]);
        } else {
            header("Location: Concepteur_Manuel_2.php");
            exit();
        }

    ?>
    <div id="Etapes-Concepteur" >
        <h3 >
        Now you will have to trace the path, be careful to ensure that each square
        has at least one face in common with another square otherwise the game 
        will be insolvent. You must start the path with one of the two blue 
        square and finish on the other blue square.
        </h3>
    </div>

    <script>

    var couleur = "<?php echo $couleur; ?>";
    var taille = <?php echo $taille; ?>;
    var pattern = <?php echo $pattern; ?>;

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
    <div class="script">
        <div id="script-container" style="height: 600px;">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Concepteur_manuel_4.js"></script>
        </div>
    </div>
    
</body>

</html>