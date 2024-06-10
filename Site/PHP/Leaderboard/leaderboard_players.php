<?php include '../Fonctionnement/header.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="icon" href="Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
<div class="lbody">
    <i id="Leader" class="fas fa-trophy trophy-left"></i>

    <?php
    // Vérifier si le niveau et l'identifiant du joueur sont spécifiés dans l'URL
    if(isset($_GET['level']) && isset($_GET['IdJeu'])) {
        $selected_level = $_GET['level'];
        $selected_IdJeu = $_GET['IdJeu'];

        // Connexion à la base de données
        $servername = 'localhost';
        $username = 'root';
        $password = 'root';
        $database = 'projet2';

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Requête pour récupérer le classement des joueurs dans le niveau spécifié
            $stmt = $conn->prepare("SELECT adherents.username, player_score.Score FROM player_score JOIN adherents ON player_score.IdJoueur = adherents.id WHERE player_score.IdJeu = :IdJeu ORDER BY player_score.Score ASC");
            $stmt->bindParam(':IdJeu', $selected_IdJeu);
            $stmt->execute();
            $joueurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            ?>

            <h2 style='padding-top:30px; color:white;'>Players rankings - Level <?php echo $selected_level; ?></h2>

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
                    echo "<td>{$joueur['Score']}</td>";
                    echo "</tr>";
                    $place++; // Incrémenter la place pour chaque joueur
                }
                ?>
                </tbody>
            </table>

            <?php
        } catch(PDOException $e) {
            echo "Erreur : " . $e->getMessage();
        }
    } else {
        // Rediriger vers la page d'accueil si le niveau ou l'identifiant du joueur n'est pas spécifié
        header("Location: ../Accueil/Accueil.php");
        exit();
    }
    ?>

    <i id="Leader" class="fas fa-trophy trophy-right"></i>
</div>
</body>
</html>

