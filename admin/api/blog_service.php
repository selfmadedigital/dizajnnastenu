<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class Blog {}
    class Filter{}
    
    if ( isset( $_GET['id'] ) && !empty( $_GET['id'] ) ){
        $result = $db->query("SELECT * FROM blog WHERE id = '".$_GET['id']."'");
        $blog = $result->fetch_assoc();
        $blog['short_content'] = htmlspecialchars_decode($blog['short_content']);
        $blog['long_content'] = htmlspecialchars_decode($blog['long_content']);
        
        $filters = array();  
        
        $result_filters = $db->query("SELECT * FROM blog_to_attribute JOIN filter_attribute ON blog_to_attribute.filter_id = filter_attribute.id WHERE blog_to_attribute.blog_id = '".$_GET['id']."'");
        while($rowfilter = $result_filters->fetch_assoc()) {
           $f = new Filter(); 
           $f->attribute = $rowfilter['attribute'];
           $f->name = $rowfilter['name'];
           $filters[] = $f;
        }
        
        $blog['filters'] = $filters;
        echo json_encode($blog);
    }else {
        $blogs = array();  
    
        $result = $db->query('SELECT * FROM blog');
        while($row = $result->fetch_assoc()) {
            $b = new blog();
            $b->id = $row['id'];
            $b->name = $row['name'];
            $b->img = $row['img'];
            $blogs[] = $b;
        }
        
        echo json_encode($blogs);
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_FILES)){
        $response = uploadImage($_FILES["file"], "/home/ubuntu/workspace/img/".$_POST['target']."/");
        if(!empty($_POST['id']) && $response['result'] == '1'){
            if(!$db->query("UPDATE blog SET img = '".$_POST['target']."/".basename($_FILES["file"]["name"])."' WHERE id = '".$_POST['id']."'")){
                $response['result'] = '0';
                $errors = $response['errors'];
                array_push($errors, "Problém pri ukladaní do databázy!");
                $response['errors'] = $errors;
            }
        }
        echo json_encode($response);
    }else{
        if(isset($_POST['id']) && !empty($_POST['id'])){
            $db->query("DELETE FROM blog_to_attribute WHERE blog_id = '".$_POST['id']."'");
            $db->query("UPDATE blog SET name = '".$_POST['name'].", short_content = '".htmlspecialchars($_POST['short_content']).", long_content = '".htmlspecialchars($_POST['long_content'])." WHERE id = '" + $_POST['id'] + "'");
            $blog_id = $_POST['id'];
        }else{
            $db->query("INSERT INTO blog(name, img, short_content, long_content) VALUES ('".$_POST['name']."','".$_POST['img']."','".htmlspecialchars($_POST['short_content'])."','".htmlspecialchars($_POST['long_content'])."')");
            $blog_id = $db->insert_id;
        }
        
        $filters = ['category','room','color','design'];
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
                        
                        $db->query("INSERT INTO blog_to_attribute(blog_id, filter_id) VALUES ('".$blog_id."','".$id."')");
                    }
                }
            } 
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->query("DELETE FROM blog_to_attribute WHERE blog_id = '".$_GET['id']."'");
    $db->query("DELETE FROM blog WHERE id = '".$_GET['id']."'");
    echo json_encode('ok');    
}
?>