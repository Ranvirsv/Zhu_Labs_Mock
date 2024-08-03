<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$logFile = __DIR__ . '/fetch_users_log.txt';
$json = file_get_contents('php://input');
$userDetails = json_decode($json, true);

try {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
} catch (Exception $e) {
    error_log("Could not load .env file: " . $e->getMessage() . "\n", 3, $logFile);
    echo json_encode(["status" => "error", "message" => "Could not load .env file"]);
    exit;
}

if (!$_ENV['DB_HOST'] || !$_ENV['DB_NAME'] || !$_ENV['DB_PORT'] || !$_ENV['DB_USER'] || !$_ENV['DB_PASS']) {
    error_log("Environment variables are missing or failed to load\n", 3, $logFile);
    echo json_encode(["status" => "error", "message" => "Environment variables are missing or failed to load"]);
    exit;
} else {
    error_log("Successfully loaded .env file\n", 3, $logFile);
}

error_log(print_r($userDetails, true), 3, $logFile);

function run_sql($sql, $params = [])
{
    global $logFile;
    error_log("running_sql\n", 3, $logFile);

    $host = $_ENV['DB_HOST'];
    $port = $_ENV['DB_PORT'];
    $dbname = $_ENV['DB_NAME'];
    $user = $_ENV['DB_USER'];
    $pass = $_ENV['DB_PASS'];
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";

    try {
        $dbh = new PDO($dsn, $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        error_log("Connection successful\n", 3, $logFile);
    } catch (PDOException $e) {
        error_log("Connection failed: " . $e->getMessage() . "\n", 3, $logFile);
        exit;
    }

    try {
        $stmt = $dbh->prepare($sql);
        $success = $stmt->execute($params);

        if ($success) {
            error_log("Query executed successfully\n", 3, $logFile);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } else {
            error_log("Query execution error\n", 3, $logFile);
            http_response_code(400);
        }
    } catch (PDOException $e) {
        error_log('Query failed: ' . $e->getMessage() . "\n", 3, $logFile);
        http_response_code(500);
    }
}

if (!isset($userDetails['Operation'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Operation was not specified"]);
    exit;
}

if ($userDetails['Operation'] == "Fetch") {
    $sql = "SELECT email, name, institution, approved_user, admin_rights, approved_at FROM user_details;";
    $users = run_sql($sql);
    if ($users && count($users) > 0) {
        error_log(print_r($users, true), 3, $logFile);
        http_response_code(200);
        echo json_encode(["status" => "success", "data" => $users]);
    } else {
        error_log("No users found\n", 3, $logFile);
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No users found"]);
    }
} elseif ($userDetails['Operation'] == "Update") {
    $email = $userDetails['Email'];
    $key = $userDetails['Key'];
    $value = $userDetails['Value'];

    if ($key == 'approved_user' && $value == 1) {
        $sql = "UPDATE user_details SET $key = :value, approved_at = IFNULL(approved_at, NOW()) WHERE email = :email";
    } else {
        $sql = "UPDATE user_details SET $key = :value WHERE email = :email";
    }

    $params = [':value' => $value, ':email' => $email];
    if (run_sql($sql, $params)) {
        echo json_encode(["status" => "success", "message" => "User updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update user"]);
    }
} elseif ($userDetails['Operation'] == "Delete") {
    $email = $userDetails['Email'];
    $sql = "DELETE FROM user_details WHERE email = :email";
    $params = [':email' => $email];
    if (run_sql($sql, $params)) {
        echo json_encode(["status" => "success", "message" => "User deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete user"]);
    }
}
?>