<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Assurez-vous que le chemin est correct

function sendRecoveryMail($to, $code) {
    $mail = new PHPMailer(true);

    try {
        // Paramètres du serveur
        $mail->isSMTP();
        $mail->Host       = 'smtp.example.com'; // Configurez votre serveur SMTP
        $mail->SMTPAuth   = true;
        $mail->Username   =$_ENV['EMAIL_USERNAME']; // Ton adresse e-mail Gmail
        $mail->Password   =$_ENV['EMAIL_PASSWORD']; // Votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Destinataires
        $mail->setFrom('no-reply@example.com', 'Mailer');
        $mail->addAddress($to);

        // Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Votre code de récupération de mot de passe';
        $mail->Body    = 'Le code de confirmation est : <b>' . $code . '</b>';
        $mail->AltBody = 'Le code de confirmation est : ' . $code;

        $mail->send();
    } catch (Exception $e) {
        echo "Le message n'a pas pu être envoyé. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
