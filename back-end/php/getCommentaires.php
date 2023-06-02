<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

if (isset($_GET['idPublication']) and !empty($_GET['idPublication'])) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query("SELECT
   JSON_OBJECT(
       'user_info', JSON_OBJECT('id',u.id,'nom', u.nom, 'prenom', u.prenom,'profilPhoto',u.profilPhoto),
       'id_commentaire', c.id,
       'id_utilisateur', c.id_utilisateur,
       'contenu_commentaire', c.contenu
   ) AS result
    FROM commentaires c
    INNER JOIN users u ON c.id_utilisateur = u.id
    WHERE c.id_publication = :idPublication
    ORDER BY c.id ASC;
    ", [
        ':idPublication' => $_GET['idPublication'],

    ]);

    echo json_encode($data);
}
