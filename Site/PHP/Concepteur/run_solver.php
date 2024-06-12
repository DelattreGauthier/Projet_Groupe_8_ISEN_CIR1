<?php
// Exécute le solveur.exe
exec('solveur.exe');

// Inclut le fichier output.php s'il existe
if (file_exists('output.php')) {
    include 'output.php';

} else {
    echo 'Erreur : Le fichier output.php n\'existe pas.';
}
?>
