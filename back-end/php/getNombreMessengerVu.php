<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['toIdentifiantUser']) and !empty($_GET['toIdentifiantUser'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $notifications = Database::query("SELECT * FROM countMessage WHERE toIdentifiantUser = (:toIdentifiantUser) ", [
        ':toIdentifiantUser' => $_GET['toIdentifiantUser'],
    ]);

    echo json_encode($notifications);
    //echo json_encode([$user,$notifications]);
} elseif (isset($_GET['toIdentifiantUserVu']) and !empty($_GET['toIdentifiantUserVu'])) {
    # code...
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $messengerVu = Database::query('DELETE FROM `countMessage` WHERE toIdentifiantUser = (:toIdentifiantUserVu)', [
        ':toIdentifiantUserVu' => $_GET['toIdentifiantUserVu'],

    ]);

} elseif (isset($_GET['toIdentifiantUserFocus']) and !empty($_GET['toIdentifiantUserFocus']) and
    isset($_GET['fromIdentifiantUserFocus']) and !empty($_GET['fromIdentifiantUserFocus'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $messengerVu = Database::query('DELETE FROM `countMessage` WHERE toIdentifiantUser = (:toIdentifiantUserFocus) AND fromIdentifiantUser = (:fromIdentifiantUserFocus)', [
        ':toIdentifiantUserFocus' => $_GET['toIdentifiantUserFocus'],
        ':fromIdentifiantUserFocus' => $_GET['fromIdentifiantUserFocus'],

    ]);
}
