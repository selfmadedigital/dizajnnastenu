<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Inspiration {}
    class Filter{}
    
    if ( isset( $_GET['id'] ) && !empty( $_GET['id'] ) ){
        $result = $db->query("SELECT * FROM inspiration WHERE id = '".$_GET['id']."'");
        $inspiration = $result->fetch_assoc();
        
        $filters = array();  
        
        $result_filters = $db->query("SELECT * FROM inspiration_to_attribute JOIN filter_attribute ON inspiration_to_attribute.filter_id = filter_attribute.id WHERE inspiration_to_attribute.inspiration_id = '".$_GET['id']."'");
        while($rowfilter = $result_filters->fetch_assoc()) {
           $f = new Filter(); 
           $f->attribute = $rowfilter['attribute'];
           $f->name = $rowfilter['name'];
           $filters[] = $f;
        }
        
        $inspiration['filters'] = $filters;
        echo json_encode($inspiration);
    }else {
        $inspirations = array();  
    
        $result = $db->query('SELECT * FROM inspiration');
        while($row = $result->fetch_assoc()) {
            $i = new Inspiration();
            $i->id = $row['id'];
            $i->name = $row['name'];
            $i->img = $row['img'];
            $inspirations[] = $i;
        }
        
        echo json_encode($inspirations);
    }
    
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES)){
        uploadImage($_FILES["file"], "/home/ubuntu/workspace/img/".$_POST['target']."/");
        if(!empty($_POST['id'])){
            $db->query("UPDATE inspiration SET img = '".$_POST['target']."/".basename($_FILES["file"]["name"])."' WHERE id = '".$_POST['id']."'");   
        }
        echo json_encode("ok");
    }else{
        if(isset($_POST['id']) && !empty($_POST['id'])){
            $db->query("DELETE FROM inspiration_to_attribute WHERE inspiration_id = '".$_POST['id']."'");
            $db->query("UPDATE inspiration SET name = '".$_POST['name']."' WHERE id = '" + $_POST['id'] + "'");
            $inspiration_id = $_POST['id'];
        }else{
            $db->query("INSERT INTO inspiration(name, img) VALUES ('".$_POST['name']."','".$_POST['img']."')");
            $inspiration_id = $db->insert_id;
        }
        
        $filters = ['category','room','color','design'];
        $ok = [];
        foreach($filters as $filter_attribute){
            if(strlen($_POST['filters-'.$filter_attribute]) > 0){
                foreach(explode(",",$_POST['filters-'.$filter_attribute]) as $filter){
                    $result_filter = $db->query("SELECT id FROM filter_attribute WHERE name = '".$filter."' AND attribute = '".$filter_attribute."'");
                    if(mysqli_num_rows($result_filter) > 0){
                        $row = $result_filter->fetch_assoc();
                        $id =  $row['id'];
                    }else{
                        $db->query("INSERT INTO filter_attribute(name, img, attribute) VALUES ('".$filter."','filters/default.jpg','".$filter_attribute."')");
                        $id = $db->insert_id;
                    }
                        
                    $db->query("INSERT INTO inspiration_to_attribute(inspiration_id, filter_id) VALUES ('".$inspiration_id."','".$id."')");
                }
            }
        }
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->query("DELETE FROM inspiration_to_attribute WHERE inspiration_id = '".$_GET['id']."'");
    $db->query("DELETE FROM inspiration WHERE id = '".$_GET['id']."'");
    echo json_encode('ok');    
}
?>