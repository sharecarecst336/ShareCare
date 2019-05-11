<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();
$namedParameters = array();
$namedParameters[":lId"] =$_GET['listingId'];

$sql = "DELETE FROM listings WHERE Id= :lId";
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters); // We NEED to include $namedParameters here

?>