<?php
	header("Content-Type: application/json; charset=utf-8");

	$target_dir = "/uploads/";
	$target_file = $target_dir . basename($_FILES["file"]["name"]);
	$success = 1;
	$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
	// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) {
	    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
	    if($check !== false) {
	        echo "File is an image - " . $check["mime"] . ".";
	        $success = 1;
	    } else {
	        echo "File is not an image.";
	        $success = 0;
	    }
	}

	if ($success) {
		$output = array("success" => true, "message" => "Success!");
	} else {
		$output = array("success" => false, "error" => "Failure!");
	}

	echo json_encode($output);
?>