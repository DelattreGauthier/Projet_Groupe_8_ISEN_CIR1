<?php include '../Fonctionnement/header.php'; 
if (!isset($_SESSION['authentifie'])) {
    header("Location: ../Connexion/logout.php");
    exit();
}

if (!isset($_COOKIE['rules_accepted'])) {
    header("Location: rules.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en"> 

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selecteur</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    
    <style>
        body {
            font-family: Arial, sans-serif;
            background-image: url('../../../Document/Image/Fond/Selecteur/fond_selecteur.png');
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            overflow: hidden;

        }

        .level-container, .concepteur-container {
            background: rgba(0, 0, 0, 0.5) ;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 20px;
            width: 300px;
            margin: 20px;
        }

        .level-container {
            position: absolute;
            top:35%;
            left: 10%;
            padding-top:89px;
            padding-bottom:89px;
        }

        .concepteur-container {
            position: absolute;
            left: 60%;
        }

        #color-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #color-buttons a {
            margin: 10px 0;
        }

        #color-buttons button {
            background-color: rgba(0, 0, 0, 0.347);
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            font-size: 16px;
        }

        #color-buttons button:hover {
            background-color: rgba(0, 0, 0, 0.5);; 
        }

        #color-buttons button:active {
            background-color: rgba(0, 0, 0, 0.5);; 
        }

        #game-container {
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .square-2 {
            background-color: rgba(0, 0, 128, 0.5);
            border-radius: 5px;
        }

        .disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    </style>
</head>

<body>
    <div class="level-container">
        <div id="color-buttons">
            <a id="level1" href="Level1.php"><button>Story Mode</button></a>
        </div>
    </div>
    <div class="concepteur-container">
        <div id="color-buttons">
            <a href="../Concepteur/Concepteur_Manuel.php"><button>Manual Designer</button></a>
            <a href="../Concepteur/Concepteur_Auto/Concepteur_Auto.php"><button>Auto Designer</button></a>
            <a href="../Concepteur/Niveaux_Joueurs.php"><button>Players Levels</button></a>
        </div>
    </div>
    <?php 
    $output = shell_exec('./main');
    echo "<pre>$output</pre>";
    ?>
</body>
</html>
