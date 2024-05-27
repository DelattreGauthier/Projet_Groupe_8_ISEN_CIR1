<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HOME</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
</head>
<body>
    <div class="header-main">
        <a href="../Jeu/Level1.php" class="on">PLAY</a>
        <a href="../Settings/Settings.html" class="on">SETTINGS</a>
        <a href="../Credits/Credits.html" class="on">CREDITS</a>
    </div>

    <div class="centremoiça">
        <div  class="user-info">
            <?php if (isset($_SESSION['username'])): ?>
                <div class="dropdown">
                    <button class="dropbtn"><?php echo htmlspecialchars($_SESSION['username']); ?> <i class="fas fa-user-circle"></i></button>
                    <div class="dropdown-content">
                        <a href="../Connexion/logout.php">Disconnected</a>
                    </div>
                </div>
            <?php else: ?>
                <a href="../Connexion/connexion.php" class="on"></a>
            <?php endif; ?>
        </div>
    </div>

    <div class="footer-main">
        <a href="../Leaderboard/leaderboard.php" class="on">LEADERBOARD</a>
        <a href="../Connexion/connexion.php" class="on">CONNECTION</a>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js" integrity="sha512-t5g4L6UU4tVpuSEmBZp8bi3DttQz8mjEphs4Zp72jx8H6Qsk14C4nNkGZXyb6N7SLc/fO91e2lFKSUE0XfcS8A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>
</html>
