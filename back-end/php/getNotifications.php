<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['toUser']) and !empty($_GET['toUser'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $notifications = Database::query("SELECT n.*, JSON_OBJECT('nom', u.nom, 'prenom', u.prenom, 'profilPhoto', u.profilPhoto) as fromUserInfo FROM notifications n INNER JOIN users u ON n.fromUser = u.id WHERE n.toUser = (:toUser) ", [
        ':toUser' => $_GET['toUser'],
    ]);

    echo json_encode($notifications);
    //echo json_encode([$user,$notifications]);
} elseif (isset($_GET['deUser']) and !empty($_GET['deUser']) and
    isset($_GET['aUser']) and !empty($_GET['aUser'])) {
    # code...
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $notificationsDemandeAmi = Database::query('SELECT * FROM notifications WHERE fromUser=(:fromUser) and toUser = (:toUser) and type=(:type) ', [
        ':fromUser' => $_GET['deUser'],
        ':toUser' => $_GET['aUser'],
        ':type' => 'friend-request',
    ]);

    echo json_encode($notificationsDemandeAmi);
} elseif (isset($_GET['updateVuToUser']) and !empty($_GET['updateVuToUser'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $notificationsDemandeAmi = Database::query('UPDATE `notifications` SET `vu` = 0 WHERE `toUser` = (:toUser)', [
        ':toUser' => $_GET['updateVuToUser'],
    ]);

} elseif (isset($_GET['fromUserAnnuleFriend']) and !empty($_GET['fromUserAnnuleFriend']) and
    isset($_GET['toUserAnnuleFriend']) and !empty($_GET['toUserAnnuleFriend']) and
    isset($_GET['type']) and !empty($_GET['type']) and
    isset($_GET['personne']) and !empty($_GET['personne'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $notificationsDemandeAmi = Database::query("UPDATE `notifications` SET `message` = (:personne), `type` = 'friend-annule'   WHERE `fromUser` = (:fromUserAnnuleFriend) AND `toUser` = (:toUserAnnuleFriend) AND type=(:type)", [
        ':fromUserAnnuleFriend' => $_GET['fromUserAnnuleFriend'],
        ':toUserAnnuleFriend' => $_GET['toUserAnnuleFriend'],
        ':type' => $_GET['type'],
        ':personne' => "Vous avez refuser la demande d'ami de " . $_GET['personne'],
    ]);

}
