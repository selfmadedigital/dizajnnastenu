<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Product {}
    
    if ( isset( $_GET['name'] ) && !empty( $_GET['name'] ) ){
        if ( isset( $_GET['target'] ) && !empty( $_GET['target'] ) ){
            if($_GET['target'] == 'materials'){
                $materials = array();  
                class Material {}
    
                $result = $db->query("SELECT * FROM product_materials WHERE UPPER(product_name) = UPPER('".$_GET['name']."')");
                while($row = $result->fetch_assoc()) {
                    $m = new Material();
                    $m->id = $row['id'];
                    $m->name = $row['name'];
                    $m->img = $row['img'];
                    
                    $materials[] = $m;
                }
                
                echo json_encode($materials);
            }else if($_GET['target'] == 'material-prices'){
                class MaterialPrice {}
                $material_prices = array();
                    
                $resultprices = $db->query("SELECT * FROM material_prices WHERE material_id = '".$_GET['id']."' ORDER BY size");
                while($rowprice = $resultprices->fetch_assoc()) {
                    if(isset($_GET['format']) && $_GET['format'] == 'calculate'){
                        $material_prices[$rowprice['size']] = $rowprice['price'];
                    }else{
                        $mp = new MaterialPrice();
                        $mp->id = $rowprice['id'];
                        $mp->size = $rowprice['size'];
                        $mp->price = $rowprice['price'];
                            
                        $material_prices[] = $mp;
                    }
                }
                
                echo json_encode($material_prices);
            }else if($_GET['target'] == 'prices'){
                $prices = array();  
                class Price {}
    
                $result = $db->query("SELECT * FROM product_prices WHERE UPPER(product_name) = UPPER('".$_GET['name']."') ORDER BY size");
                while($row = $result->fetch_assoc()) {
                    if(isset($_GET['format']) && $_GET['format'] == 'calculate'){
                        $prices[$row['size']] = $row['price'];
                    }else{
                        $price = new Price();
                        $price->id = $row['id'];
                        $price->size = $row['size'];
                        $price->price = $row['price'];
                        $prices[] = $price;
                    }
                }
                
                echo json_encode($prices);
            }else if($_GET['target'] == 'installations'){
                $prices = array();  
                class Price {}
    
                $result = $db->query("SELECT * FROM installation_prices WHERE UPPER(product_name) = UPPER('".$_GET['name']."') ORDER BY size");
                while($row = $result->fetch_assoc()) {
                    if(isset($_GET['format']) && $_GET['format'] == 'calculate'){
                        $prices[$row['size']] = $row['price'];
                    }else{
                        $price = new Price();
                        $price->id = $row['id'];
                        $price->size = $row['size'];
                        $price->price = $row['price'];
                        $prices[] = $price;
                    }
                }
                
                echo json_encode($prices);
            }else if($_GET['target'] == 'discounts'){
                $discounts = array();  
                class Discount {}
    
                $result = $db->query("SELECT * FROM product_quantity_discount WHERE UPPER(product_name) = UPPER('".$_GET['name']."')");
                while($row = $result->fetch_assoc()) {
                    if(isset($_GET['format']) && $_GET['format'] == 'calculate'){
                        $discounts[$row['quantity']] = $row['discount'];
                    }else{
                        $discount = new Discount();
                        $discount->id = $row['id'];
                        $discount->quantity = $row['quantity'];
                        $discount->discount = $row['discount'];
                        $discounts[] = $discount;
                    }
                }
                
                echo json_encode($discounts);
            }
        }else{
            $result = $db->query("SELECT * FROM product WHERE UPPER(name) = UPPER('".$_GET['name']."')");
            $product = $result->fetch_assoc();
            $product['description'] = htmlspecialchars_decode($product['description']);
            $product['short_information'] = htmlspecialchars_decode($product['short_information']);
            $product['long_information'] = htmlspecialchars_decode($product['long_information']);
            
            echo json_encode($product);
        }
    }else {
        $products = array();  
    
        $result = $db->query('SELECT * FROM product');
        while($row = $result->fetch_assoc()) {
            $p = new Product();
            $p->name = $row['name'];
            $p->color = $row['color'];
            $p->img = $row['img'];
            $products[] = $p;
        }
        
        echo json_encode($products);
    }
    
    
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES)){
        uploadImage($_FILES["file"], "/home/ubuntu/workspace/img/".$_POST['target']."/");
        if(isset( $_POST['target']) && !empty( $_POST['target'])){
            if($_POST['target'] == 'materials'){
                $db->query("UPDATE product_materials SET img = '".$_POST['target']."/".basename($_FILES["file"]["name"])."' WHERE id = '".$_POST['id']."'");
                
                class Response {}
        
                $data = new Response();
                $data->id = $_POST['id'];
                $data->img = $_POST['target']."/".basename($_FILES["file"]["name"]);
                
                echo json_encode($data);
            }
        }else{
            $db->query("UPDATE product SET img = '".$_POST['target']."/".basename($_FILES["file"]["name"])."' WHERE name = '".$_POST['product_name']."'");
            echo json_encode("ok");
        }
    }else{
        if (isset( $_POST['target'] ) && !empty( $_POST['target'])){
            if($_POST['target'] == 'material'){
                $db->query("INSERT INTO product_materials(name, product_name, img) VALUES ('".$_POST['name']."','".$_POST['product_name']."','materials/default.jpg')");    
            }else if($_POST['target'] == 'price'){
                $db->query("INSERT INTO product_prices(product_name, size, price) VALUES ('".$_POST['id']."','".$_POST['size']."','".$_POST['price']."')");
            }else if($_POST['target'] == 'material-price'){
                $db->query("INSERT INTO material_prices(material_id, size, price) VALUES ('".$_POST['id']."','".$_POST['size']."','".$_POST['price']."')");
            }else if($_POST['target'] == 'discount'){
                $db->query("INSERT INTO product_quantity_discount(product_name, quantity, discount) VALUES ('".$_POST['product_name']."','".$_POST['quantity']."','".$_POST['percentage']."')");
            }else if($_POST['target'] == 'installation'){
                $db->query("INSERT INTO installation_prices(product_name, size, price) VALUES ('".$_POST['product_name']."','".$_POST['size']."','".$_POST['price']."')");
            }
            
            echo json_encode($db->insert_id);
        }else{
            $state = $db->query("UPDATE product SET description = '".htmlspecialchars($_POST['description'])."', short_information = '".htmlspecialchars($_POST['short_information'])."', long_information = '".htmlspecialchars($_POST['long_information'])."', color = '".$_POST['color']."' WHERE name = '".$_POST['product_name']."'");
            echo json_encode($state);
        }
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if($_GET['target'] == 'material'){
        $db->query("DELETE FROM product_materials WHERE id = '".$_GET['id']."'");
        $db->query("DELETE FROM material_prices WHERE material_id = '".$_GET['id']."'");
    }else if($_GET['target'] == 'price'){
        $db->query("DELETE FROM product_prices WHERE id = '".$_GET['id']."'");
    }else if($_GET['target'] == 'installation'){
        $db->query("DELETE FROM installation_prices WHERE id = '".$_GET['id']."'");
    }else if($_GET['target'] == 'discount'){
        $db->query("DELETE FROM product_quantity_discount WHERE id = '".$_GET['id']."'");
    }
    echo json_encode('ok');    
}
?>