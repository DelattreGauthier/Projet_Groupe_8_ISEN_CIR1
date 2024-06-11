<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer le contenu envoyé depuis le formulaire
    $content = $_POST["content"];

    // Séparer le contenu en lignes
    $contentLines = explode("\n", $content);

    // Récupérer la taille, road_pattern et img_pattern
    $taille = $contentLines[0];
    $road_pattern = $contentLines[1];
    $img_pattern = $contentLines[2];

    // Former le contenu complet avec des sauts de ligne
    $data = $taille . "\n" . $road_pattern . "\n" . $img_pattern;

    // Enregistrer le contenu dans un fichier (en écrasant le contenu existant)
    $file_path = "input.txt";

    // Écrire le contenu dans le fichier
    if (file_put_contents($file_path, $data) !== false) {
        echo "File saved successfully.";
    } else {
        echo "Error writing to file.";
    }
} else {
    echo "Invalid request method.";
}
?>
