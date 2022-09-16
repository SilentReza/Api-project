<?php
require 'config.php';

$user_id = $_GET["userId"];
$sql = "DELETE FROM users WHERE id = " . $user_id;

$result = $conn->query($sql);

if ($result) {
    $response[] = array("status" => "ok");
} else {
    $response[] = array("status" => "error");
}

echo json_encode($response);
