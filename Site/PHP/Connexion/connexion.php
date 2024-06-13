<?php include '../Fonctionnement/header.php'; ?>

<?php
if (isset($_SESSION['authentifie']) && $_SESSION['authentifie'] === true) {
    header("Location: ../Accueil/Accueil.php");
    exit();
}

$message = '';

if (isset($_POST['submit'])) {
    $servername = 'localhost'; 
    $username = 'root';
    $password = 'root';
    $database = 'projet2';

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $login = $_POST['login'];
        $password = $_POST['password'];

        if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
            $stmt = $conn->prepare("SELECT * FROM adherents WHERE email = :login");
        } else {
            $stmt = $conn->prepare("SELECT * FROM adherents WHERE username = :login");
        }

        $stmt->bindParam(':login', $login);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            if (password_verify($password, $user['mot_de_passe'])) {
                $_SESSION['username'] = $user['username']; // Enregistrer le pseudo dans la session
                $_SESSION['authentifie'] = true;
                header("Location: ../Accueil/Accueil.php"); // Redirection vers la page d'accueil
                exit();
            } else {
                $message = "Mot de passe incorrect.";
            }
        } else {
            $message = "Nom d'utilisateur ou adresse e-mail inconnu(e).";
        }
    
    } catch (PDOException $e) {
        $message = "Erreur : " . $e->getMessage();
    }

    $conn = null;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Log in</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>

<?php include '../Fonctionnement/body.php'; ?>
<body>

<div class='ebody'>
<div class="Accueil-container">
  <?php if (isset($_SESSION['username'])): ?>
    <div class="user-info">
        <div class="dropdown">
            <button class="dropbtn"><i class="fas fa-user-circle"></i></button>
            <div class="dropdown-content">
                <a href="../Settings/Settings.html">Paramètres</a>
                <a href="../Connexion/logout.php">Se déconnecter</a>
            </div>
        </div>
    </div>
  <?php endif; ?>
</div>
    <div class="wrapper-body">
            <h4>Log in</h4>
            <form method="post">
                <hr>
                <div class="input-box"> 
                    <input type="text" name="login" placeholder="Username or Email" required>
                    <i class='bx bxs-user'></i>
                </div>
                <div class="input-box">
                    <input type="password" name="password" placeholder="Password" required>
                    <i class='bx bx-lock-alt'></i>
                </div>
                <button type="submit" class="btn" name="submit">Submit</button>
                
                <p>Don't have an account? <a href="inscription.php" class="linko">Sign up</a></p>
                <p>Password forgotten? <a href="recovery_code.php" class='linko'>Click Here</a></p>
            </form>
    </div>

    <div id="message-container"></div>

    <script>
        <?php if (!empty($message)) { ?>
            document.getElementById('message-container').innerHTML = "<p><?php echo $message; ?></p>";
        <?php } ?>
    </script>
</div>
</body>
</html>
