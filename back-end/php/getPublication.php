<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

session_start();

if (isset($_GET['idUser']) and !empty($_GET['idUser'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $publications = Database::query("SELECT
    p.
    id,date,photoPublication,description,humeur,lieu,color,destination,nameDestination,identifierPersonne,idUser,
    CONCAT(u.prenom, ' ', u.nom) AS nameUser, u.profilPhoto AS photoUser,
    (SELECT
            JSON_ARRAYAGG(
                JSON_OBJECT('id', identifiedUser.id, 'nom', identifiedUser.nom, 'prenom', identifiedUser.prenom)
            )
        FROM
            (SELECT id, nom, prenom FROM users WHERE FIND_IN_SET(users.id, p.identifierPersonne)) AS identifiedUser
    ) AS identifiedUsers,
    lastCommentaires.commentaires,
    l.likedUsers,
    COALESCE(t.nbCommentaires, 0) AS nbCommentaires
FROM
    publications p
    LEFT JOIN (
        SELECT
            id_publication,
            JSON_ARRAYAGG(
                JSON_OBJECT('id', l.id_utilisateur)
            ) AS likedUsers
        FROM likes l
        GROUP BY l.id_publication
    ) AS l ON p.id = l.id_publication
    LEFT JOIN (
        SELECT
            c1.id_publication,
            JSON_ARRAYAGG(
                JSON_OBJECT('user_info', JSON_OBJECT('id',u.id,'nom', u.nom, 'prenom', u.prenom,'profilPhoto', u.profilPhoto), 'id_commentaire', c1.id, 'id_utilisateur', c1.id_utilisateur, 'contenu_commentaire', c1.contenu)
            ) AS commentaires
        FROM commentaires c1
        INNER JOIN (
            SELECT
                MAX(id) AS max_id,
                id_publication
            FROM commentaires
            GROUP BY id_publication
        ) AS c2 ON c1.id = c2.max_id
        INNER JOIN users u ON c1.id_utilisateur = u.id
        GROUP BY c1.id_publication
    ) AS lastCommentaires ON p.id = lastCommentaires.id_publication
    LEFT JOIN (
        SELECT
            id_publication,
            COUNT(*) AS nbCommentaires
        FROM commentaires
        GROUP BY id_publication
    ) AS t ON p.id = t.id_publication
    INNER JOIN users u ON u.id = p.idUser
WHERE
    p.idUser = (:idUser)
    OR p.destination = (:idUser)
ORDER BY p.id DESC;



", [':idUser' => $_GET['idUser']]);

    echo json_encode($publications);

} elseif (isset($_GET['identifiantUser']) and !empty($_GET['identifiantUser'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $publications = Database::query("SELECT
    p. id,date,photoPublication,description,humeur,lieu,color,destination,nameDestination,identifierPersonne,idUser,
    CONCAT(u.prenom, ' ', u.nom) AS nameUser, u.profilPhoto AS photoUser,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', u.id, 'nom', u.nom, 'prenom', u.prenom))
     FROM users u
     WHERE FIND_IN_SET(u.id, p.identifierPersonne)
    ) AS identifiedUsers,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', l.id_utilisateur))
     FROM likes l
     WHERE p.id = l.id_publication
     GROUP BY l.id_publication
    ) AS likedUsers,
    (SELECT JSON_ARRAYAGG(
             JSON_OBJECT('id_commentaire', c.id, 'contenu_commentaire', c.contenu, 'id_utilisateur', c.id_utilisateur,
                         'user_info', JSON_OBJECT('id',u.id,'nom', u.nom, 'prenom', u.prenom,'profilPhoto', u.profilPhoto))
         )
     FROM commentaires c
     INNER JOIN users u ON c.id_utilisateur = u.id
     WHERE c.id = (
         SELECT MAX(c2.id) FROM commentaires c2 WHERE c2.id_publication = p.id
     )
     GROUP BY c.id_publication
    ) AS commentaires,
    (SELECT COUNT(*) FROM commentaires c WHERE c.id_publication = p.id) AS nbCommentaires
FROM
    publications p
    INNER JOIN users u ON p.idUser = u.id
WHERE
    p.idUser = (:idUser)
    OR p.idUser IN (
        SELECT identifiant FROM contact WHERE `token-me` = (:idUser)
    )
ORDER BY p.id DESC
",
        [':idUser' => $_SESSION['user'][0],

        ]);

    echo json_encode($publications);
} elseif (isset($_GET['idUserPhoto']) and !empty($_GET['idUserPhoto'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $publications = Database::query('SELECT * FROM publications WHERE idUser = (:idUserPhoto) AND photoPublication != (:photoPublication)  ORDER BY id DESC LIMIT 9',
        [':idUserPhoto' => $_GET['idUserPhoto'],
            ':photoPublication' => 'none',

        ]);

    echo json_encode($publications);
} elseif (isset($_GET['idPublication']) and !empty($_GET['idPublication'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $publicationsLike = Database::query("SELECT
    p.*,
    (SELECT
            JSON_ARRAYAGG(
                JSON_OBJECT('id', u.id, 'nom', u.nom, 'prenom', u.prenom)
            )
        FROM users u
        WHERE FIND_IN_SET(u.id, p.identifierPersonne)
    ) AS identifiedUsers,
    lastCommentaires.commentaires,
    l.likedUsers,
    COALESCE(t.nbCommentaires, 0) AS nbCommentaires
FROM
    publications p
    LEFT JOIN (
        SELECT
            id_publication,
            JSON_ARRAYAGG(
                JSON_OBJECT('id', l.id_utilisateur)
            ) AS likedUsers
        FROM likes l
        GROUP BY l.id_publication
    ) AS l ON p.id = l.id_publication
    LEFT JOIN (
        SELECT
            c1.id_publication,
            JSON_ARRAYAGG(
                JSON_OBJECT('user_info', JSON_OBJECT('id',u.id,'nom', u.nom, 'prenom', u.prenom,'profilPhoto', u.profilPhoto), 'id_commentaire', c1.id, 'id_utilisateur', c1.id_utilisateur, 'contenu_commentaire', c1.contenu)
            ) AS commentaires
        FROM commentaires c1
        INNER JOIN (
            SELECT
                MAX(id) AS max_id,
                id_publication
            FROM commentaires
            GROUP BY id_publication
        ) AS c2 ON c1.id = c2.max_id
        INNER JOIN users u ON c1.id_utilisateur = u.id
        GROUP BY c1.id_publication
    ) AS lastCommentaires ON p.id = lastCommentaires.id_publication
    LEFT JOIN (
        SELECT
            id_publication,
            COUNT(*) AS nbCommentaires
        FROM commentaires
        GROUP BY id_publication
    ) AS t ON p.id = t.id_publication
WHERE
    p.id = (:idPublication)
ORDER BY p.id DESC;
",
        [':idPublication' => $_GET['idPublication'],
        ]);

    echo json_encode($publicationsLike);
}
