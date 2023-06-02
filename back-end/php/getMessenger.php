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

    $data = Database::query("SELECT m.id, m.fromToken, m.toToken, m.message,
   JSON_ARRAYAGG(JSON_OBJECT(
       'username',CONCAT(u_users.prenom, ' ', u_users.nom),
       'photoProfil', u_users.profilPhoto,
       'socketId', u_contact.socketId,
       'identifiant', u_contact.identifiant
   )) AS participants
   FROM conversation m
   INNER JOIN (
       SELECT MAX(id) AS max_id, CASE WHEN fromToken = (:token) THEN toToken ELSE fromToken END AS other_token
       FROM conversation
       WHERE fromToken = (:token) OR toToken = (:token)
       GROUP BY other_token
   ) AS max_msg ON (m.id = max_msg.max_id)
   INNER JOIN contact u_contact ON (max_msg.other_token = u_contact.identifiant)
   INNER JOIN users u_users ON (u_contact.identifiant = u_users.id)
   WHERE m.fromToken = (:token) OR m.toToken = (:token)
   GROUP BY m.id, m.fromToken, m.toToken, m.message
   ORDER BY m.id DESC;
    ",
        [
            ':token' => $_GET['token'],
        ]);

    echo json_encode($data);

}
