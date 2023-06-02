<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');

ini_set('post_max_size', '1M');
ini_set('upload_max_filesize', '1M');

$WHITE_LIST = (array) ['jpg', 'jpeg', 'gif', 'png', 'bmp'];
$UPLOADS = (string) '../../src/assets/upload/';

if (isset($_FILES['photo']) and !empty($_FILES['photo'])) {

    $image = (string) $_FILES['photo']['name'];

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

        move_uploaded_file($_FILES['photo']['tmp_name'], $UPLOADS . $image);

        sleep(1);

        echo $image;

    }
} elseif (isset($_GET['photoProfil']) and !empty($_GET['photoProfil']) and
    isset($_GET['id']) and !empty($_GET['id'])) {
    require_once '../Class/Sanitizing.php';
    // Instanciation de la classe Sanitizing et creation de l'objet $sanitizing
    require_once '../Class/Database.php';

    $updatePhotoUser = Database::query('UPDATE users SET profilPhoto = (:photoProfil) WHERE id = (:idUser)', [
        ':photoProfil' => $_GET['photoProfil'],
        ':idUser' => $_GET['id'],
    ]);

    $updatePhotoGalerie = Database::query('UPDATE GalerieUsers SET photoProfil = (:photoProfil) WHERE id_user = (:idUser)', [
        ':photoProfil' => $_GET['photoProfil'],
        ':idUser' => $_GET['id'],
    ]);

    echo 'success';

} elseif (isset($_GET['photoAnnule']) and !empty($_GET['photoAnnule'])) {

    $chemin_image = "../../src/assets/upload/" . $_GET['photoAnnule'];

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
