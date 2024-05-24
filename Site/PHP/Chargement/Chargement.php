<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <link rel="stylesheet" href="../../CSS/chargement.css">
    <link rel="icon" href="../../../Document/Image/Jeu/Dino/Dino_Vert.png" type="image/png">
</head>
<body>

<div class="loader"></div>

<div class="container">
    <div class="curve">
        <p id="txt_charg1"></p>
    </div>
</div>

<?php
$images = [
    "versailles" => [
        "image" => "../../../Document/Image/Fond/loading_screen/versailles.png",
        "text" => "<b><u>Versailles : Did you know?</u></b><br>
            The hall of the Palace of Versailles, transformed into the Hall of Mirrors, once served as a dance floor for Louis XIV's masked balls, showcasing the evolution of this baroque emblem. The palace, originally a hunting lodge, became the symbol of French royalty. <br>
            In the gardens, Louis XIV installed fountains powered by a sophisticated hydraulic system, but during parties, water pressure could be insufficient, forcing guests to wait for the king to restart the fountains, demonstrating his passion for spectacle."
    ],
    "paris" => [
        "image" => "../../../Document/Image/Fond/loading_screen/paris.png",
        "text" => "<b><u>Paris : Did you know?</u></b><br>
            Under Paris, the Catacombs house millions of skeletons moved from overcrowded cemeteries in the 18th century to solve sanitation issues. Today, they draw intrepid visitors, offering a dive into a dark yet fascinating past.<br>
            In the 1920s, Paris was at the heart of a cultural revolution embodied by Coco Chanel and her 'Little Black Dress', a symbol of audacity that propelled the city to the top of the global fashion industry."
    ],
    "jurisen" => [
        "image" => "../../../Document/Image/Fond/loading_screen/jurisen.png",
        "text" => "<b><u>Dinosaures : Did you know?</u></b><br>
            During the age of dinosaurs, a young velociraptor stumbled upon a delicious plant, reshaping its tribe's diet and destiny. Meanwhile, a courageous triceratops discovered a concealed path leading to a vital water source, providing sanctuary for its herd during parched spells.<br>
            Not to be outdone, an intrepid stegosaurus chanced upon a verdant glade nestled deep within the dense jungle, serving as a secure refuge for its troop amid turbulent storms, showcasing their remarkable adaptability and survival instincts."
    ],
    "future" => [
        "image" => "../../../Document/Image/Fond/loading_screen/future.jpg",
        "text" => "<b><u>Future : Did you know?</u></b><br>
        In the future, hovering above the city skyline, sleek skybridges connect towering eco-friendly skyscrapers, showcasing Paris's commitment to sustainable urban living. Meanwhile, beneath the Seine, advanced underwater habitats serve as research centers, pushing the boundaries of marine exploration and environmental conservation."
    ]

];
?>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const images = <?php echo json_encode($images); ?>;
        let keys = Object.keys(images);
        let usedKeys = [];

        function changeBackground() {
            if (keys.length === 0) {
                keys = usedKeys;
                usedKeys = [];
            }
            const randomIndex = Math.floor(Math.random() * keys.length);
            const key = keys.splice(randomIndex, 1)[0];
            usedKeys.push(key);

            const image = images[key].image;
            const text = images[key].text;

            document.body.style.backgroundImage = `url('${image}')`;
            document.getElementById('txt_charg1').innerHTML = text;
        }

        changeBackground();
        setInterval(changeBackground, 5000);

        setTimeout(function() {
            window.location.href = '../Accueil/Accueil.php';
        }, 20000);
    });
</script>

</body>
</html>
