<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer le contenu posté
    $content = $_POST["content"];

    // Chemin du fichier
    $file_path = "input_auto.txt";

    // Vider le fichier
    file_put_contents($file_path, '');

    // Écrire le nouveau contenu dans le fichier
    if (file_put_contents($file_path, $content) !== false) {
        // Exécuter solveur.exe
        exec('solveur_auto.exe');

        // Vérifier le résultat dans output.php
        $output_content = file_get_contents('output_auto.php');
        $Checkroadcorrect = strpos($output_content, '$Checkroadcorrect = true;') !== false;

        // Renvoyer le résultat en JSON
        echo json_encode(['success' => true, 'Checkroadcorrect' => $Checkroadcorrect]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error writing to file.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
