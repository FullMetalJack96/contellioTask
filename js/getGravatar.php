<?php
header('Access-Control-Allow-Origin: *');
$hash = $_GET['hash'];
$data = file_get_contents('https://www.gravatar.com/'.$hash.'.json');

echo(json_decode($data));
 ?>
