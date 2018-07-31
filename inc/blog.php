<?php
	require_once("db.php");
	header('Content-Type: application/json; charset=utf-8');

	if(isset($_GET['name'])){
		$sql = "SELECT * FROM blog WHERE UPPER(name) = UPPER('".$_GET['name']."')";
		$result = $db->query($sql);

		if ($result->num_rows > 0) {
		    $blog = $result->fetch_assoc();
		    $blog['short_content'] = htmlspecialchars_decode($blog['short_content']);
		    $blog['long_content'] = htmlspecialchars_decode($blog['long_content']);
		    $blog_attributes = array();
		    
		    $blogsql = "SELECT * FROM blog_to_attribute WHERE blog_id = '".$blog['id']."'";
		    $result_blog_attributes = $db->query($blogsql);
		    
		    if ($result_blog_attributes->num_rows > 0) {
		    	while($rowattribute = $result_blog_attributes->fetch_assoc()) {
		    		array_push($blog_attributes, $rowattribute);
		    	}
		    }

		    $blog['filters'] = $blog_attributes;
	    }
	    
	    echo json_encode($blog);
	}else{
		$sql = "SELECT * FROM blog";
		$result = $db->query($sql);

		$blogs = array();

		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	$row['short_content'] = htmlspecialchars_decode($row['short_content']);
		    	$row['long_content'] = htmlspecialchars_decode($row['long_content']);
		    	$blog_attributes = array();

		    	$sql = "SELECT * FROM blog_to_attribute WHERE blog_id = '".$row['id']."'";
		    	$result_blog_attributes = $db->query($sql);
				if ($result_blog_attributes->num_rows > 0) {
		    		while($rowattribute = $result_blog_attributes->fetch_assoc()) {
		    			array_push($blog_attributes, $rowattribute);
		    		}
		    	}

		    	$row['attributes'] = $blog_attributes;

		    	array_push($blogs, $row);     
		    }

		    echo json_encode($blogs);
		} else {
		    echo "ziadne blogy";
		}
	}
?>