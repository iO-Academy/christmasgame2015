<?php
$servername = "192.168.20.6";
$username = "root2";
$password = "fsd";

try {
    $db = new PDO("mysql:host=$servername;dbname=christmaGame", $username, $password);
    // set the PDO error mode to exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
	$response = array(
	    'success' => false,
	    'message' => 'Database connection failed'
	);
	header('Content-Type: application/json');
	die(json_encode($response));
}
?> 