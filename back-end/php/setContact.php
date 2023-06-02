<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();

if (isset($_GET['id']) and !empty($_GET['id']) and
    isset($_GET['username']) and !empty($_GET['username']) and
    isset($_GET['identifiant']) and !empty($_GET['identifiant']) and
    isset($_GET['idUser']) and !empty($_GET['idUser']) and
    isset($_GET['myIdentifiant']) and !empty($_GET['myIdentifiant']) and
    isset($_GET['myUsername']) and !empty($_GET['myUsername'])) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query("INSERT INTO `contact` (`id`, `username`, `identifiant`, `idBDD`, `token-me`, `connected`, `socketId`) VALUES (NULL, (:username), (:identifiant), (:idBDD), (:tokenMe), 'false', 'null'),
   (NULL, (:usernameMe), (:identifiantMe), (:idBDDMe), (:tokenUser), 'false', 'null')", [
        ':username' => $_GET['username'],
        ':identifiant' => $_GET['identifiant'],
        ':idBDD' => $_GET['identifiant'],
        ':tokenMe' => $_GET['id'],
        ':usernameMe' => $_GET['myUsername'],
        ':identifiantMe' => $_GET['myIdentifiant'],
        ':idBDDMe' => $_GET['myIdentifiant'],
        ':tokenUser' => $_GET['idUser'],
    ]

    );

}
