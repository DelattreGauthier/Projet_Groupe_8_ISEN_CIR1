<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer le contenu posté
    $content = $_POST["content"];

    // Séparer le contenu par le séparateur choisi
    $separator = '|';
    $contentParts = explode($separator, $content);

    // Récupérer la taille, road_pattern et img_pattern
    $taille = $contentParts[0];
    $roadPattern = $contentParts[1];
    $imgPattern = $contentParts[2];

    // Former le contenu complet avec des sauts de ligne
    $data = $taille . "\n" . $roadPattern . "\n" . $imgPattern;

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
