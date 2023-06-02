<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

$data = json_decode(file_get_contents('php://input'), true);
$emailUser = $data['email'];

if (
    isset($emailUser) and !empty($emailUser) and strlen($emailUser) <= 320
) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    // Validation de l'adresse e-mail
    $email = (string) ($sanitizing->validateEmail($emailUser)) ? strtolower($emailUser) : die('is not a valid email');

    require_once '../Class/Database.php';
    // Appel de la classe abstraite Database et insertion des donnees dans la table "users"
    $resultat = Database::query(
        'SELECT id, activate FROM users WHERE emailOrPhone = (:email) ',
        array(
            ':email' => $email,
        )
    );

    ($resultat) ? null : die("votre mail " . $email . " n'existe pas");
    if ($resultat[0]["activate"] == 1) {

        $passwordStrong = substr(password_hash(bin2hex(random_bytes(16)), PASSWORD_BCRYPT, array('cost' => 4)), 0, 12);

        require_once '../Class/Encryption.php';
        // Instanciation de la classe Encryption et creation de l'objet $encryption
        $encryption = (object) new Encryption();

        // Chiffrement du mot de passe
        $passwordCrypt = (string) $encryption->passwordHash($passwordStrong);

        Database::query(
            'UPDATE users SET password =  (:passwordCrypt) WHERE id = (:id)',
            array(
                ':passwordCrypt' => $passwordCrypt,
                ':id' => $resultat[0]["id"],
            )
        );

        // Definition des donnees du sujet
        $subject = (string) "envoi de votre nouveau mot de passe";

        // Definition des donnees du corps
        $body = "votre nouveau mot de passe est : " . $passwordStrong;

        require_once '../Class/Mailer.php';
        // Instanciation de la classe Mailer et creation de l'objet $mailer
        $mailer = (object) new Mailer();
        // Appel de methode "sendEmail(arguments)" pour definir les donnees et envoyer
        $mailer->sendEMail($email, $subject, $body);

        // Encodage en Base64 de l'adresse e-mail
        $encode = (string) base64_encode($email);

    } else {

        // Definition des donnees du sujet
        $subject = (string) "Nouvelle demande d'activation de votre compte";

        require '../configuration.php';
        // Definition du nom de domaine
        $domain = (string) $general['domain'];

        // Encodage en Base64 de l'adresse e-mail
        $encode = (string) base64_encode($email);

        // Definition des donnees du corps
        $body = <<<EOF
         <img src="http://$domain/assets/img/logo.png" title="Logo de $domain" alt="Logo de $domain"/>
         <p>Veuillez suivre le lien suivant pour la confirmation :</p>
         <a href="http://$domain/streaming/?connexion#$encode">Confirmez votre compte</a>
     EOF;

        require_once '../Class/Mailer.php';
        // Instanciation de la classe Mailer et creation de l'objet $mailer
        $mailer = (object) new Mailer();
        // Appel de methode "sendEmail(arguments)" pour definir les donnees et envoyer
        $mailer->sendEMail($email, $subject, $body);

        echo "nonConfirme";

    }

}
