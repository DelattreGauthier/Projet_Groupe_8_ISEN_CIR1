<?php
session_start();
$servername = 'localhost'; 
$username = 'root';
$password = 'root';
$database = 'projet2';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérification de la session pour obtenir le nom d'utilisateur
    if (!isset($_SESSION['username'])) {
        // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        header("Location: ../../PHP/Connexion/connexion.php");
        exit();
    }

    // Récupération des données postées depuis le formulaire
    $couleur = isset($_GET["color"]) ? $_GET["color"] : "vert";
    $taille = isset($_GET["taille"]) ? $_GET["taille"] : 4;
    $pattern  = isset($_GET["pattern"]) ? json_encode($_GET["pattern"]) : "[]";
    if (isset($_GET["road_pattern"])) {
        $road_pattern = json_encode($_GET["road_pattern"]);
    } else {
        header("Location: ../../PHP/Connexion/connexion.php");
        exit();
    }

    // Préparation de la requête SQL
    $stmt = $conn->prepare("INSERT INTO concepteur (IdJoueur, couleur, taille, pattern, road_pattern) VALUES ((SELECT id FROM adherents WHERE username = :username), :couleur, :taille, :pattern, :road_pattern)");

    // Exécution de la requête
    $stmt->execute(array(
        ':username' => $_SESSION['username'],
        ':couleur' => $couleur,
        ':taille' => $taille,
        ':pattern' => $pattern,
        ':road_pattern' => $road_pattern
    ));
    header("Location: ../Jeu/Level1.php");
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage(); // Afficher l'erreur PDO
}

$conn = null;
?>
