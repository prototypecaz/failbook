<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['userOneCommun']) and !empty($_GET['userOneCommun']) and
    isset($_GET['userTwoCommun']) and !empty($_GET['userTwoCommun'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $amisCommun = Database::query("SELECT u.id, u.nom, u.prenom,u.profilPhoto
   FROM contact c1
   JOIN contact c2 ON c1.identifiant = c2.identifiant
   JOIN users u ON c1.identifiant = u.id
   WHERE c1.`token-me` = (:userOneCommun)
   AND c2.`token-me` = (:userTwoCommun);", [
        ':userOneCommun' => $_GET['userOneCommun'],
        ':userTwoCommun' => $_GET['userTwoCommun'],
    ]);

    echo json_encode($amisCommun);
    //echo json_encode([$user,$notifications]);
}
