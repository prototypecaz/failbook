<?php

ini_set('display_errors', 1);
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
session_start();

if (!empty($_GET['users']) and isset($_GET['users'])) {
    $arrayUsers = json_decode($_GET['users'], true);
}

if (isset($arrayUsers) and !empty($arrayUsers)) {
    $prenom = $arrayUsers['prenom'];
    $nom = $arrayUsers['nom'];
    $emailOrPhone = $arrayUsers['emailOrPhone'];
    $password = $arrayUsers['password'];
    $jour = $arrayUsers['jour'];
    $mois = $arrayUsers['mois'];
    $annee = $arrayUsers['annee'];
    $genre = $arrayUsers['genre'];
}

if (!empty($_GET['renvoieEmail']) && isset($_GET['renvoieEmail'])) {
    $emailOrPhone = $_GET['renvoieEmail'];
}

if (
    isset($emailOrPhone) and !empty($emailOrPhone) and strlen($emailOrPhone) <= 320
) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    // Validation de l'adresse e-mail
    $email = (string) ($sanitizing->validateEmail($emailOrPhone)) ? strtolower($emailOrPhone) : die('is not a valid email');
    require_once '../Class/Database.php';
    $verifEmail = Database::query(
        'SELECT id, emailOrPhone,`activate` FROM users WHERE emailOrPhone = (:email) ',
        array(
            ':email' => $email,
        )
    );

    if (isset($verifEmail) and !empty($verifEmail) and $verifEmail[0]['activate'] == 1) {
        // retourne au navigateur le code HTTP pour preparer une redirection
        echo json_encode([$verifEmail, 'compteExistant']);
        /*  echo ('cette email existe deja '); */
    } elseif (isset($verifEmail) and !empty($verifEmail) and $verifEmail[0]['activate'] == 0) {

        // Definition des donnees du sujet
        $subject = (string) "Confirmation de votre compte";

        require '../configuration.php';

        $uniqueEmail = (string) base64_encode($email);

        $_SESSION['email'] = $uniqueEmail;

        $uniqueCodeBDD = Database::query('SELECT uniqueCode FROM confirmationEmail WHERE uniqueEmail = (:email)', [
            ':email' => $uniqueEmail,
        ]);

        $uniqueCodeDecode = base64_decode($uniqueCodeBDD[0]['uniqueCode']);

        $body = <<<EOF


           <p> Voici votre code de confirmation: $uniqueCodeDecode </p>
       EOF;

        require_once '../Class/Mailer.php';
        // Instanciation de la classe Mailer et creation de l'objet $mailer
        $mailer = (object) new Mailer();
        // Appel de methode "sendEmail(arguments)" pour definir les donnees et envoyer
        $mailer->sendEMail($email, $subject, $body);

        // retourne au navigateur le code HTTP pour preparer une redirection
        echo json_encode([$uniqueEmail, 'compteNonconfirmer']);

    } elseif (

        isset($arrayUsers) and !empty($arrayUsers) and
        isset($prenom) and !empty($prenom) and
        isset($nom) and !empty($nom) and
        isset($emailOrPhone) and !empty($emailOrPhone) and
        isset($password) and !empty($password) and
        isset($jour) and !empty($jour) and
        isset($mois) and !empty($mois) and
        isset($annee) and !empty($annee) and
        isset($genre) and !empty($genre)
    ) {

        require_once '../Class/Sanitizing.php';
        // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
        $sanitizing = (object) new Sanitizing();

        // Validation de l'adresse e-mail
        $email = (string) ($sanitizing->validateEmail($emailOrPhone)) ? strtolower($emailOrPhone) : die('is not a valid email');

        require_once '../Class/Encryption.php';
        // Instanciation de la classe Encryption et creation de l'objet $encryption
        $encryption = (object) new Encryption();

        // Chiffrement du mot de passe
        $password = (string) $encryption->passwordHash($password);

        $uniqueCode = substr(md5(uniqid(rand(), true)), 6, 6);
        $random_hash = base64_encode($uniqueCode);
        $uniqueEmail = (string) base64_encode($email);

        $_SESSION['email'] = $uniqueEmail;

        require_once '../Class/Database.php';
        // Appel de la classe abstraite Database et insertion des donnees dans la table "users"
        Database::query('INSERT INTO `users` (id,profilPhoto,profilCouverture,prenom,nom,emailOrPhone,password,jour,mois,annee,genre,activate,socketId) VALUES (null,(:profilPhoto),(:profilCouverture),(:prenom),(:nom),(:emailOrPhone),(:password),(:jour),(:mois),(:annee),(:genre),0,null)', [
            ':profilPhoto' => 'anonymePhoto.png',
            ':profilCouverture' => 'anonymeCouverture.jpg',
            ':prenom' => $prenom,
            ':nom' => $nom,
            ':emailOrPhone' => $emailOrPhone,
            ':password' => $password,
            ':jour' => $jour,
            ':mois' => $mois,
            ':annee' => $annee,
            ':genre' => $genre,

        ]);

        Database::query('INSERT INTO `confirmationEmail` (id,uniqueCode,uniqueEmail) VALUES (null,(:uniqueCode),(:uniqueEmail))', [
            ':uniqueCode' => $random_hash,
            ':uniqueEmail' => $uniqueEmail,
        ]);

        // Definition des donnees du sujet
        $subject = (string) "Confirmation de votre compte";

        require '../configuration.php';

        // Definition des donnees du corps
        $body = <<<EOF


            <p> Voici votre code de confirmation: $uniqueCode</p>
        EOF;
        require_once '../Class/Mailer.php';
        // Instanciation de la classe Mailer et creation de l'objet $mailer
        $mailer = (object) new Mailer();
        // Appel de methode "sendEmail(arguments)" pour definir les donnees et envoyer
        $mailer->sendEMail($email, $subject, $body);
        //compte non existant
        echo json_encode([$uniqueEmail, 'existant']);
    }

}
