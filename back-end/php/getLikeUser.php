<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();

if (isset($_GET['idPublication']) and !empty($_GET['idPublication'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $data = Database::query('SELECT u.* FROM users u INNER JOIN likes l ON u.id = l.id_utilisateur WHERE l.id_publication = (:idPublication)', [':idPublication' => $_GET['idPublication']]);

    echo json_encode($data);

}
