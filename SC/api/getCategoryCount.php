<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$sql = "SELECT c.Name, count(Category_id) FROM listings l
LEFT JOIN catagories c ON l.Category_id = c.id
 GROUP by Category_id";



$stmt = $conn->prepare($sql);
$stmt->execute(); 
$records = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($records);

?>