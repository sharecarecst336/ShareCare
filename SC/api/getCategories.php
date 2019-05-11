<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$sql = "SELECT Id, Name FROM catagories ORDER BY Name";


$stmt = $conn->prepare($sql);
$stmt->execute(); 
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($records);

?>