<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['id']) and !empty($_GET['id']) and
    isset($_GET['token']) and !empty($_GET['token'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $test = Database::query('SELECT id FROM contact WHERE identifiant = (:identifiant) AND `token-me` = (:tokenMe) ', [
        ':tokenMe' => $_GET['id'],
        ':identifiant' => $_GET['token'],

    ]);

    echo json_encode($test);
}
