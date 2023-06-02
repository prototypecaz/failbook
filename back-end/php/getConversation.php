<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['token']) and !empty($_GET['token'])) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query('SELECT * FROM conversation WHERE fromToken=(:fromToken) OR toToken=(:toToken) ', [
        ':fromToken' => $_GET['token'],
        ':toToken' => $_GET['token'],

    ]);

    echo json_encode($data);

}
