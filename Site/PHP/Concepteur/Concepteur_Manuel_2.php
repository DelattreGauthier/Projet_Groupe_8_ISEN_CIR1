<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Manual Designer Step 2</title>
    <link rel="stylesheet" href="../../CSS/style.css">
</head>

<body>

    <div id="Etapes">
        <h3>You must choose the color of the pipes and the size of the grid on which you will place them</h3>
        <?php
        $color = 'vert';
        $taille = 6;

        if (isset($_POST['color']) && isset($_POST['size'])) {
            $color = $_POST['color'];
            $taille = $_POST['size'];
            header("Location: Concepteur_Manuel_3.php?color=$color&taille=$taille");
            exit();
        }
        ?>
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
    </div>

</body>

</html>

