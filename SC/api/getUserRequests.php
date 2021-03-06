<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$userEmail = $_GET['userEmail'];
$sql = "
SELECT * FROM reserveration_requests r 
LEFT JOIN listings l ON r.Listing_Id = l.id
WHERE r.user = :email
";

$np = array();
$np[':email'] = $userEmail;

$stmt = $conn->prepare($sql);
$stmt->execute($np); 
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($records);

?>