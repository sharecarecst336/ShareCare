<?php 
include '../dbConnect.php';
$conn = getDatabaseConnection();

$namedParameters = array();
$namedParameters[":lId"] =$_GET['listingId'];
$namedParameters[":categoryId"] = $_GET['category'];
$namedParameters[":title"] =$_GET['title'];
$namedParameters[":location"] =$_GET['location'];
$namedParameters[":productDescription"] =$_GET['description'];
$namedParameters[":avail"] =$_GET['availability'];
$sql = "UPDATE `listings` SET
        Category_id = :categoryId,
        Title = :title,
        Availability = :avail,
        Description = :productDescription,
        Location = :location
        WHERE Id = :lId;";
$stmt = $conn->prepare($sql);
$stmt->execute($namedParameters); // We NEED to include $namedParameters here
echo $sql;
?>