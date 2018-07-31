<?php
	require_once("db.php");
	header('Content-Type: application/json; charset=utf-8');

	if(isset($_GET['filter'])){
		$sql = "SELECT inspiration_id FROM inspiration_to_attribute WHERE ";
		$count = 0;
		foreach($_GET['filter'] as $filter){
			if($count == 0){
				$sql .=	"filter_id = '".$filter."' ";
			}else{
				$sql .=	"OR filter_id = '".$filter."' ";
			}
			
			$count++;
		}
		$sql .= "GROUP BY inspiration_id HAVING COUNT(filter_id) = ".$count;
		$result = $db->query($sql);
		$inspirations = array();
		
		if($result->num_rows > 0){
			while($row = $result->fetch_assoc()) {
				$sql = "SELECT * FROM inspiration WHERE id = '".$row['inspiration_id']."'";
				$resultinsp = $db->query($sql);
				array_push($inspirations, $resultinsp->fetch_assoc());
			}
		}else{
			$sql = "SELECT * FROM inspiration";
			$resultinsp = $db->query($sql);
			while($insp = $resultinsp->fetch_assoc()){
				array_push($inspirations, $insp);
			}
		}
		
		echo json_encode($inspirations);
	}else{
		$sql = "SELECT * FROM inspiration";
		$result = $db->query($sql);
	
		$inspirations = array();
	
		if ($result->num_rows > 0) {
		    // output data of each row
		    while($row = $result->fetch_assoc()) {
		    	$inspiration_attributes = array();
	
		    	$sql = "SELECT filter_attribute.name, filter_attribute.img, filter_attribute.attribute FROM inspiration_to_attribute JOIN filter_attribute ON inspiration_to_attribute.filter_id = filter_attribute.id WHERE UPPER(inspiration_to_attribute.inspiration_name) = UPPER('".$row['name']."')";
		    	$result_inspiration_attributes = $db->query($sql);
				if ($result_inspiration_attributes->num_rows > 0) {
		    		while($rowattribute = $result_inspiration_attributes->fetch_assoc()) {
		    			array_push($inspiration_attributes, $rowattribute);
		    		}
		    	}
	
		    	$row['attributes'] = $inspiration_attributes;
	
		    	array_push($inspirations, $row);     
		    }
	
		    echo json_encode($inspirations);
		} else {
		    echo "ziadne inspiracie";
		}
	}
?>