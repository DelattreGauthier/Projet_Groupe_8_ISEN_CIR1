<?php
session_start();
// Définissez l'URL de l'image de profil ou une image par défaut
$profilePicUrl = isset($_SESSION['profilepic']) ? $_SESSION['profilepic'] : 'path/to/default/profile_pic.png';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOME</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="icon" href="..\..\..\Document\Image\Jeu\Dino\Dino_Vert.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</head>
<body>
    <div class="header-main">
        <a href="../Jeu/Selecteur.php" class="on">PLAY</a>
        <a href="../Settings/Settings.php" class="on">SETTINGS</a>
        <a href="../Credits/Credits.html" class="on">CREDITS</a>
    </div>  

    <div class="centremoiça">
        <div class="user-info">
        <?php if (isset($_SESSION['username'])): ?>
            <div class="dropdown">
            <!-- Display profile picture for the dropdown button -->
            <button class="dropbtn"><i class="fas fa-user-circle"></i></button>
            <div class="dropdown-content">
                <a class="dropdown-content-profile" href="../Settings/Settings.php">Profile</a>
                <a class="dropdown-content-disconnct" href="../Connexion/logout.php">Disconnect</a>
            </div>
        </div>
        <?php else: ?>
            <div class="dropdown">
                <!-- Display only icon for the dropdown button -->
                <button class="dropbtn"><i class="fas fa-user-circle"></i></button>
                <div class="dropdown-content">
                    <a href="../Settings/Settings.php">Profile</a>
                    <a href="../Connexion/connexion.php">Connect</a>
                </div>
            </div>
        <?php endif; ?>
    </div>
    
    <?php if (isset($_SESSION['username'])): ?>

        <div class="footer-main">
            <a href="../Leaderboard/leaderboard.php" class="on">LEADERBOARD</a>
            <a href="../Connexion/logout.php" class="on">DISCONNECTION</a>
        </div>

    <?php else: ?>

            <div class="footer-main">
                <a href="../Leaderboard/leaderboard.php" class="on">LEADERBOARD</a>
                <a href="../Connexion/connexion.php" class="on">CONNECTION</a>
            </div>

    <?php endif; ?>



    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js" integrity="sha512-t5g4L6UU4tVpuSEmBZp8bi3DttQz8mjEphs4Zp72jx8H6Qsk14C4nNkGZXyb6N7SLc/fO91e2lFKSUE0XfcS8A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>
</html>
