<?php
header('Access-Control-Allow-Origin: *');
$json = file_get_contents('http://app.contellio.com/api/public/random-item');
echo($json);
 ?>
