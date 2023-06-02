<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();

if (isset($_GET['id']) and !empty($_GET['id'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $id = $_GET['id'];

    $data = Database::query('SELECT * FROM users WHERE id = (:id)', [':id' => $id]);

    if (isset($data) and !empty($data)) {
        echo json_encode($data);
    }

} elseif (isset($_GET['idPhotoProfil']) and !empty($_GET['idPhotoProfil'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $profilPhoto = Database::query('SELECT profilPhoto FROM users WHERE id = (:id)', [':id' => $_GET['idPhotoProfil']]);

    echo json_encode($profilPhoto);
}
