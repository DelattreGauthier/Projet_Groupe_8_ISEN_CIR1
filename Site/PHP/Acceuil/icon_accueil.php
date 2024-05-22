<?php
// home_icon.php
?>

<style>
    .home-icon {
        position: fixed;
        top: 20px;
        left: 20px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1000;
    }

    .home-icon img {
        width: 70%;
        height: 70%;
    }
</style>

<div class="home-icon" onclick="window.location.href='Accueil.php'">
    <img src="th.png" alt="Homelogo">
</div>
