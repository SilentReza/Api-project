<?php
require "config.php";

$id = $_GET["user_id"];
$status = $_GET["status"];
if ($status == 1) {
    $status = 0;
} else {
    $status = 1;
}

$sql = "UPDATE users SET status = '$status' WHERE users.id = '$id'";

$result = $conn->query($sql);

if ($result) {
    $response[] = array("status" => 1);
} else {
    $response[] = array("status" => 0);
}

echo json_encode($response);
