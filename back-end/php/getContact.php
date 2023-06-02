<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
session_start();

if(isset($_GET['id']) and !empty($_GET['id'])){

    require_once('../Class/Sanitizing.php');
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once('../Class/Database.php');
//SELECT username,photoProfil,identifiant,idBDD,socketId,username FROM contact WHERE `token-me` = (:tokenMe)',[':tokenMe' => $_GET['id']]
// Cette requete est la précédente qui fonctionne nous lavons modifier par rapport au photo profil
   $data =  Database::query("SELECT c.identifiant, c.socketId, u.profilPhoto, CONCAT(u.prenom, ' ', u.nom) AS username
   FROM contact c
   INNER JOIN users u ON c.identifiant = u.id
   WHERE c.`token-me` = (:tokenMe)",[':tokenMe' => $_GET['id']]);

   echo json_encode($data);

}else if(isset($_SESSION['user']) and !empty($_SESSION['user'])){

    require_once('../Class/Sanitizing.php');
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once('../Class/Database.php');

   $data =  Database::query("SELECT c.identifiant, c.socketId, u.profilPhoto, CONCAT(u.prenom, ' ', u.nom) AS username
   FROM contact c
   INNER JOIN users u ON c.identifiant = u.id
   WHERE c.`token-me` = (:tokenMe);",[':tokenMe' => $_SESSION['user'][0]]);

   echo json_encode($data);

}

?>
