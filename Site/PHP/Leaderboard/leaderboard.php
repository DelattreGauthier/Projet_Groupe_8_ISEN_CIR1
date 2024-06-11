<?php include '../Fonctionnement/header.php'; ?>

<!DOCTYPE html>
<html lang="fr" >
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

<?php include '../Fonctionnement/body.php'; ?>
<body>
<div class="lbody">
    <i id="Leader" class="fas fa-trophy trophy-left"></i>
    <h2 id="Leader">
        <form action="leaderboard.php" method="get">
            <select name="level" id="liste" onchange="this.form.submit()">
                <option value="">Select Level</option>
                <option value="total">Total</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
                <option value="5">Level 5</option>
                <option value="6">Level 6</option>
                <option value="7">Level 7</option>
                <option value="8">Level 8</option>
            </select>
        </form>
    </h2>

    <?php
    $servername = 'localhost';
    $username = 'root';
    $password = 'root';
    $database = 'projet2';

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if(isset($_GET['level'])) {
            // Récupérer le niveau sélectionné depuis le formulaire
            $selected_level = $_GET['level'];
            if($selected_level != "total") {
                // Requête pour récupérer les données des joueurs en fonction du niveau sélectionné
                $stmt = $conn->prepare("SELECT adherents.username, score.Lv{$selected_level}_score AS score FROM score JOIN adherents ON score.idJoueur = adherents.id ORDER BY Lv{$selected_level}_score ASC");
                $stmt->execute();
                $joueurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                // Calcul du classement total
                $stmt = $conn->query("SELECT adherents.username, SUM(score.Lv1_score + score.Lv2_score + score.Lv3_score + score.Lv4_score + score.Lv5_score + score.Lv6_score + score.Lv7_score + score.Lv8_score) AS total_score FROM score JOIN adherents ON score.idJoueur = adherents.id GROUP BY adherents.username ORDER BY total_score ASC");
                $totalJoueurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        } else {
            // Calcul du classement total
            $selected_level="total";
            $stmt = $conn->query("SELECT adherents.username, SUM(score.Lv1_score + score.Lv2_score + score.Lv3_score + score.Lv4_score + score.Lv5_score + score.Lv6_score + score.Lv7_score + score.Lv8_score) AS total_score FROM score JOIN adherents ON score.idJoueur = adherents.id GROUP BY adherents.username ORDER BY total_score ASC");
            $totalJoueurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        }
    } catch(PDOException $e) {
        echo "Erreur : " . $e->getMessage();
        exit();
    }
    ?>

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
            if($selected_level != "total") {
                foreach ($joueurs as $joueur) {
                    if($joueur['score'] !== NULL) {
                        echo "<tr>";
                        echo "<td>{$place}</td>";
                        echo "<td>{$joueur['username']}</td>";
                        echo "<td>{$joueur['score']}</td>";
                        echo "</tr>";
                        $place++; // Incrémenter la place pour chaque joueur
                    }
                }
            } else {
                foreach ($totalJoueurs as $joueur) {
                    if($joueur['total_score'] !== NULL) {
                        echo "<tr>";
                        echo "<td>{$place}</td>";
                        echo "<td>{$joueur['username']}</td>";
                        echo "<td>{$joueur['total_score']}</td>";
                        echo "</tr>";
                        $place++; // Incrémenter la place pour chaque joueur
                    }
                }
            }
            ?>
        </tbody>
    </table>

    <i id="Leader" class="fas fa-trophy trophy-right"></i>
</div>
</body>
</html>


