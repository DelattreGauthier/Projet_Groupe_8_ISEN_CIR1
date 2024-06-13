<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Players Levels</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <style>
        h2 {
            text-align: center; 
        }
        
        .table-wrapper {
            height: 400px; 
            overflow-y:auto;
            -ms-overflow-style:none;
            border-radius: 10px;
        }
        .table-wrapper::-webkit-scrollbar{
            display:none;
        }
        table {
            border-collapse: collapse;
            width:100%;
        }

        th, td {
            padding: 10px; 
            text-align: left; 
            border-bottom: 1px solid #ddd; 
        }

        th {
            background-color: #f2f2f2; 
        }

        ul {
            list-style-type: none; 
            padding: 0;
            margin: 0;
        }

        ul li a {
            text-decoration: none;
            color: red;
            display: block;
        }

        ul li a:hover {
            color: darkred;
        }

        ul li a.visited {
            color: darkred;
        }
    </style>
</head>
<body style="overflow-y:hidden;" class="lbody">
<?php include '../Fonctionnement/header.php'; ?>
<?php include '../Fonctionnement/body.php'; ?>
<div class="page-wrapper">
    <h2 style="color:white;">List of levels</h2>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>Level Name</th>
                    <th>Size of the grid</th>
                    <th>Color of the pipes</th>
                    <th>Leaderboard</th> 
                </tr>
            </thead>
            <tbody>
                <?php
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
                    $stmt_userId = $conn->prepare("SELECT id FROM adherents WHERE username = :username");
                    $stmt_userId->bindParam(':username', $_SESSION['username']);
                    $stmt_userId->execute();
                    $userId = $stmt_userId->fetchColumn();
                    // Récupération de tous les niveaux sauvegardés dans la table 'concepteur'
                    $stmt = $conn->query("SELECT concepteur.*, adherents.username FROM concepteur JOIN adherents ON concepteur.IdJoueur = adherents.id");


                    $color_translations = array(
                        "cuivre" => "Copper",
                        "noir" => "Black",
                        "vert" => "Green",
                        "bleu" => "Blue"
                    );
                    // Affichage de la liste des niveaux
                    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                        $nom_niveau = $row['username'] . "_" . $row['IdJeu'];
                        $couleur = $row['couleur'];
                        $taille = $row['taille'];
                        $pattern = $row['pattern'];
                        $road_pattern = $row['road_pattern'];

                        $played_class = '';
                        if (isset($_SESSION['played_levels']) && in_array($nom_niveau, $_SESSION['played_levels'])) {
                            $played_class = 'visited'; // Ajouter la classe 'visited' si le niveau a déjà été joué
                        }
                        $translated_color = isset($color_translations[$couleur]) ? $color_translations[$couleur] : $couleur;
                        echo "<tr>";
                        echo "<td><a style='text-decoration: none;color: red;display: block;' href='Jeu_Joueurs.php?level=$nom_niveau&color=$couleur&taille=$taille&pattern=$pattern&road_pattern=$road_pattern&IdJeu={$row['IdJeu']}&IdJoueur=$userId'><span class='$played_class'>$nom_niveau</span></a></td>";

                        echo "<td>$taille X $taille</td>";
                        echo "<td>$translated_color</td>";
                        echo '<td style="text-align: center;"><a style="text-decoration: none; color: blue; display: block;" href="../../../Site/PHP/Leaderboard/leaderboard_players.php?level=' . $nom_niveau . '&IdJeu=' . $row['IdJeu'] . '" onclick="window.location.reload();"><img src="../../../Document/Image/Leaderboard/leaderboard.png" alt="Classement_' . $nom_niveau . '" class="' . $played_class . '" style="width: 20px; height: 20px;" /></a></td>';
                        echo "</tr>";
                    }
                } catch (PDOException $e) {
                    echo "Erreur : " . $e->getMessage(); 
                }
                ?>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>
