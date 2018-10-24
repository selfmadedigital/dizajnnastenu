<?php
require_once '_db.php';
require_once '_upload.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    class ImgFile{}
    
    $images = array();
    
    $dirname = $img_folder_path.$_GET['category']."/";
    $files = glob($dirname."*.*");
    $index = 1;
    
    foreach($files as $file){
        $fileinfo = pathinfo($file);
        if($fileinfo['extension'] == 'jpg' || $fileinfo['extension'] == 'png' || $fileinfo['extension'] == 'jpeg' || $fileinfo['extension'] == 'gif'){
            $f = new ImgFile();
            $f->id = $index;
            $f->name = $fileinfo['basename'];
            $f->category = $_GET['category'];
            
            $images[] = $f;
            $index++;
        }
    }
    
    echo json_encode($images);
}else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    unlink($img_folder_path.$_GET['category'].'/'.$_GET['name']);
}
?>