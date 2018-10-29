<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Shipping {}
    
    if ( isset( $_GET['id'] ) && !empty( $_GET['id'] ) ){
        $result = $db->query("SELECT * FROM shipping WHERE id = '".$_GET['id']."'");
        $shipping = $result->fetch_assoc();
        echo json_encode($shipping);
    }else{
        $shippings = array();  
        
        $result = $db->query("SELECT * FROM shipping");
        while($row = $result->fetch_assoc()) {
            $s = new Shipping();
            $s->id = $row['id'];
            $s->name = $row['name'];
            $s->img = $row['img'];
            $s->price = $row['price'];
            $shippings[] = $s;
        }
            
        echo json_encode($shippings);
    }
    
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->query("DELETE FROM shipping WHERE id = '".$_GET['id']."'");
    echo json_encode('ok');    
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES)){
        $response = uploadImage($_FILES["file"], $img_folder_path.$_POST['target']."/");
        if(!empty($_POST['id']) && $response['result'] == '1'){
            $filename = preg_replace('/\s+/', '_', basename($_FILES["file"]["name"]));
            if(!$db->query("UPDATE shipping SET img = '".$_POST['target']."/".$filename."' WHERE id = '".$_POST['id']."'")){
                $response['result'] = '0';
                $errors = $response['errors'];
                array_push($errors, "Problém pri ukladaní do databázy!");
                $response['errors'] = $errors;
            }
        }
        
        echo json_encode($response);
    }else{
        if(isset($_POST['id']) && !empty($_POST['id'])){
            $query = "UPDATE shipping SET name = '".$_POST['name']."'";
            if(!empty($_POST['price'])){
                $query .= ", price = '".$_POST['price']."'";
            }
            $query .= "WHERE id = '".$_POST['id']."'";
            $db->query($query);
            $shipping_id = $_POST['id'];
        }else{
            $query = "INSERT INTO shipping(name, img";
            if(!empty($_POST['price'])){
                $query .= ", price";
            }
            $query .= ") VALUES ('".$_POST['name']."','".$_POST['img']."'";
            if(!empty($_POST['price'])){
                $query .= ",'".$_POST['price']."'";
            }
            $query .= ")";
            $db->query($query);
            $shipping_id = $db->insert_id;
        }
        
        echo json_encode($shipping_id);
    }
}
?>