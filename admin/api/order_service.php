<?php
require_once '_db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Status {}
    
    if ( isset( $_GET['target'] ) && !empty( $_GET['target'] ) ){
        if($_GET['target'] == 'states'){
            $result = $db->query("SELECT * FROM order_status");
            $states = array();  
            
            while($row = $result->fetch_assoc()) {
                $s = new Status();
                $s->id = $row['id'];
                $s->name = $row['name'];
                $s->state = $row['state'];
                $states[] = $s;
            }
            echo json_encode($states);
        }
    }else{
        class Order {}
        
        if ( isset( $_GET['id'] ) && !empty( $_GET['id'] ) ){
                $result = $db->query("SELECT orders.*, shipping.name as shipping_name, shipping.price as shipping_price, order_status.name as status_name, order_status.state as status_state, product_materials.name as material_name FROM orders JOIN shipping ON orders.shipping_id = shipping.id JOIN order_status ON orders.status = order_status.id JOIN product_materials ON orders.material_id = product_materials.id WHERE orders.id = '".$_GET['id']."'");
            
            $row = $result->fetch_assoc();
                $o = new Order();
                $o->id = $row['id'];
                $o->name = $row['name'];
                $o->surname = $row['surname'];
                $o->product_name = $row['product_name'];
                $o->quantity = $row['quantity'];
                $o->shipping_name = $row['shipping_name'];
                $o->shipping_price = $row['shipping_price'];
                $o->total_price = $row['total_price'];
                $o->date = $row['created'];
                $o->status = $row['status_name'];
                $o->status_state = $row['status_state'];
                $o->product_name = $row['product_name'];
                $o->material_id = $row['material_id'];
                $o->material_name = $row['material_name'];
                $o->installation = $row['installation'];
                $o->quantity = $row['quantity'];
                $o->width = $row['width'];
                $o->height = $row['height'];
                $o->customer_name = $row['name'];
                $o->customer_surname = $row['surname'];
                $o->customer_address = $row['address'];
                $o->customer_postcode = $row['psc'];
                $o->customer_city = $row['city'];
                $o->customer_shipping_address = $row['shipping_address'];
                $o->customer_shipping_postcode = $row['shipping_psc'];
                $o->customer_shipping_city = $row['shipping_city'];
                $o->customer_telephone = $row['telephone'];
                $o->customer_email = $row['email'];
                $o->total_price = $row['total_price'];
            
            echo json_encode($o);
        }else{
            $orders = array();  
            
            $result = $db->query("SELECT orders.*, shipping.name as shipping_name, order_status.name as status_name, order_status.state as status_state FROM orders JOIN shipping ON orders.shipping_id = shipping.id JOIN order_status ON orders.status = order_status.id ORDER BY created");
            while($row = $result->fetch_assoc()) {
                $o = new Order();
                $o->id = $row['id'];
                $o->name = $row['name'];
                $o->surname = $row['surname'];
                $o->product_name = $row['product_name'];
                $o->quantity = $row['quantity'];
                $o->shipping_name = $row['shipping_name'];
                $o->total_price = $row['total_price'];
                $o->date = $row['created'];
                $o->status = $row['status_name'];
                $o->status_state = $row['status_state'];
                $orders[] = $o;
            }
            
            echo json_encode($orders);
        }
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ( isset( $_POST['target'] ) && !empty( $_POST['target'] ) ){
        if($_POST['target'] == 'state'){
            $db->query("UPDATE orders SET status = '".$_POST['stateid']."' WHERE id = '".$_POST['orderid']."'");
            
            class Response {}
        
            $data = new Response();
            $data->response = "ok";
            
            $result = $db->query("SELECT name FROM order_status WHERE id = '".$_POST['stateid']."'");
            $order_state = $result->fetch_assoc();
            
            $data->state = $order_state['name'];
                
            echo json_encode($data);
        }
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->query("DELETE FROM order WHERE id = '".$_GET['id']."'");
    echo json_encode('ok');    
}
?>