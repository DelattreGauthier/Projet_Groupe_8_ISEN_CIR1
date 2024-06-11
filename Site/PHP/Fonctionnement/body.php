<body id='playMusicButton'>
    <audio id="myAudio" autoplay loop>
        <source src="../../../Document/Sons/Musique/Tem_music.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>

    <script>
        // Fonction pour démarrer la lecture de la musique
        function playMusic() {
            var audio = document.getElementById("myAudio");
            audio.muted = false;
            audio.play();
        }

        // Récupération de la position et de l'état de lecture depuis le stockage local
        document.addEventListener("DOMContentLoaded", function() {
            var audio = document.getElementById("myAudio");

            var savedTime = localStorage.getItem("audioTime");
            if (savedTime !== null) {
                audio.currentTime = savedTime;
            }

            var isPlaying = localStorage.getItem("isPlaying");
            if (isPlaying === "true") {
                audio.play();
            } else {
                audio.pause();
            }

            // Sauvegarde de la position actuelle de l'audio et de l'état de lecture
            audio.addEventListener("timeupdate", function() {
                localStorage.setItem("audioTime", audio.currentTime);
            });

            audio.addEventListener("play", function() {
                localStorage.setItem("isPlaying", "true");
            });

            audio.addEventListener("pause", function() {
                localStorage.setItem("isPlaying", "false");
            });
        });

        // Ajoutez un gestionnaire d'événements pour le clic sur le bouton
        document.getElementById("playMusicButton").addEventListener("click", playMusic);
    </script>
</body>
