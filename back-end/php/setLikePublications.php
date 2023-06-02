<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();

if (isset($_GET['idPublication']) and !empty($_GET['idPublication']) and
    isset($_GET['idUtilisateur']) and !empty($_GET['idUtilisateur'])) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query("INSERT INTO `likes` (`id`, `id_publication`, `id_utilisateur`) VALUES (NULL, (:idPublication), (:idUtilisateur))", [
        ':idPublication' => $_GET['idPublication'],
        ':idUtilisateur' => $_GET['idUtilisateur'],

    ]);

    if ($_GET['toUser'] != $_SESSION['user'][0]) {

        $dataNotifications = Database::query("INSERT INTO `notifications` (`id`,`personne`,`idPublication`, `fromUser`, `toUser`, `message`, `type`,`vu`) VALUES (NULL, (:personne),(:idPublication),(:fromUser),(:toUser),(:message),(:type),(:vu))", [
            ':personne' => $_GET['personne'],
            ':idPublication' => $_GET['idPublication'],
            ':fromUser' => $_GET['fromUser'],
            ':toUser' => $_GET['toUser'],
            ':message' => $_GET['message'],
            ':type' => $_GET['type'],
            ':vu' => 1,

        ]);

    }

} elseif (isset($_GET['idPublicationDelete']) and !empty($_GET['idPublicationDelete']) and
    isset($_GET['idUtilisateurDelete']) and !empty($_GET['idUtilisateurDelete'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query("DELETE FROM likes WHERE id_publication = (:idPublication) AND id_utilisateur = (:idUtilisateur)", [
        ':idPublication' => $_GET['idPublicationDelete'],
        ':idUtilisateur' => $_GET['idUtilisateurDelete'],
    ]);

    $dataNotification = Database::query("DELETE FROM notifications WHERE idPublication = (:idPublication) AND fromUser = (:fromUser)", [
        ':idPublication' => $_GET['idPublicationDelete'],
        ':fromUser' => $_GET['fromUser'],
    ]);
}
