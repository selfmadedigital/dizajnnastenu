<?php
require_once '_db.php';
require_once '../vendor/autoload.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ( isset( $_GET['target'] ) && !empty( $_GET['target'] ) ){
        if($_GET['target'] == 'roles'){
            class Role {}
        
            $roles = array();  
                    
            $result = $db->query("SELECT id, name FROM users_roles");
            while($row = $result->fetch_assoc()) {
                $r = new Role();
                $r->id = $row['id'];
                $r->name = $row['name'];
                $roles[] = $r;
            }
                    
            echo json_encode($roles);
        }else if($_GET['target'] == 'active'){
            class ActiveUser {}
            
            $u = new ActiveUser();    
            $db = new \PDO('mysql:dbname=dizajnnastenu;host=mariadb101.websupport.sk;port=3312;charset=utf8mb4', 'dizajnnastenu', 'VGw04sSxwc');
            $auth = new \Delight\Auth\Auth($db);
            
            $u->id = $auth->getUserId();
            $u->username = $auth->getUsername();
                
            echo json_encode($u);
        }
    }else{
        class User {}
        
        $users = array();  
                
        $result = $db->query("SELECT users.id, users.username, users.email, users.roles_mask AS role_id, users_roles.name AS role_name, FROM_UNIXTIME(users.last_login) AS last_login FROM users JOIN users_roles ON users.roles_mask = users_roles.id");
        while($row = $result->fetch_assoc()) {
            $u = new User();
            $u->id = $row['id'];
            $u->username = $row['username'];
            $u->email = $row['email'];
            $u->roleid = $row['role_id'];
            $u->rolename = $row['role_name'];
            $u->lastlogin = $row['last_login'];
            $users[] = $u;
        }
                
        echo json_encode($users);
    }
}else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $db->query("DELETE FROM users WHERE id = '".$_GET['id']."'");
    echo json_encode('ok');    
}
?>