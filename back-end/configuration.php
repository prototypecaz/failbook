<?php

require_once __DIR__ . '/vendor/autoload.php'; // Chemin vers autoload.php généré par Composer
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$database = (array) array(
    'host' =>  $_ENV['DB_HOST'],
    "dbname" => $_ENV['DB_DATABASE'],
    "username" => $_ENV['DB_USERNAME'],
    "password" =>  $_ENV['DB_PASSWORD']
);

$mailer = (array) array(
    'host' => "smtp.gmail.com",
    'port' => "587",
    'username' => $_ENV['DB_MAIL'],
    'password' => $_ENV['DB_MOTDEPASSE']

);

$general = (array) array(
    'domain' => "localhost:3000",
);
