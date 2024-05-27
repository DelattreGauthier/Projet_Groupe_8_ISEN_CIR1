<?php
    session_start();
    $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Invité';
?>
<header>
    <div class="username">
    <a href="../Accueil/Accueil.php">Bonjour <?php echo htmlspecialchars($username); ?></a>
    </div>
</header>
