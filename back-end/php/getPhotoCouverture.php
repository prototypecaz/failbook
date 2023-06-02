<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

ini_set('post_max_size', '1M');
ini_set('upload_max_filesize', '1M');

$WHITE_LIST = (array) ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
$UPLOADS = (string) '../../src/assets/upload/';

if (isset($_FILES['photoCouverture']) and !empty($_FILES['photoCouverture'])) {

    $image = (string) $_FILES['photoCouverture']['name'];

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
        move_uploaded_file($_FILES['photoCouverture']['tmp_name'], $UPLOADS . $image);

        sleep(1);

        echo $image;

    }
} elseif (isset($_GET['photoCouverture']) and !empty($_GET['photoCouverture']) and
    isset($_GET['id']) and !empty($_GET['id'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $updatePhotoGalerie = Database::query('UPDATE users SET profilCouverture = (:photoCouverture) WHERE id = (:idUser)', [
        ':photoCouverture' => $_GET['photoCouverture'],
        ':idUser' => $_GET['id'],
    ]);

    echo 'success';

} elseif (isset($_GET['photoCouvertureAnnule']) and !empty($_GET['photoCouvertureAnnule'])) {

    $chemin_image = "../../src/assets/upload/" . $_GET['photoCouvertureAnnule'];

    if (file_exists($chemin_image)) {
        if (unlink($chemin_image)) {

            echo 'reussis';
        } else {
            echo ' une erreur est produite';
        }
    } else {
        echo 'aucune image';
    }
}
