<?php
$servername = "127.0.0.1";
$username = "cg3mibnw";
$password = "5Kkll5p4kOSDNg4QfUJF";

try {
    $db = new PDO("mysql:host=$servername;dbname=christmasgame", $username, $password);
    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}
?> 