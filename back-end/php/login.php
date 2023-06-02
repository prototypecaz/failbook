<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
session_set_cookie_params([ /// Pour google sinon on arrive pas a stocker le $SESSION
    'path' => '/',
    'domain' => false,
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None',
]);

$data = json_decode(file_get_contents('php://input'), true); // On utilise cette methode car Votre $_POST sera vide car les données ont été envoyées dans le corps, essayez :
$emailUser = $data['email'];
$passwordUser = $data['password'];

if (isset($emailUser) and !empty($emailUser) and strlen($emailUser) <= 320
    and isset($passwordUser) and !empty($passwordUser)) {
    require_once '../Class/Sanitizing.php';

    $sanitizing = (object) new Sanitizing();

    $email = (string) ($sanitizing->validateEmail($emailUser)) ? strtolower($emailUser) : die('is not a valid email');
    require_once '../Class/Database.php';

    $data = Database::query('SELECT * FROM users WHERE emailOrPhone = (:email)', [':email' => $email]);

    if (isset($data) and !empty($data)) {
        $activate = $data[0]['activate'];
        $confirme = true;
    }if (empty($data)) {
        echo 'emailInvalid';
    } else {

        if ($activate == 1) {

            $passwordBDD = $data[0]['password'];
            $password = $passwordUser;
            if (password_verify($password, $passwordBDD)) {
                session_start();
                if ($confirme) {

                    $_SESSION['user'] = [$data[0]['id'], $data];

                    echo 'reussis';

                } else {
                    echo "echoué";
                }
            } else {

                echo "passwordIncorect";

            }

        } else {

            $subject = (string) "Confirmation de votre compte";

            require '../configuration.php';

            $uniqueEmail = (string) base64_encode($email);

            $uniqueCodeBDD = Database::query('SELECT uniqueCode FROM confirmationEmail WHERE uniqueEmail = (:email)', [
                ':email' => $uniqueEmail,
            ]);
            // Definition du nom de domaine
            //$domain = (string) $general['domain'];

            // Encodage en Base64 de l'adresse e-mail
            $uniqueCodeDecode = base64_decode($uniqueCodeBDD[0]['uniqueCode']);

            // Definition des donnees du corps

            $body = <<<EOF


           <p> Voici votre code de confirmation: $uniqueCodeDecode</p>
       EOF;

            require_once '../Class/Mailer.php';
            // Instanciation de la classe Mailer et creation de l'objet $mailer
            $mailer = (object) new Mailer();
            // Appel de methode "sendEmail(arguments)" pour definir les donnees et envoyer
            $mailer->sendEMail($email, $subject, $body);

            // retourne au navigateur le code HTTP pour preparer une redirection
            echo "nonConfirme";

        }
    }

}
