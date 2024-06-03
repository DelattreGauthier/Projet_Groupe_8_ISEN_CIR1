<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Level 1</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <style>
        h2 {
            text-align: center; /* Centre le titre */
        }

        table {
            border-collapse: collapse; /* Fusionne les bordures de la table */
            width:60%;
        }

        th, td {
            padding: 10px; /* Ajoute de l'espace autour du contenu de la cellule */
            text-align: left; /* Alignement du texte à gauche */
            border-bottom: 1px solid #ddd; /* Bordure inférieure pour chaque ligne */
        }

        th {
            background-color: #f2f2f2; /* Couleur de fond pour les en-têtes */
        }

        ul {
            list-style-type: none; /* Supprime les puces de liste */
            padding: 0;
            margin: 0;
        }

        ul li a {
            text-decoration: none; /* Supprime les soulignements des liens */
            color: red; /* Couleur du texte des liens */
            display: block; /* Les liens occupent toute la largeur disponible */
        }

        ul li a:hover {
            color: darkred; /* Changement de couleur au survol */
        }

        ul li a.visited {
            color: darkred; /* Lien visité */
        }
    </style>
</head>
<body class="lbody">
    <h2>Liste des niveaux</h2>
    <table>
        <thead>
            <tr>
                <th>Nom du niveau</th>
                <th>Taille de la grille</th>
                <th>Couleur de la grille</th>
            </tr>
        </thead>
        <tbody>
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
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $nom_niveau = $row['username'] . "_" . $row['IdJeu'];
                    $couleur = $row['couleur'];
                    $taille = $row['taille'];
                    $pattern = $row['pattern'];
                    $road_pattern = $row['road_pattern'];

                    // Vérifier si le niveau a déjà été joué
                    $played_class = '';
                    if (isset($_SESSION['played_levels']) && in_array($nom_niveau, $_SESSION['played_levels'])) {
                        $played_class = 'visited'; // Ajouter la classe 'visited' si le niveau a déjà été joué
                    }

                    echo "<tr>";
                    echo "<td><a style='text-decoration: none;color: red;display: block;' href='Jeu_Joueurs.php?color=$couleur&taille=$taille&pattern=$pattern&road_pattern=$road_pattern'><span class='$played_class'>$nom_niveau</span></a></td>";
                    echo "<td>$taille</td>"; // Afficher la taille de la grille
                    echo "<td>$couleur</td>"; // Afficher la couleur de la grille
                    echo "</tr>";
                }
            } catch (PDOException $e) {
                echo "Erreur : " . $e->getMessage(); // Afficher l'erreur PDO
            }
            ?>
        </tbody>
    </table>
</body>