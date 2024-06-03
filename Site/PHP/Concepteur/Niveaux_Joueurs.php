<?php
session_start();
$servername = 'localhost'; 
$username = 'root';
$password = 'root';
$database = 'projet2';

try {
    // Connexion à la base de données
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérification de la session pour obtenir le nom d'utilisateur
    if (!isset($_SESSION['username'])) {
        // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        header("Location: ../Accueil/Accueil.php");
        exit();
    }

    // Récupération de tous les niveaux sauvegardés dans la table 'concepteur'
    $stmt = $conn->query("SELECT concepteur.*, adherents.username FROM concepteur JOIN adherents ON concepteur.IdJoueur = adherents.id");

    // Affichage de la liste des niveaux
    echo "<h2>Liste des niveaux</h2>";
    echo "<ul>";
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $nom_niveau = $row['username'] . "_" . $row['IdJeu'];
        $couleur = $row['couleur'];
        $taille = $row['taille'];
        $pattern = $row['pattern'];
        $road_pattern = $row['road_pattern'];

        echo "<a href='Jeu_Joueurs.php?color=$couleur&taille=$taille&pattern=$pattern&road_pattern=$road_pattern'><li>$nom_niveau</li></a>";
    }
    echo "</ul>";
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage(); // Afficher l'erreur PDO
}
?>

