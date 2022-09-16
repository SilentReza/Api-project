<?php
require "config.php";

$sql = "SELECT * FROM users";
$result = $conn->query($sql);
$data = array();

while ($row = $result->fetch_assoc()) {
    switch ($row["status"]) {
        case 0:
            $row["statusText"] = "Inactive";
            $row["statusClass"] = "bg-danger";
            break;

        case 1:
            $row["statusText"] = "Active";
            $row["statusClass"] = "bg-success";
            break;
    }
    $row["editMode"] = false;
    array_push($data, $row);
}

echo json_encode(array("status" => 1, "data" => $data));
