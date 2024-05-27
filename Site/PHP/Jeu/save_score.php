<?php
session_start();
$servername = 'localhost'; 
$username = 'root';
$password = 'root';
$database = 'projet2';
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['score']) && isset($_GET['level'])) {
        if (isset($_SESSION['username'])) {
            $username = $_SESSION['username'];
            $score = $_GET['score'];
            $level = $_GET['level'];
            if ($score > 999) {
                $score = 997; // Limiter le score à 997 si nécessaire
            }
            // Récupérer le score actuel dans la base de données
            $bestStmt = $conn->prepare("SELECT Lv{$level}_score FROM score WHERE idJoueur = (SELECT id FROM adherents WHERE username = :username)");
            $bestStmt->bindParam(':username', $username);
            $bestStmt->execute();
            $bestRow = $bestStmt->fetch(PDO::FETCH_ASSOC);
            $bestScore = $bestRow["Lv{$level}_score"];

            // Comparer les scores et mettre à jour si nécessaire
            if ($bestScore === null || $score < $bestScore) {
                $stmt = $conn->prepare("UPDATE score SET Lv{$level}_score = :score WHERE idJoueur = (SELECT id FROM adherents WHERE username = :username)");
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':score', $score);
                $stmt->execute();
            }
        } else {
            echo "Error: You must be logged in to save your score.";
        }
    } else {
        echo "Error: Invalid request.";
        header("Location:../Accueil/Accueil.php");
    }
} catch (PDOException $e) {
    $message = "Erreur : " . $e->getMessage();
}

$conn = null;
?>



