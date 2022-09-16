<?php
require "config.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$mobile = $data->mobile;
$status = $data->status;

$sql = "INSERT INTO users (name, email, mobileno, status) VALUES ('$name', '$email', '$mobile', '$status')";
$result = $conn->query($sql);

if ($result) {
    $response[] = array("status" => 1);
} else {
    $response[] = array("status" => 1);
}

echo json_encode($response);