<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$namedParameters = array();

$namedParameters[":userEmail"] = $_GET['userEmail'];
$namedParameters[":categoryId"] = $_GET['category'];
$namedParameters[":title"] = $_GET['title'];
$namedParameters[":location"] = $_GET['location'];
$namedParameters[":description"] = $_GET['description'];
$namedParameters[":avail"] = $_GET['availability'];
$namedParameters[":img_id"] = $_GET['image_id'];

$sql = "INSERT INTO `listings` (`Id`, `Creator_Email`, `Category_id`, `Title`, `Location`, `Description`, `Availability`, `image_id`) 
        VALUES (NULL, :userEmail, :categoryId, :title, :location, :description, :avail, :img_id)";
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters); // We NEED to include $namedParameters here
echo "Value assigned to Primary Key"  .  $conn->lastInsertId();

?>