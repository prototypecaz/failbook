<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();

if (isset($_GET['search']) and !empty($_GET['search'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $search = $_GET['search'] . '%';

    $data = Database::query('SELECT id AS idProfil,prenom,profilPhoto,nom FROM users WHERE prenom LIKE (:search) OR  nom LIKE (:search) ', [':search' => $search]);

    if (isset($data) and !empty($data)) {
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }

} elseif (isset($_GET['identifierPersonne']) and !empty($_GET['identifierPersonne'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $search = $_GET['identifierPersonne'] . '%';

    $identifierPersonne = Database::query('SELECT *, profilPhoto AS photoProfil, CONCAT(prenom," ", nom) AS username, token AS identifiant FROM users WHERE token IN (SELECT identifiant FROM contact WHERE `token-me` = (:tokenMe) AND username LIKE (:search))',
        [
            ':search' => $search,
            ':tokenMe' => $_SESSION['user'][3],
        ]);

    echo json_encode($identifierPersonne);

} else {
    echo json_encode([]);
}
