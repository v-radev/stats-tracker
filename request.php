<?php

//require_once "medoo.min.php";
//
//$db = new medoo([
//    'database_type' => 'mysql',
//    'database_name' => 'test-db',
//    'server' => 'localhost',
//    'username' => 'root',
//    'password' => 'password123',
//    'charset' => 'utf8'
//]);

//AJAX request
if ( !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' )
{
//    $db->insert('users', ['username' => uniqid()]);

    //TODO validate data

    usleep(350000);
    echo json_encode([]);
    return;
}
