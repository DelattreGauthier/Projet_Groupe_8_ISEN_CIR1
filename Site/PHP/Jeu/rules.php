<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Rules</title>
</head>
<body>

    <div class="rules-div">
        <h1> RULES </h1>

        <div class="p-rules"> 
            <p> An inlet pipe, an outlet pipe, the aim is to make the water pass through the pipes by making them hermetic. </p>
            <p> Click on a pipe to turn it and find the right path </p>
            <p> Your score increases as you turn the pipes. </p>
            <p> Reaching the lowest score on each level will move you up the leaderboard. </p>
        </div>

        <!-- Le lien pour démarrer le niveau 1 -->
        <a class="start-button" href="Level1.php" onclick="acceptRules()">Start Level 1</a>

        <!-- Script JavaScript pour créer un cookie pour accepter les règles -->
        <script>
            function acceptRules() {
                // Créer le cookie pour accepter les règles
                createCookie('rules_accepted', 'yes', 30);
            }

            // Fonction pour créer un cookie
            function createCookie(name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                } else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            }
        </script>
    </div>

</body>
</html>
