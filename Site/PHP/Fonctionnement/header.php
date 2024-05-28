<?php
    session_start();
    $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
?>
<header>
    <div class="username">
    <a href="../Accueil/Accueil.php">Hello <?php echo htmlspecialchars($username); ?></a>
    </div>
</header>
