<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['category']) && !empty($_GET['category'])){
        class Report{}
        $reports = array();  
    
        $result = $db->query('SELECT * FROM '.$_GET['category']);
        while($row = $result->fetch_assoc()) {
            if(!file_exists('/home/ubuntu/workspace/img/'.$row['img'])){
                $r = new Report();
                $r->id = $row['id'];
                $r->message = "Chýbajúci súbor ".$row['img'];
                $reports[] = $r;
            }
            
            if($_GET['category'] == 'product'){
                $resultprices = $db->query("SELECT COUNT(*) as prices FROM product_prices WHERE product_name = '".$row['name']."'");
                $rowprices = $resultprices->fetch_assoc();
                if($rowprices['prices'] == '0'){
                    $r = new Report();
                    $r->id = $row['name'];
                    $r->message = "Prázdna tabuľka cien pre produkt ".$row['name'];
                    $reports[] = $r;
                }
            }
        }
        
        echo json_encode($reports);   
    }
}
?>