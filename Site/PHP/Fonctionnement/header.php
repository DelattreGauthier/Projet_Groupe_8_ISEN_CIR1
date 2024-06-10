<?php
    session_start();
    $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
?>
<head>
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
</head>
<header>
    <div class="username">
        <a href="../Accueil/Accueil.php">Hello <?php echo htmlspecialchars($username); ?></a>
    </div>
</header>
