<?php
require "config.php";

$data = json_decode(file_get_contents("php://input"));

$id = $_GET['id'];
$name = $_GET['name'];
$email = $_GET['email'];
$mobile = $_GET['mobile'];

$sql = "UPDATE users SET name = '$name', email = '$email', mobileno = '$mobile' WHERE id = " . $id;
$result = $conn->query($sql);

if ($result) {
    $response[] = array("status" => 1);
} else {
    $response[] = array("status" => 0);
}


echo json_encode($response);
