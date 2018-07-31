<?php
$db = mysqli_connect("mariadb101.websupport.sk", "dizajnnastenu", "VGw04sSxwc", "dizajnnastenu","3312");

if (!$db) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}else{
	mysqli_set_charset($db,"utf8");
}
?>