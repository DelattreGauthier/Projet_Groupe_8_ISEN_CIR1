<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading...</title>
    <link rel="stylesheet" href="../CSS/accueil.css">
</head>
<body>

<div class="loader"></div>
<?php
$depart = microtime(true);
$temps = 0;
$limite = 20;

while ($temps <= 3000000) {
    
    $image = [
        "../../images/loading-screen/versailles.png",
        "../../images/loading-screen/paris.png",
        "../../images/loading-screen/jurisen.png"
    ];
    $randomIndex = array_rand($image);
    $randomImage = $image[$randomIndex];

    $style = '';
    if ($randomImage == "../../images/loading-screen/paris.png") {
        $style = "body {
            background-image: url('../../images/loading-screen/paris.png');
            font-family: Arial, sans-serif;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }";
        $text = "<b><u>Paris : Did you know?</u></b><br>Under Paris, the Catacombs house millions of skeletons moved from overcrowded cemeteries in the 18th century to solve sanitation issues. Today, they draw intrepid visitors, offering a dive into a dark yet fascinating past.
        <br>In the 1920s, Paris was at the heart of a cultural revolution embodied by Coco Chanel and her 'Little Black Dress', a symbol of audacity that propelled the city to the top of the global fashion industry.";
    } elseif ($randomImage == "../../images/loading-screen/versailles.png") {
        $style = "body {
            background-image: url('../../images/loading-screen/versailles.png');
            font-family: Arial, sans-serif;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }";
        $text = "<b><u>Versailles : Did you know?</u></b><br>
        The hall of the Palace of Versailles, transformed into the Hall of Mirrors, once served as a dance floor for Louis XIV's masked balls, showcasing the evolution of this baroque emblem. The palace, originally a hunting lodge, became the symbol of French royalty. <br> In the gardens, Louis XIV installed fountains powered by a sophisticated hydraulic system, but during parties, water pressure could be insufficient, forcing guests to wait for the king to restart the fountains, demonstrating his passion for spectacle.";
    } elseif ($randomImage == "../../images/loading-screen/jurisen.png") {
        $style = "body {
            background-image: url('../../images/loading-screen/jurisen.png');
            font-family: Arial, sans-serif;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position: center;
            background-size: cover;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }";
        $text = "<b><u>Dinosaures : Le saviez-vous ?</u></b><br>
        During the age of dinosaurs, a young velociraptor stumbled upon a delicious plant, reshaping its tribe's diet and destiny. Meanwhile, a courageous triceratops discovered a concealed path leading to a vital water source, providing sanctuary for its herd during parched spells. <br>Not to be outdone, an intrepid stegosaurus chanced upon a verdant glade nestled deep within the dense jungle, serving as a secure refuge for its troop amid turbulent storms, showcasing their remarkable adaptability and survival instincts.";
    } else {
        $text = "Texte par défaut si l'image n'est pas reconnue.";
    }

    // Affichage du style et du texte
    echo "<style>$style</style>";
    echo '<div class="container">';
    echo '<div class="curve">';
    echo "<p id='txt_charg1'>$text</p>";
    echo '</div>';
    echo '</div>';

    $temps = microtime(true) - $depart;

    if ($temps <= $limite) {
        usleep(3000000);
    }
}

?>


</body>
</html>
