<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
session_start();

if (isset($_SESSION['email']) and !empty($_SESSION['email']) and
    isset($_GET['uniqueCode']) and !empty($_GET['uniqueCode'])) {
    $email = $_SESSION['email'];

    require_once '../Class/Database.php';
    $verifCode = Database::query('SELECT `uniqueCode` FROM confirmationEmail WHERE uniqueEmail = (:email) ',
        array(
            ':email' => $email,
        )
    );

    $verifEmail = Database::query('SELECT id FROM users WHERE emailOrPhone = (:email) ',
        array(
            ':email' => base64_decode($email),
        )
    );

    $uniqueCodeBDD = base64_decode($verifCode[0]['uniqueCode']);

    if ($_GET['uniqueCode'] == $uniqueCodeBDD) {

        Database::query('UPDATE `users` SET `activate` = 1 WHERE `id` = (:id)',
            array(
                ':id' => $verifEmail[0]['id'],
            )
        );

        Database::query('DELETE FROM `confirmationEmail` WHERE `uniqueEmail` = (:uniqueEmail)',
            array(
                ':uniqueEmail' => $email,
            )
        );

        echo 'success';
    }
}
