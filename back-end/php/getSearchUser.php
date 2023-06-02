<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['id']) and !empty($_GET['id']) and
    isset($_GET['idUser']) and !empty($_GET['idUser'])) {
    require_once '../Class/Sanitizing.php';
   
    require_once '../Class/Database.php';

    $recupereSearch = Database::query('SELECT * FROM searchUser WHERE id_user = (:idUser) and idProfil = (:idProfil)', [
        ':idUser' => $_GET['idUser'],
        ':idProfil' => $_GET['id'],

    ]);

    if (!empty($recupereSearch)) {
        $deleteSearch = Database::query('DELETE FROM `searchUser` WHERE idProfil = (:idProfil) and id_user = (:idUser) ', [
            ':idUser' => $_GET['idUser'],
            ':idProfil' => $_GET['id'],

        ]);

        $insertSearch = Database::query('INSERT INTO `searchUser` (id,idProfil,id_user) VALUES (NULL,(:idProfil),(:idUser))', [
            ':idProfil' => $_GET['id'],
            ':idUser' => $_GET['idUser'],
        ]);

    } else {
        $insertSearch = Database::query('INSERT INTO `searchUser` (id,idProfil,prenom,nom,profilPhoto,id_user) VALUES (NULL,(:idProfil),(:prenom),(:nom),(:photoProfil),(:idUser))', [
            ':idProfil' => $_GET['id'],
            ':prenom' => $_GET['prenom'],
            ':nom' => $_GET['nom'],
            ':photoProfil' => $_GET['profilPhoto'],
            ':idUser' => $_GET['idUser'],
        ]);

    }

} elseif (isset($_GET['id']) and !empty($_GET['id'])) {

    require_once '../Class/Database.php';

    $getSearch = Database::query('SELECT s.idProfil, u.profilPhoto, u.prenom, u.nom FROM searchUser s INNER JOIN users u ON s.idProfil = u.id WHERE s.id_user = (:idUser) ORDER BY s.id DESC LIMIT 10; ', [':idUser' => $_GET['id']]);

    echo json_encode($getSearch);

}
