<?php 
require 'vendor/autoload.php';

use Dotenv\Dotenv;

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

// Define the log file path
$logFile = __DIR__ . '/DB_LOG.txt';

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

// PDO connection setup
$host = $_ENV[ 'DB_HOST'];
$port = $_ENV['DB_PORT'];
$dbname = "geosci_consolidated_tables1";
$user = $_ENV[ 'DB_USER'];
$pass = $_ENV[ 'DB_PASS'];
$dsn = "mysql:host=$host;port=$port;dbname=$dbname";

try {
    $dbh = new PDO($dsn, $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit;
}

// Check for a valid query parameter
if (!isset($_GET['query']) || empty($_GET['query'])) {
    echo json_encode(["error" => "Invalid or no query parameter provided"]);
    exit;
}

$response = [];
$tableName = "something";

$query = $_GET['query'];

if ($query == "Species"){
    // Arrays to store results from each table
    $results_palandri = [];
    $results_carbonates = [];
    $results_oxygen = [];

    // Fetch species from 'rate_utility_palandri'
    try {
        $stmt = $dbh->query('SELECT Species FROM geosci_consolidated_tables1.rate_utility_palandri');
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $results_palandri[] = $row;
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Query failed on palandri: " . $e->getMessage()]);
        exit;
    }

    // Fetch species from 'rate_utility_carbonates'
    try {
        $stmt = $dbh->query('SELECT Species FROM geosci_consolidated_tables1.rate_utility_carbonates');
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $results_carbonates[] = $row;
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Query failed on carbonates: " . $e->getMessage()]);
        exit;
    }

    // Fetch species from 'rate_utility_oxygen'
    try {
        $stmt = $dbh->query('SELECT Species FROM geosci_consolidated_tables1.rate_utility_oxygen');
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $results_oxygen[] = $row;
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => "Query failed on oxygen: " . $e->getMessage()]);
        exit;
    }

    $response = array_merge($results_palandri, $results_carbonates, $results_oxygen);
    $speciesArray = [];

    // Iterate through each object in the response
    foreach ($response as $item) {
        $speciesArray[] = $item['Species']; // Add the species name to the array
    }

    // Create a new associative array with a single key
    $response = ["Species" => $speciesArray];
}

elseif (preg_match('/^Name-(\w+)$/', $query, $matches)) {
    $fileName = $matches[1];  // Extract the file name from the query
    $tables = [
        'nonphasetransition',
        'landautheory',
        'braggwilliams',
        'gases',
        'aqueous'
    ];

    foreach ($tables as $table) {
        $tableName = "{$fileName}_{$table}";
        $result = [];
        try {
            $stmt = $dbh->query("SELECT Name FROM geosci_consolidated_tables1.{$tableName}");
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $result[] = $row['Name'];
            }
            $response[$tableName] = $result;
        } catch (PDOException $e) {
            $response[$tableName] = ["error" => "Query failed on $tableName: " . $e->getMessage()];
        }
    }
}

echo json_encode($response);
?>
