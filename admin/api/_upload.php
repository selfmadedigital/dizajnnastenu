<?php

$img_folder_path = "/home/ubuntu/workspace/img/";

function uploadImage($image, $target_dir){
    $target_file = $target_dir . preg_replace('/\s+/', '_', basename($image["name"]));
    $errors = array();
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    $check = getimagesize($image["tmp_name"]);
    if($check !== false) {
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
            array_push($errors, "Nesprávny typ súboru! Povolené sú súbory jpg, png, jpeg, gif");
        }
    } else {
        array_push($errors, "Nesprávny typ súboru! Povolené sú súbory jpg, png, jpeg, gif");
    }
    if (file_exists($target_file)) {
        array_push($errors, "Súbor s daným názvom už existuje!");
    }
    if ($image["size"] > 2000000) {
        array_push($errors, "Veľkosť súboru väčšia ako 2MB!");
    }
    
    if (!empty($errors)) {
        $response['result'] = '0';
    } else {
        if (move_uploaded_file($image["tmp_name"], $target_file)) {
            $response['result'] = '1';
        } else {
            array_push($errors, "Problém pri uploade súboru!");
            $response['result'] = '0';
        }
    }
    
    $response['errors'] = $errors;
    return $response;
}
?>