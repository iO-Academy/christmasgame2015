<?php

$response = array(
    'success' => false,
    'message' => 'No action passed'
);

if (!empty($_POST['action']) && strlen($_POST['action']) < 13) {

    require_once('includes/dbcon.php');

    $action = $_POST['action'];

    session_start();

    switch($action) {
        case 'createUser':

            if (!empty($_POST['userName']) && !empty($_POST['userEmail'])) {

                $name = $_POST['userName'];
                $email = $_POST['userEmail'];
                // save user in database
                try {
                    $query = 'INSERT INTO `users` (`name`, `email`) VALUES ("' . $name . '", "' . $email . '")';
                    $db->exec($query);

                    $_SESSION['id'] = $db->lastInsertId();// id from database
                    $response = array(
                        'success' => true,
                        'message' => 'User saved'
                    );
                } catch (Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => 'Duplicate user email'
                    );
                }
            }
            break;
        case 'saveLevel':

            $level = $_POST['level'];
            $attempts = $_POST['attempts'];
            $time = $_POST['time'];
            $user = $_SESSION['id'];

            // save current level details
            $query = 'INSERT INTO `levels` (`level`, `user`, `attempts`, `time`)
                        VALUES ("' . $level . '", "' . $user . '", "' . $attempts . '", "' . $time . '")';
            $db->exec($query);

            $response = array(
                'success' => true,
                'message' => 'Level saved'
            );

            if (5 == $level) {
                $query = 'SELECT SUM(`time`) FROM `levels` WHERE `user` = ' . $user . ';';
                $conn = $db->prepare($query);
                $conn->execute();
                $totalTime = $conn->fetch();

                $response['data'] = $totalTime[0];
                // add all level times together and save
            }
            break;
        case 'getDetails':
            // return the users completed game details
            break;
        default:
            $response['message'] = 'Invalid action passed';
            break;
    }


}

header('Content-Type: application/json');
echo json_encode($response);