<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Filter {}
    
    $filters = array();  
    
    $result = $db->query("SELECT filter_attribute.*, attribute.title FROM filter_attribute JOIN attribute ON filter_attribute.attribute = attribute.name ORDER BY filter_attribute.attribute");
    while($row = $result->fetch_assoc()) {
        if($_GET['mode'] == 'list'){
            array_push($filters, $row['name']);
        }else{
            $f = new Filter();
            $f->id = $row['id'];
            $f->name = $row['name'];
            $f->img = $row['img'];
            $f->attribute = $row['attribute'];
            $f->attribute_title = $row['title'];
            $filters[] = $f;
        }
    }
        
    echo json_encode($filters);
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES)){
        uploadImage($_FILES["file"], "/home/ubuntu/workspace/img/".$_POST['target']."/");
        $db->query("UPDATE filter_attribute SET img = '".$_POST['target']."/".basename($_FILES["file"]["name"])."' WHERE id = '".$_POST['id']."'");
        
        class Response {}
        
        $data = new Response();
        $data->id = $_POST['id'];
        $data->img = $_POST['target']."/".basename($_FILES["file"]["name"]);
        
        echo json_encode($data);
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->query("DELETE FROM inspiration_to_attribute WHERE filter_id = '".$_GET['id']."'");
    $db->query("DELETE FROM blog_to_attribute WHERE filter_id = '".$_GET['id']."'");
    $db->query("DELETE FROM filter_attribute WHERE id = '".$_GET['id']."'");
    echo json_encode('ok'); 
}
?>