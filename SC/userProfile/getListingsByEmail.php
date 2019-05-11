<?php
    include '../dbConnect.php';
    $conn = getDatabaseConnection();
    
    $email = $_GET['email'];
    $np = array();
    $np[":email"] = $email;
    
    $sql = "SELECT * FROM listings WHERE Creator_Email = :email";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute($np); 
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($records);
?>