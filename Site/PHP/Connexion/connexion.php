<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Sign up</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>

<div class='ebody'>
    <!-- Formulaire de connexion -->
    <div class="wrapper-body">
        <h4>Sign up</h4>
        <form method="post">
            <hr>
            <div class="input-box"> 
                <input type="text" name="login" placeholder="Username or Email">
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="Password">
                <i class='bx bx-lock-alt'></i>
            </div>
            <button type="submit" class="btn" name="submit">Submit</button>
            
            <p>You don't have an account? <a href="inscription.php">Sign up</a></p>
        </form>
    </div>

    <div id="message-container"></div>

    <script>
        <?php if (!empty($message)) { ?>
            document.getElementById('message-container').innerHTML = "<p><?php echo $message; ?></p>";
        <?php } ?>
    </script>
</div>

    

    <?php
    session_start();
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

            // Validation des champs du formulaire
            if (empty($login) || empty($password)) {
                $message = "Tous les champs sont obligatoires.";
            } else {
                // Vérifier si le login est un email ou un nom d'utilisateur
                if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
                    // Rechercher par email
                    $stmt = $conn->prepare("SELECT * FROM adherents WHERE email = :login");
                } else {
                    // Rechercher par nom d'utilisateur
                    $stmt = $conn->prepare("SELECT * FROM adherents WHERE username = :login");
                }

                $stmt->bindParam(':login', $login);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($user) {
                    // L'utilisateur existe, vérifier le mot de passe
                    if (password_verify($password, $user['mot_de_passe'])) {
                        // Mot de passe correct
                        $message = "Connexion réussie.";
                    } else {
                        // Mot de passe incorrect
                        $message = "Mot de passe incorrect.";
                    }
                } else {
                    // L'utilisateur n'existe pas
                    $message = "Nom d'utilisateur ou adresse e-mail inconnu(e).";
                }
            }
        } catch (PDOException $e) {
            $message = "Erreur : " . $e->getMessage();
        }

        $conn = null;
    }
    ?>



		
</div>
</body>
</html>