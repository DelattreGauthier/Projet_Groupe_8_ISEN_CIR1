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
<script>
    var couleur = "<?php echo $couleur; ?>";
    var taille = <?php echo $taille; ?>;
    var img_pattern = <?php echo $pattern; ?>;
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
    <div class="concepteur-container">
        <div id="color-buttons" style="display: flex; flex-direction: column; align-items: center;">
            <a href="../Accueil/Accueil.php"><button>Home</button></a>
            <a href="../Concepteur/Niveaux_Joueurs.php"><button>Players Levels</button></a>
        </div>
    </div>
    <div class="script-container">
        <!-- Écran de jeu -->
        <div id="script">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/Jeu_Joueurs.js"></script>
        </div>
        
    </div>

</body>
</html>

