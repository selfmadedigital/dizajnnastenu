<?php
	require_once("db.php");
	header('Content-Type: application/json; charset=utf-8');

	$product_name = "Fototapety";
	$product_name = $_POST['name'];

	$sql = "SELECT * FROM product WHERE UPPER(name) = UPPER('".$product_name."')";
	$result = $db->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	    	$product = $row;
	    	$prices = array();
	    	$materials = array();
	    	$shippings = array();
	    	$installation_prices = array();
	    	$quantity_discount = array();
	    	
	    	$product['description'] = htmlspecialchars_decode($product['description']);
			$product['short_information'] = htmlspecialchars_decode($product['short_information']);
    		$product['long_information'] = htmlspecialchars_decode($product['long_information']);


	    	$sql = "SELECT * FROM product_prices WHERE UPPER(product_name) = UPPER('".$product_name."')";
	    	$resultprices = $db->query($sql);
			if ($resultprices->num_rows > 0) {
	    		while($rowprice = $resultprices->fetch_assoc()) {
	    			$prices[floatval($rowprice['size'])] = floatval($rowprice['price']);
	    		}
	    	}

	    	$product['prices'] = $prices;

	    	$sql = "SELECT * FROM product_materials WHERE UPPER(product_name) = UPPER('".$product_name."')";
	    	$resultmaterials = $db->query($sql);
			if ($resultmaterials->num_rows > 0) {
	    		while($material = $resultmaterials->fetch_assoc()) {
	    			$material_prices = array();

	    			$sql = "SELECT * FROM material_prices WHERE material_id = '".$material['id']."'";
			    	$result_material_prices = $db->query($sql);
					if ($result_material_prices->num_rows > 0) {
			    		while($price = $result_material_prices->fetch_assoc()) {
			    			$material_prices[floatval($price['size'])] = floatval($price['price']);
			    		}
			    	}

			    	$material['prices'] = $material_prices;
			    	$materials[$material['id']] = $material;
	    		}
	    	}
	       
	    	$product['materials'] = $materials;



	    	$sql = "SELECT * FROM shipping";
	    	$result_shipping = $db->query($sql);
			if ($result_shipping->num_rows > 0) {
	    		while($shipping = $result_shipping->fetch_assoc()) {
	    			$shipping['price'] = floatval($shipping['price']);
	    			array_push($shippings, $shipping);
	    		}
	    	}
	       
	    	$product['shippings'] = $shippings;

	    	$sql = "SELECT * FROM installation_prices WHERE UPPER(product_name) = UPPER('".$product_name."')";
	    	$result_installation_prices = $db->query($sql);
			if ($result_installation_prices->num_rows > 0) {
	    		while($price = $result_installation_prices->fetch_assoc()) {
	    			$installation_prices[floatval($price['size'])] = floatval($price['price']);
	    		}
	    	}

	    	$product['installation_prices'] = $installation_prices;

	    	$sql = "SELECT * FROM product_quantity_discount WHERE UPPER(product_name) = UPPER('".$product_name."')";
	    	$result_quantity_discount = $db->query($sql);
			if ($result_quantity_discount->num_rows > 0) {
	    		while($discount = $result_quantity_discount->fetch_assoc()) {
	    			$quantity_discount[intval($discount['quantity'])] = floatval($discount['discount']);
	    		}
	    	}

	    	$product['quantity_discount'] = $quantity_discount;

	        echo json_encode($product);
	    }
	} else {
	    echo "produkt neexistuje";
	}
?>