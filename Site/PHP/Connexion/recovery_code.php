<?php

session_start(); // Démarrer la session pour utiliser les variables de session

$error = ""; // Initialisation de la variable d'erreur

if (isset($_POST["reset_password_submit"], $_POST["new_password"], $_POST["confirm_password"])) {
    $new_password = $_POST["new_password"];
    $confirm_password = $_POST["confirm_password"];

    // Vérifier si les nouveaux mots de passe correspondent
    if ($new_password === $confirm_password) {
        // Vérifier si le code de récupération est valide
        if (isset($_SESSION["recup_code"]) && isset($_SESSION["recup_mail"])) {
            $recup_code = $_SESSION["recup_code"];
            $recup_mail = $_SESSION["recup_mail"];

            // Vérifier si le code entré correspond au code de récupération stocké dans la session
            if ($_POST["recup_code"] === $recup_code) {
                // Connexion à la base de données
                $servername = 'localhost'; 
                $username = 'root';
                $password = 'root';
                $database = 'projet2';
                $bdd = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

                // Hasher le nouveau mot de passe
                $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

                // Mettre à jour le mot de passe dans la table 'adherents'
                $update_password = $bdd->prepare("UPDATE adherents SET mot_de_passe = ? WHERE email = ?");
                $update_password->execute(array($hashed_password, $recup_mail));

                // Réinitialiser les variables de session
                unset($_SESSION["recup_code"]);
                unset($_SESSION["recup_mail"]);

                // Redirection vers une page de confirmation ou de connexion
                header("Location: connexion.php");
                exit();
            } else {
                $error = "Code de récupération invalide";
            }
        } else {
            $error = "Une erreur est survenue. Veuillez réessayer.";
        }
    } else {
        $error = "Les nouveaux mots de passe ne correspondent pas.";
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Reset Password</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<body>
    <div class='ebody'>
        <!-- Formulaire de réinitialisation du mot de passe -->
        <div class="wrapper-body">
            <h4>Reset Your Password</h4>
            <form method="post">
                <hr>
                <div class="input-box">
                    <input type="text" name="recup_code" placeholder="Recovery Code">
                </div>
                <div class="input-box">
                    <input type="password" name="new_password" placeholder="New Password">
                </div>
                <div class="input-box">
                    <input type="password" name="confirm_password" placeholder="Confirm New Password">
                </div>
                <button type="submit" class="btn" name="reset_password_submit">Reset Password</button>
            </form>
            <?php if (!empty($error)) {
                echo '<span style="color:red">' . $error . '</span>';
            } ?>
        </div>
    </div>
</body>

</html>
