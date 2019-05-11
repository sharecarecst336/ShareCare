<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$sql = "SELECT Listing_Id, count(Listing_Id) FROM `reserveration_requests`
GROUP by Listing_Id
ORDER BY count(Listing_Id) DESC
LIMIT 1";



$stmt = $conn->prepare($sql);
$stmt->execute(); 
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($records);

?>