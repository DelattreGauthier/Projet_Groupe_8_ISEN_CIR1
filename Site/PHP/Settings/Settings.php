<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <script src="../../JavaScript/theme.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <style>
        #volume-bar-container {
            width: 100px;
            height: 10px;
            background-color: #ccc;
            position: relative;
            display: inline-block;
            cursor: pointer;
            margin: 0 10px;
        }

        #volume-bar {
            height: 100%;
            background-color: #4caf50;
            width: 50%; /* Initial volume */
        }
    </style>
</head>
<body>
    
    <a class="LogoSett" href="../../../Site/PHP/Accueil/Accueil.php"><img src="../../../Document/Image/Jeu/Dino/Dino_Vert.png" alt="accueil"></a> 
    <audio id="myAudio" autoplay loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <div class="container" class="black" id="theme-btn">
        <div class="sidebar">
            <a href="#" class="active" onclick="showSection(event, 'profil')">
                <i class="fas fa-user"></i> Profile
            </a>
            <a href="#" onclick="showSection(event, 'securite')">
                <i class="fas fa-lock"></i> Security
            </a>
            <a href="#" onclick="showSection(event, 'notifications')">
                <i class="fas fa-bell"></i> Voice / Sound
            </a>
            <a href="#" onclick="showSection(event, 'preferences')">
                <i class="fas fa-cog"></i> Preferences
            </a>
        </div>
        <div class="content"  id="theme-btn">
        <div id="profil" class="content-section active">
        <?php
        session_start();
        if (isset($_SESSION['username'])): ?>
                <h1>Your profile</h1>
                <div class="settings-section">
                    <form method="POST" action="">
                        <div class="setting-item">
                            <label for="username">Username</label>
                            <input type="text" id="username" name="username" placeholder='Username'>
                        </div>
                        <button type="submit" class="save-button" name="save">Save Edits</button>
                    </form>
                </div>
        <?php else: ?>
            <div class="setting-item">
                <label for="password"><a id="resetSett" href="../Connexion/connexion.php">Connect to acces at your profile</a></label>
            </div>
        <?php endif; ?>
        </div>
            <div id="securite" class="content-section">
                <h1>Security</h1>
                <div class="settings-section">
                    <div class="setting-item">
                        <label for="password"><a id="resetSett" href="../Connexion/reinitilize.php">Click here to reset your password</a></label>
                    </div>
                </div>
            </div>
            <div id="notifications" class="content-section">
                <h1>Voice & Sound</h1>
                <div class="settings-section">
                    <div class="setting-item">
                        <label for="voice-choice">Voice Choice:</label>
                    </div>
                    <div class="setting-item">
                        <label for="sound-level">Sound Level:</label>
                        <div id="player">
                            <i id="volume-down" class="fa fa-volume-down"></i>
                            <div id="volume-bar-container">
                                <div id="volume-bar"></div>
                            </div>
                            <i id="volume-up" class="fa fa-volume-up"></i>
                        </div>
                    </div>
                    <button class="save-button">Save Edits</button>
                </div>
            </div>
            <div id="preferences" class="content-section">
                <h1>Preferences</h1>
                <div class="settings-section">
                    <div class="setting-item">
                        <label for="language">Language</label>
                        <select id="language" name="language">
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div class="setting-item">
                        <label for="theme">Theme</label>
                        <select id="theme" name="theme">
                            <option value="light">Light</option>
                        </select>
                    </div>
                </div>
                <button class="save-button" >Save Edits</button>
            </div>
        </div>
    </div>

    <?php
    if (isset($_POST['save'])) {
        $new_username = $_POST['username'];
        if (!empty($new_username)) {
            if (isset($_SESSION['user_email'])) {
                $user_email = $_SESSION['user_email'];

                try {
                    // Connexion à la base de données
                    $servername = 'localhost'; 
                    $username = 'root';
                    $password = 'root';
                    $database = 'projet2';
                    $bdd = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
                    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    // Mettre à jour le pseudo dans la table 'adherents'
                    $update_username = $bdd->prepare("UPDATE adherents SET username = ? WHERE email = ?");
                    $update_username->execute(array($new_username, $user_email));

                    echo "Pseudo mis à jour avec succès";

                } catch (PDOException $e) {
                    echo "Erreur de connexion : " . $e->getMessage();
                }
            } else {
                echo "Email utilisateur non trouvé";
            }
        } else {
            echo "Le champ du pseudo est vide";
        }
    }
    ?>
   
    <script>
        // Load settings when the page is loaded
        document.addEventListener("DOMContentLoaded", function() {
            loadSettings();
            var audio = document.getElementById("myAudio");
            audio.muted = false;
            audio.play();
        });

        function showSection(event, sectionId) {
            event.preventDefault();
    
            // Hide all sections
            var sections = document.querySelectorAll('.content-section');
            sections.forEach(function(section) {
                section.classList.remove('active');
            });
    
            // Remove active class from all menu items
            var menuItems = document.querySelectorAll('.sidebar a');
            menuItems.forEach(function(item) {
                item.classList.remove('active');
            });
    
            // Show the clicked section
            document.getElementById(sectionId).classList.add('active');
    
            // Add active class to the clicked menu item
            event.target.closest('a').classList.add('active');
        }

        function loadSettings() {
            const savedSettings = JSON.parse(localStorage.getItem('userSettings'));
            if (savedSettings) {
                document.getElementById('username').value = savedSettings.username;
                document.getElementById('email').value = savedSettings.email;
                document.getElementById('myAudio').volume = savedSettings.volume;
                document.getElementById('volume-bar').style.width = (savedSettings.volume * 100) + '%';
                document.getElementById('language').value = savedSettings.language;
                document.getElementById('theme').value = savedSettings.theme;
            }
        }

        document.getElementById('volume-bar-container').addEventListener('click', function(e) {
            var volumeBar = document.getElementById('volume-bar');
            var posX = e.offsetX / this.offsetWidth;
            volumeBar.style.width = (posX * 100) + '%';
            var audio = document.getElementById('myAudio');
            audio.volume = posX;
        });

        document.getElementById('volume-down').addEventListener('click', function() {
            var audio = document.getElementById('myAudio');
            var volumeBar = document.getElementById('volume-bar');
            if (audio.volume > 0) {
                audio.volume = Math.max(0, audio.volume - 0.1);
                volumeBar.style.width = (audio.volume * 100) + '%';
            }
        });

        document.getElementById('volume-up').addEventListener('click', function() {
            var audio = document.getElementById('myAudio');
            var volumeBar = document.getElementById('volume-bar');
            if (audio.volume < 1) {
                audio.volume = Math.min(1, audio.volume + 0.1);
                volumeBar.style.width = (audio.volume * 100) + '%';
            }
        });
    </script>

</body>
</html>
