<?php

/**
 * @psalm-import-type Route from types
 */

require_once CONTROLLERS . 'about.php';
require_once CONTROLLERS . 'home.php';
require_once CONTROLLERS . 'product.php';
require_once CONTROLLERS . 'notFound.php';

/**
 * @var Route[] $routes 
 */

$routes =[
    [
        'id' => 'home' ,
        'value' => '/' ,
        'controller' => 'home',
        'call' => 'makeHome' , 
        'isRegex' => false 
    ],
    [
        'id' => 'about' ,
        'value' => '/sobre' ,
        'controller' => 'about',
        'call' => 'makeAbout' , 
        'isRegex' => false 
    ],[
        'id' => 'product' ,
        'value' => '/^\/produtos\/[a-zA-Z0-9]+$/' ,
        'controller' => 'product',
        'call' => 'makeProduct' , 
        'isRegex' => false 
    ],[
        'id' => 'notFound' ,
        'value' => '/notFound' ,
        'controller' => 'notFound',
        'call' => 'makeNotFound' , 
        'isRegex' => false 
    ]
];
