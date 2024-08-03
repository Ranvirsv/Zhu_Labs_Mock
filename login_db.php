<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Define the log file path
$logFile = __DIR__ . '/script.txt';

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


$json = file_get_contents('php://input');
$userDetails = json_decode($json, true);

$email = $userDetails['email'];

function run_sql($sql, $params = [], $isSelect = false)
{
    global $logFile;
    error_log("running_sql\n", 3, $logFile);

    $host = $_ENV['DB_HOST'];
    $port = $_ENV['DB_PORT'];
    $dbname = $_ENV['DB_NAME'];
    $user = $_ENV['DB_USER'];
    $pass = $_ENV['DB_PASS'];
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
    $table = "user_details";

    try {
        $dbh = new PDO($dsn, $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        error_log("Connection successful\n", 3, $logFile);
    } catch (PDOException $e) {
        error_log("Connection failed: " . $e->getMessage() . "\n", 3, $logFile);
        exit;
    }

    try {
        // Prepare and execute the statement
        $stmt = $dbh->prepare($sql);
        $success = $stmt->execute($params);

        if ($success) {
            error_log("Query executed successfully\n", 3, $logFile);
            if ($isSelect) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return true;
            }
        } else {
            error_log("Query execution error\n", 3, $logFile);
            http_response_code(400);
            return false;
        }
    } catch (PDOException $e) {
        error_log('Query failed: ' . $e->getMessage() . "\n", 3, $logFile);
        http_response_code(500);
        return false;
    }
}

function login()
{
    global $email, $logFile;
    $sql = "SELECT approved_user, admin_rights FROM user_details WHERE email = ?;";
    $params = [$email];

    $results = run_sql($sql, $params, true);
    if ($results && count($results) > 0) {
        $user = $results[0];
        if ($user['approved_user'] == 0) {
            echo json_encode(["status" => "unapproved", "message" => "Login denied"]);
        } else {
            error_log("Login successful\n\n", 3, $logFile);
            echo json_encode(["status" => "success", "message" => "Login successful", "Admin" => $user['admin_rights']]);
        }
        http_response_code(200);

    } else {
        error_log("Login failed\n\n", 3, $logFile);
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
    }

}

function register()
{
    global $logFile, $userDetails, $email;

    error_log("in_register\n", 3, $logFile);
    $name = $userDetails['fullName'];
    $institution = $userDetails['instituteName'];

    $sql = 'INSERT INTO user_details (email, name, institution) VALUES (?, ?, ?)';
    $params = [$email, $name, $institution];

    error_log("run_sql\n", 3, $logFile);
    if (run_sql($sql, $params)) {
        error_log("Registration successful\n\n", 3, $logFile);
        http_response_code(201);
        echo json_encode(["status" => "success", "message" => "Registration successful"]);
    } else {
        error_log("Registration failed\n\n", 3, $logFile);
        echo json_encode(["status" => "error", "message" => "Registration failed"]);
    }
}

error_log("" . $userDetails['typeOfOperation'] . "\n", 3, $logFile);

if ($userDetails['typeOfOperation'] == 'register') {
    register();
} else {
    login();
}
?>