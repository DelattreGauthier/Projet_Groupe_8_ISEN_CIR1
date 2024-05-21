<?php


    $to = 'paul.jeannin@student.junia.com';

    $subject = 'Mail envoyé depuis un script PHP';

    $message = 'Contenu text depuis sendmail de php';



    if (mail($to, $subject, $message,)) {

        echo 'Mail envoyé avec succèss.';

    } else {

        echo 'Unable to send mail. Please try again.';

    }

?>