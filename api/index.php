<?php

$response = array(
    'success' => false,
    'message' => 'No action passed'
);

if (!empty($_POST['action'])) {

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

                    $query = 'SELECT `id`, `attempts` FROM `users` WHERE `userEmail` = "' . $email . '";';
                    $conn = $db->prepare($query);
                    $conn->execute();
                    $curUser = $conn->fetch();

                    if (!empty($curUser)) {
                        $attempts = $curUser['attempts']+1;

                        $id = $curUser['id'];
                        $_SESSION['id'] = $curUser['id'];
                        $_SESSION['attempts'] = $attempts;

                        $query = 'UPDATE `users` SET `attempts` = ' . $attempts . ' WHERE `id` = ' . $id . ';';
                        $db->exec($query);

                        $response = array(
                            'success' => true,
                            'message' => 'User account exists',
                            'curAttempt' => $attempts
                        );
                        break;
                    }

                    $query = 'INSERT INTO `users` (`userName`, `userEmail`) VALUES ("' . $name . '", "' . $email . '")';
                    $db->exec($query);

                    $_SESSION['id'] = $db->lastInsertId();// id from database
                    $_SESSION['try'] = 1;
                    $response = array(
                        'success' => true,
                        'message' => 'User saved'
                    );
                } catch (Exception $e) {
                    $response = array(
                        'success' => false,
                        'message' => $e->getMessage()
                    );
                }
            }
            break;
        case 'saveLevel':

            $level = $_POST['level'];
            $attempts = $_POST['attempts'];
            $time = $_POST['time'];
            $user = $_SESSION['id'];
            $try = $_SESSION['attempts'];

            try {
                $query = 'SELECT 1 FROM `levels` WHERE `user` = ' . $user . ' AND `try` = ' . $try . ' AND `level` = ' . $level . ';';
                $conn = $db->prepare($query);
                $conn->execute();
                $previousSave = $conn->fetch();

                if ($previousSave) {
                    $response['message'] = 'Error occurred: level already saved';
                    break;
                }

                // save current level details
                $query = 'INSERT INTO `levels` (`level`, `user`, `attempts`, `time`, `try`)
                        VALUES ("' . $level . '", "' . $user . '", "' . $attempts . '", "' . $time . '", "' . $try . '")';
                $db->exec($query);

                $response = array(
                    'success' => true,
                    'message' => 'Level saved'
                );

                if (5 == $level) {
                    // add all level times together and save
                    $query = 'SELECT SUM(`time`) AS \'time\' FROM `levels` WHERE `user` = ' . $user . ' AND `try` = ' . $try . ';';
                    $conn = $db->prepare($query);
                    $conn->execute();
                    $totalTime = $conn->fetch(PDO::FETCH_ASSOC);
                    $totalTime = $totalTime['time'];

                    $query = 'SELECT `pb` FROM `users` WHERE `id` = ' . $user . ';';
                    $conn = $db->prepare($query);
                    $conn->execute();
                    $pb = $conn->fetch(PDO::FETCH_ASSOC);
                    $response['totalTime'] = $pb['pb'];

                    if ($totalTime < $response['totalTime']) {
                        $query = 'UPDATE `users` SET `pb` = ' . $totalTime . ' WHERE `id` = ' . $user . ';';
                        $db->exec($query);
                        $response['totalTime'] = $totalTime;
                    }

                }
            } catch (Exception $e) {
                $response = array(
                    'success' => false,
                    'message' => 'An unexpected error occurred' // $e->getMessage()
                );
            }
            break;
        case 'getDetails':
            $user = $_SESSION['id'];

            try {
                $query = 'SELECT `level`, `attempts`, `time`, `try` FROM `levels` WHERE `user` = ' . $user;

                if ($_POST['level']) {
                    $level = $_POST['level'];
                    $query .= ' AND `level` = ' . $level;
                }

                if ($_POST['curAttempt'] == '1') {
                    $attempt = $_SESSION['attempts'];
                    $query .= ' AND `try` = ' . $attempt;
                }

                $query .= ' ORDER BY `try`, `level`;';

                $conn = $db->prepare($query);
                $conn->execute();
                $details = $conn->fetchAll(PDO::FETCH_ASSOC);

                $response = array(
                    'success' => true,
                    'message' => 'Success',
                    'details' => $details
                );
            } catch(Exception $e) {
                $response = array(
                    'success' => false,
                    'message' => 'Unexpected error, please try again'
                );
            }
            break;
        case 'getLeaderboard':

            try {
                $query = 'SELECT `userName`, `attempts`, `pb` FROM `users` WHERE pb IS NOT NULL ORDER BY `pb` ASC LIMIT 5;';
                $conn = $db->prepare($query);
                $conn->execute();
                $details = $conn->fetchAll(PDO::FETCH_ASSOC);

                $response = array(
                    'success' => true,
                    'message' => 'Success',
                    'details' => $details
                );
            } catch(Exception $e) {
                $response = array(
                    'success' => false,
                    'message' => 'Unexpected error, please try again'
                );
            }
            break;
        default:
            $response['message'] = 'Invalid action passed';
            break;
    }


}

header('Content-Type: application/json');
echo json_encode($response);