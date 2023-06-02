<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
session_start();

if (isset($_GET['idPublication']) and !empty($_GET['idPublication']) and
    isset($_GET['idUtilisateur']) and !empty($_GET['idUtilisateur']) and
    isset($_GET['contenu']) and !empty($_GET['contenu']) and
    isset($_GET['date']) and !empty($_GET['date']) and
    isset($_GET['fromUser']) and !empty($_GET['fromUser']) and
    isset($_GET['toUser']) and !empty($_GET['toUser']) and
    isset($_GET['personne']) and !empty($_GET['personne'])) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query("INSERT INTO `commentaires` (`id`, `id_publication`, `id_utilisateur`,`contenu`,`date_commentaire`) VALUES (NULL, (:idPublication), (:idUtilisateur),(:contenu),(:date))", [
        ':idPublication' => $_GET['idPublication'],
        ':idUtilisateur' => $_GET['idUtilisateur'],
        ':contenu' => $_GET['contenu'],
        ':date' => $_GET['date'],
    ]);

    if ($_GET['toUser'] != $_SESSION['user'][0]) {

        $dataNotifCommentaire = Database::query("INSERT INTO `notifications` (`id`,`personne`, `idPublication`, `fromUser`,`toUser`,`message`,`type`,`vu`) VALUES (NULL,(:personne), (:idPublication), (:fromUser),(:toUser),(:message),(:type),(:vu))", [
            ':idPublication' => $_GET['idPublication'],
            ':personne' => $_GET['personne'],
            ':fromUser' => $_GET['fromUser'],
            ':toUser' => $_GET['toUser'],
            ':message' => $_GET['personne'] . ' à commenter votre publication',
            ':type' => 'comment-publication',
            ':vu' => 1,

        ]);
    }

}
