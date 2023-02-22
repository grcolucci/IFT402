<?php
    $servername = "Georges-iMac.home";
    $username = "illness";
    $password = "DBFaster";
    $dbname = "illness";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = "SELECT * FROM VenueTypes";  //This is where I specify what data to query
    $result = $conn->query($sql);
    echo json_encode($result);
?>