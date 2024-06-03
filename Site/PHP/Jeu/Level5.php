<?php include '../Fonctionnement/header.php'; ?>

<?php
    if (!isset($_COOKIE['level4'])) {
        header("Location:level4.php");
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
    <title>Level 5</title>
    <link rel="stylesheet" href="../../CSS/style.css">
    <style>
        #game-container {
            background-color: rgba(0, 0, 0, 0.7);
        }

        .square-2 {
            background-color: rgba(0, 0, 128, 0.5);
        }

        .disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    </style>
    <script>

        function getCookie(name) {
            let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        }

        function setCookie(name, value, days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        function checkLevels() {
            for (let i = 2; i <= 8; i++) {
                let levelLink = document.getElementById("level" + i);
                if (getCookie("level" + (i - 1)) !== "unlocked") {
                    levelLink.classList.add("disabled");
                    levelLink.href = "javascript:void(0);";
                } else {
                    levelLink.classList.remove("disabled");
                    levelLink.href = "Level" + i + ".php";
                }
            }
        }
    </script>
</head>

<body class="Jeu-Actuel" onload="checkLevels()">

    <div class="level-container">
        <div id="color-buttons" style="display: flex; flex-direction: column; align-items: center;">
            <a id="level1" href="Level1.php"><button>Level 1</button></a>
            <a id="level2" href="Level2.php"><button>Level 2</button></a>
            <a id="level3" href="Level3.php"><button>Level 3</button></a>
            <a id="level4" href="Level4.php"><button>Level 4</button></a>
            <a id="level5" href="Level5.php"><button>Level 5</button></a>
            <a id="level6" href="Level6.php"><button>Level 6</button></a>
            <a id="level7" href="Level7.php"><button>Level 7</button></a>
            <a id="level8" href="Level8.php"><button>Level 8</button></a>
        </div>
    </div>
    <div class="concepteur-container">
        <div id="color-buttons" style="display: flex; flex-direction: column; align-items: center;">
            <a href="Level1.php"><button>Manual Designer</button></a>
            <a href="Level1.php"><button>Auto Designer</button></a>
            <a href="Level1.php"><button>Solver</button></a>
        </div>
    </div>
    <div class="script-container">
        <!-- Écran de jeu -->
        <div id="script">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.80.1/phaser.min.js"></script>
            <script src="../../Javascript/LVL5.js"></script>
        </div>
        
    </div>

</body>
</html>