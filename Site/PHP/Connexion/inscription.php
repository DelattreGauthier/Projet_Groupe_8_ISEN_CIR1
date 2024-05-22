<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Sign up</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet">
   
</head>
<body>
<div>
    <!-- Formulaire d'ajout -->
    <div class="wrapper-body">
        <a id="redirect_singup" href="../Accueil.php"><h4>Sign up</h4></a>
        <form method="post" enctype="multipart/form-data">
            <hr>
            <div class="input-box">
                <input type="text" name="username" placeholder="Username" required>
                <i class='bx bxs-user'></i>
            </div>
            <div class="input-box"> 
                <input type="email" name="email" placeholder="Email" required>
                <i class='bx bxs-envelope'></i>
            </div>
            <div class="input-box">
                <input type="password" name="password" placeholder="Password" required>
                <i class='bx bx-lock-alt'></i>
            </div>
            <div class="password-requirements">
                <p>Le mot de passe doit contenir :</p>
                <ul>
                    <li>Au moins 10 caractères</li>
                    <li>Au moins une majuscule</li>
                    <li>Au moins une minuscule</li>
                    <li>Au moins un caractère spécial</li>
                </ul>
            </div>
            <div class="profile-pic-container">
                <img id="profile-pic" src="https://via.placeholder.com/150" alt="Profile Picture">
                <input type="file" id="profile-pic-input" name="profile_picture" accept="image/*">
            </div>
            <button type="submit" class="btn" name="submit">Submit</button>
            <p>Already have an account? <a href="connexion.php">sign in</a></p>
        </form>
    </div>

    <div id="message-container"></div>

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

            $username = $_POST['username'];
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Validation des champs du formulaire
            if (empty($username) || empty($email) || empty($password)) {
                $message = "Tous les champs sont obligatoires.";
            } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $message = "Adresse e-mail invalide.";
            } elseif (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{10,}$/', $password)) {
                $message = "Le mot de passe doit contenir au moins 10 caractères, dont une majuscule, une minuscule et un caractère spécial.";
            } else {
                // Vérifier si l'email ou le pseudo existe déjà
                $stmt = $conn->prepare("SELECT * FROM adherents WHERE username = :username OR email = :email");
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':email', $email);
                $stmt->execute();
                $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($existingUser) {
                    if ($existingUser['email'] === $email) {
                        $message = "Il semble que vous avez déjà un compte avec cette adresse e-mail. Veuillez vous connecter.";
                    } elseif ($existingUser['username'] === $username) {
                        $message = "Nom d'utilisateur déjà utilisé. Veuillez en choisir un autre.";
                    }
                } else {
                    // Hachage du mot de passe pour la sécurité
                    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

                    // Stocker les données dans une variable de session
                    $_SESSION['form_data'] = [
                        'email' => $email,
                        'username' => $username,
                    ];

                    $sql = "INSERT INTO adherents (username, email, mot_de_passe) VALUES (:username, :email, :password)";
                    $stmt = $conn->prepare($sql);
                    
                    $stmt->bindParam(':username', $username);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $hashedPassword);

                    $stmt->execute();

                    $_SESSION['user'] = $username; // Enregistrer l'utilisateur dans la session
                    header("Location: ../Accueil.php"); // Redirection vers la page d'accueil
                    exit();

                }
            }
        } catch (PDOException $e) {
            $message = "Erreur : " . $e->getMessage();
        }

        $conn = null;
    }
    ?>

    <script>
        document.getElementById('profile-pic').addEventListener('click', function() {
            document.getElementById('profile-pic-input').click();
        });

        document.getElementById('profile-pic-input').addEventListener('change', function(event) {
            if (event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);
                document.getElementById('profile-pic').src = src;
            }
        });

        <?php if (!empty($message)) { ?>
            document.getElementById('message-container').innerHTML = "<p><?php echo $message; ?></p>";
        <?php } ?>
    </script>
</div>
</body>
</html>
