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
        $response = uploadImage($_FILES["file"], "/home/ubuntu/workspace/img/".$_POST['target']."/");
        if(!empty($_POST['id']) && $response['result'] == '1'){
            if(!$db->query("UPDATE shipping SET img = '".$_POST['target']."/".basename($_FILES["file"]["name"])."' WHERE id = '".$_POST['id']."'")){
                $response['result'] = '0';
                $errors = $response['errors'];
                array_push($errors, "Problém pri ukladaní do databázy!");
                $response['errors'] = $errors;
            }
        }
        
        echo json_encode($response);
    }else{
        if(isset($_POST['id']) && !empty($_POST['id'])){
            $db->query("UPDATE shipping SET name = '".$_POST['name']."', price = '".$_POST['price']."' WHERE id = '".$_POST['id']."'");
            $shipping_id = $_POST['id'];
        }else{
            $db->query("INSERT INTO shipping(name, img, price) VALUES ('".$_POST['name']."','".$_POST['img']."','".$_POST['price']."')");
            $shipping_id = $db->insert_id;
        }
        
        echo json_encode($shipping_id);
    }
}
?>