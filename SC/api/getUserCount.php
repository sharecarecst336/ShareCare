<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$sql = "SELECT COUNT(email)
FROM users";



$stmt = $conn->prepare($sql);
$stmt->execute(); 
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($records);

?>