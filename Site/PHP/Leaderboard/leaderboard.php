<?php
$servername = 'localhost';
$username = 'root';
$password = 'root';
$database = 'projet2';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Requête pour récupérer les données des joueurs
    $stmt = $conn->prepare("SELECT username, score FROM joueurs ORDER BY score DESC");
    $stmt->execute();

    // Récupération des résultats
    $joueurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo "Erreur : " . $e->getMessage();
    exit();
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
<div class="lbody">
    <i class="fas fa-trophy trophy-left"></i>
    <h2 class="title"><a href="../Accueil/accueil.php" class="titrelien">Leaderboard</a></h2>
    <table>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $place = 1; // Variable pour déterminer la place
            foreach ($joueurs as $joueur) {
                echo "<tr>";
                echo "<td>{$place}</td>";
                echo "<td>{$joueur['username']}</td>";
                echo "<td>{$joueur['score']}</td>";
                echo "</tr>";
                $place++; // Incrémenter la place pour chaque joueur
            }
            ?>
        </tbody>
    </table>
    <i class="fas fa-trophy trophy-right"></i>
</div>
</body>
</html>
