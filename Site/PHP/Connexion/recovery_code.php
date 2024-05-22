<?php
session_start(); // Démarrer la session pour utiliser les variables de session

$error = ""; // Initialisation de la variable d'erreur

$servername = 'localhost'; 
$username = 'root';
$password = 'root';
$database = 'projet2';
// Connexion à la base de données (à remplacer avec vos propres informations de connexion)
$bdd = new PDO("mysql:host=$servername;dbname=$database", $username, $password);

if (isset($_POST["recup_submit"], $_POST["recup_mail"])) {
    if (!empty($_POST["recup_mail"])) {
        $mail = htmlspecialchars($_POST["recup_mail"]);
        if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            $mailexist = $bdd->prepare("SELECT id, username FROM adherents WHERE email = ?");
            $mailexist->execute(array($mail));
            $mailexist_count = $mailexist->rowCount();
            if ($mailexist_count == 1) {
                $pseudo = $mailexist->fetch();
                $pseudo = $pseudo["username"];
                $_SESSION["recup_mail"] = $mail;
                $recup_code = "";
                for ($i = 0; $i < 8; $i++) { 
                    $recup_code .= mt_rand(0, 9);
                }
                // Stocker le code de récupération dans la session
                $_SESSION["recup_code"] = $recup_code;

                // Insérer le code de récupération dans la table 'recuperation'
                $insert_code = $bdd->prepare("INSERT INTO recuperation (mail, code) VALUES (?, ?)");
                $insert_code->execute(array($mail, $recup_code));

                // Inclure le fichier mail.php et appeler la fonction pour envoyer l'email
                require '../../../mail.php';
                sendRecoveryMail($mail, $recup_code);

                // Redirection vers la page de saisie du code de récupération
                header("Location: recovery_code.php");
                exit();
            } else {
                $error = "Cette adresse mail n'est pas enregistrée";
            }
        } else {
            $error = "Adresse-mail invalide";
        }
    } else {
        $error = "Veuillez entrer votre adresse e-mail"; // Définition du message d'erreur
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
    <!-- Formulaire de récupération de mot de passe -->
    <div class="wrapper-body">
        <h4>Reset your password</h4>
        <form method="post">
            <hr>
            <div class="input-box"> 
                <input type="email" name="recup_mail" placeholder="Email">
            </div>
            <button type="submit" class="btn" name="recup_submit">Submit</button>
        </form>
        <?php if (!empty($error)) { echo '<span style="color:red">'. $error.'</span>'; } ?>
    </div>
</div>
</body>
</html>
