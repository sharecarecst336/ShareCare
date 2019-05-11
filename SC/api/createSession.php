<?php
    session_start();
     $_SESSION["email"] = $_GET['email'];
     $_SESSION["isLoggedIn"] = true;
?>