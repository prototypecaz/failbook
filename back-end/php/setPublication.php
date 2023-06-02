<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
ini_set('post_max_size', '1M');
ini_set('upload_max_filesize', '1M');

$WHITE_LIST = (array) ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
$UPLOADS = (string) '../../src/assets/upload/';

session_start();

if (isset($_FILES['image']) and !empty($_FILES['image'])) {

    $image = (string) $_FILES['image']['name'];

    // recupere l'extension de l'image
    $extension = (string) pathinfo($image)['extension'];

    // in_array('ceQueJeCherche', ['dansQuoi']);
    if (true) {

        // recupere le nom de l'image
        $name = (string) pathinfo($image)['filename'];

        // genere une chaine aleatoire alphanumerique
        $random = (string) bin2hex(random_bytes(32));

        // construction du nouveau nom de l'image
        $image = (string) "$name-$random.$extension";

        // move_uploaded_file('source', 'destination');
        move_uploaded_file($_FILES['image']['tmp_name'], $UPLOADS . $image);

        sleep(1);

        echo $image;
    }
}

if (isset($_GET['nameUser']) and !empty($_GET['nameUser']) and
    isset($_GET['date']) and !empty($_GET['date']) and
    isset($_GET['photoUser']) and !empty($_GET['photoUser']) and
    isset($_GET['idUser']) and !empty($_GET['idUser']) and
    isset($_GET['photoPublication']) and !empty($_GET['photoPublication'])) {

    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    $sanitizing = (object) new Sanitizing();

    require_once '../Class/Database.php';

    $data = Database::query("INSERT INTO `publications` (`id`, `nameUser`, `photoUser`, `date`, `photoPublication`, `description`,`humeur`,`lieu`,`color`,`destination`,`nameDestination`,`identifierPersonne`,`idUser`) VALUES (NULL, (:nameUser), (:photoUser), (:date), (:photoPublication),(:description),(:humeur),(:lieu),(:color),(:destination),(:nameDestination),(:identifierPersonne),(:idUser))", [
        ':nameUser' => $_GET['nameUser'],
        ':photoUser' => $_GET['photoUser'],
        ':date' => $_GET['date'],
        ':photoPublication' => $_GET['photoPublication'],
        ':description' => $_GET['description'],
        ':humeur' => $_GET['humeur'],
        ':lieu' => $_GET['lieu'],
        ':color' => $_GET['color'],
        ':destination' => $_GET['destination'],
        ':nameDestination' => $_GET['nameDestination'],
        ':identifierPersonne' => $_GET['identifierPersonne'],
        ':idUser' => $_GET['idUser'],
    ]

    );

    if (isset($_GET['identifierPersonne']) and !empty($_GET['identifierPersonne'])) {

        $identifierPersonne = Database::query('SELECT * FROM users WHERE FIND_IN_SET(id, (:identifierPersonne))',
            [':identifierPersonne' => $_GET['identifierPersonne'],
            ]);

        echo json_encode($identifierPersonne);
    }

}
