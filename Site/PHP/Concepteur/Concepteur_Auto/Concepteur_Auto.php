<?php
$color = 'vert';
$taille = 6;

$pattern_php = "[]"; 
$road_pattern_php = "[]";

if (isset($_POST['color']) && isset($_POST['size'])) {
    $color = $_POST['color'];
    $taille = $_POST['size'];

    // Écriture des données dans le fichier input.txt
    $data = $taille;
    file_put_contents('input.txt', $data);

    // Exécution du programme principal
    exec(__DIR__ . '/main 2>&1', $output, $return_value);

    // Vérifier si l'exécution s'est bien déroulée
    if ($return_value !== 0) {
        foreach ($output as $line) {
            echo $line . "<br>";
        }
    } 

    include 'index.php';
    
    // Assigner les valeurs des tableaux PHP aux variables pour JavaScript
    $pattern_php = json_encode($pattern);
    $road_pattern_php = json_encode($road_pattern);
    ?>
    <script>
    var couleur = "<?php echo $color; ?>";
    var taille = <?php echo $taille; ?>;
    var pattern = <?php echo $pattern_php; ?>;
    var road_pattern = <?php echo $road_pattern_php; ?>;
    window.location.href = "Concepteur_Auto_2.php?color=" + couleur + "&taille=" + taille + "&pattern=" + pattern + "&road_pattern=" + road_pattern;
    </script>
<?php
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Manual Designer Step 2</title>
    <link rel="stylesheet" href="../../../CSS/style.css">
</head>

<body>

    <div id="Etapes">
        <h3>You must choose the color of the pipes and the size of the grid on which you will place them</h3>
    </div>

        <div class="controls-container-concepteur">
        <form method="post">
                <div id="color-buttons" class="color-buttons-concepteur">
                    <input type="radio" id="bleuButton" name="color" value="bleu" <?php if ($color === 'bleu') echo 'checked'; ?>>
                    <label for="bleuButton" class="button">Blue</label>

                    <input type="radio" id="vertButton" name="color" value="vert" <?php if ($color === 'vert') echo 'checked'; ?>>
                    <label for="vertButton" class="button">Green</label>

                    <input type="radio" id="cuivreButton" name="color" value="cuivre" <?php if ($color === 'cuivre') echo 'checked'; ?>>
                    <label for="cuivreButton" class="button">Copper</label>

                    <input type="radio" id="noirButton" name="color" value="noir" <?php if ($color === 'noir') echo 'checked'; ?>>
                    <label for="noirButton" class="button">Black</label>
                </div>
                <div id="size-buttons" class="size-buttons-concepteur">
                    <input type="radio" id="quatrexquatre" name="size" value="4" <?php if ($taille == 4) echo 'checked'; ?>>
                    <label for="quatrexquatre" class="button">4x4</label>

                    <input type="radio" id="sixxsix" name="size" value="6" <?php if ($taille == 6) echo 'checked'; ?>>
                    <label for="sixxsix" class="button">6x6</label>

                    <input type="radio" id="huigtxhuigt" name="size" value="8" <?php if ($taille == 8) echo 'checked'; ?>>
                    <label for="huigtxhuigt" class="button">8x8</label>

                    <input type="radio" id="dixxdix" name="size" value="10" <?php if ($taille == 10) echo 'checked'; ?>>
                    <label for="dixxdix" class="button">10x10</label>
                </div>
                <button type="submit" id="stepButton" style="position: fixed; bottom: 20px; right: 20px;">Next Step</button>
            </form>
        </div>

</body>

</html>



