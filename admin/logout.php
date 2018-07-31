<?php
    require __DIR__ . '/vendor/autoload.php';

    $db = new \PDO('mysql:dbname=dizajnnastenu;host=mariadb101.websupport.sk;port=3312;charset=utf8mb4', 'dizajnnastenu', 'VGw04sSxwc');
    $auth = new \Delight\Auth\Auth($db);

    $auth->logOut();
    header('Location: /admin');
?>