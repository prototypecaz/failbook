<?php
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
header("Content-Security-Policy: default-src 'self' http://www.localhost:8000");

session_start();

if (isset($_SESSION['user']) and !empty($_SESSION['user'])) {
    echo json_encode($_SESSION['user']);
} else {
    echo json_encode([]);
}
