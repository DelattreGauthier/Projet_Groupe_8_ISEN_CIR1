<?php
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['username'])) {
    // Retourner un message d'erreur si l'utilisateur n'est pas connecté
    http_response_code(403); // Forbidden
    echo "You must be logged in to save your score.";
    exit();
}

// Vérifier si les paramètres nécessaires sont présents dans l'URL
if (!isset($_GET['score']) || !isset($_GET['IdJeu']) || !isset($_GET['IdJoueur'])) {
    // Retourner un message d'erreur si les paramètres sont manquants
    http_response_code(400); // Bad Request
    echo "Missing parameters.";
    exit();
}

// Récupérer les données du score et de l'utilisateur
$score = $_GET['score'];
$IdJeu = $_GET['IdJeu'];
$IdJoueur = $_GET['IdJoueur'];

// Connexion à la base de données
$servername = 'localhost'; 
$username = 'root';
$password = 'root';
$database = 'projet2';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer le score existant pour cet utilisateur et ce jeu
    $stmt_existing = $conn->prepare("SELECT score FROM player_score WHERE IdJeu = :IdJeu AND IdJoueur = :IdJoueur");
    $stmt_existing->bindParam(':IdJeu', $IdJeu);
    $stmt_existing->bindParam(':IdJoueur', $IdJoueur);
    $stmt_existing->execute();
    $existing_score = $stmt_existing->fetchColumn();

    if ($existing_score === false) {
        // Si aucun score n'existe pour ce joueur et ce jeu, insérer un nouveau score
        $stmt_insert = $conn->prepare("INSERT INTO player_score (IdJeu, IdJoueur, score) VALUES (:IdJeu, :IdJoueur, :score)");
        $stmt_insert->bindParam(':IdJeu', $IdJeu);
        $stmt_insert->bindParam(':IdJoueur', $IdJoueur);
        $stmt_insert->bindParam(':score', $score);
        $stmt_insert->execute();
        echo "Score inserted successfully.";
    } elseif ($score < $existing_score) {
        // Si le nouveau score est inférieur au score existant, mettre à jour le score
        $stmt_update = $conn->prepare("UPDATE player_score SET score = :score WHERE IdJeu = :IdJeu AND IdJoueur = :IdJoueur");
        $stmt_update->bindParam(':IdJeu', $IdJeu);
        $stmt_update->bindParam(':IdJoueur', $IdJoueur);
        $stmt_update->bindParam(':score', $score);
        $stmt_update->execute();
        echo "Score updated successfully.";
    } else {
        // Si le nouveau score n'est pas inférieur au score existant, ne rien faire
        echo "Score not updated.";
    }
    

} catch (PDOException $e) {
    // Retourner un message d'erreur si une exception PDO est levée
    http_response_code(500); // Internal Server Error
    echo "Error: " . $e->getMessage();
}
?>
