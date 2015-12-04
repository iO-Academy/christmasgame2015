<?php
$servername = "192.168.20.56";
$username = "root";
$database = "christmasGame";
$password = "";

try {
    $db = new PDO("mysql:host=$servername;dbname=christmasGame", $username, $password);
    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}
?> 