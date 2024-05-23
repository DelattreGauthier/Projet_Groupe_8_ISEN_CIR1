<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['score'])) {
    // Récupérer le score envoyé depuis le client
    $score = $_GET['score'];

    // Vérifier si l'utilisateur est connecté et si le score n'a pas déjà été enregistré
    if (isset($_SESSION['user']) && !isset($_SESSION['score_saved'])) {
        // L'utilisateur est connecté, récupérer son identifiant
        $userId = $_SESSION['user'];

        // Insérer le score dans la base de données
        // Code à remplacer avec votre propre logique d'accès à la base de données
        // Assurez-vous de remplacer "your_username", "your_password" et "your_database" par vos informations de connexion appropriées
        $servername = "localhost";
        $username = "your_username";
        $password = "your_password";
        $dbname = "your_database";

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Préparer et exécuter la requête SQL pour mettre à jour le score dans la table des scores
            $stmt = $conn->prepare("UPDATE score SET Lv1_score=:score WHERE idJoueur=:userId");
            $stmt->bindParam(':score', $score);
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();

            // Marquer le score comme enregistré pour éviter les enregistrements multiples
            $_SESSION['score_saved'] = true;

            // Fermer la connexion à la base de données
            $conn = null;

            echo "Score enregistré avec succès!";
        } catch(PDOException $e) {
            echo "Erreur lors de l'enregistrement du score: " . $e->getMessage();
        }
    } elseif (!isset($_SESSION['user'])) {
        // L'utilisateur n'est pas connecté, ne rien faire ou renvoyer une erreur
        echo "Erreur: Utilisateur non connecté!";
    } elseif (isset($_SESSION['score_saved'])) {
        // Le score a déjà été enregistré, ne rien faire
        echo "Score déjà enregistré!";
    }
} else {
    echo "Erreur: Requête invalide!";
}
?>
