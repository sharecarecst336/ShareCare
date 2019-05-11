<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();


$sql = "SELECT * FROM listings WHERE Id = :lId";

$np = array();
$np[':lId'] = $_GET['listingId'];

$stmt = $conn->prepare($sql);
$stmt->execute($np); 
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($records);

?>